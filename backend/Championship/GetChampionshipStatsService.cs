using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

using TeamPointsDict = Dictionary<Guid, int>;
public class ChampionshipStats
{
    public TeamPoints[] TeamRanking { get; set; } = [];
}

public class TeamPoints
{
    public required Guid TeamId { get; set; }
    public required int Points { get; set; }
}

public class TeamPointsResponse
{
    public required TeamResponse Team { get; set; }
    public required int Points { get; set; }
}

public class GetChampionshipStats
{
    public static async Task<TeamPointsResponse[]> CallAsync(ApplicationDbContext context, Guid id)
    {
        var championship = await context.Championships
                                   .Where(c => c.Id == id)
                                   .Include(c => c.Teams)
                                   .Include(c => c.Matches)
                                   .ThenInclude(m => m.Teams)
                                   .Include(c => c.Matches)
                                   .ThenInclude(c => c.Sets)
                                   .ThenInclude(s => s.Legs)
                                   .FirstAsync();

        return CalculateChampionshipPoints(championship);
    }

    private static TeamPointsResponse[] CalculateChampionshipPoints(Championship championship)
    {
        var matchesPoints = championship.Matches
                                        .SelectMany(match => CalculateMatchPoints(match))
                                        .Aggregate(new TeamPointsDict(), (acc, match) =>
                                        {
                                            acc[match.TeamId] = acc.GetValueOrDefault(match.TeamId, 0) + match.Points;
                                            return acc;
                                        });
        var teams = championship!.Teams;
        return
        [
            .. teams.Select(team => new TeamPointsResponse { Team = (TeamResponse)team, Points = matchesPoints.GetValueOrDefault(team.Id, 0) })
                                .OrderByDescending(x => x.Points)
,
        ];
    }

    private static TeamPoints[] CalculateMatchPoints(Match match)
    {
        var setsPoints = match.Sets.Select(CalculateSetPoints);
        var setsPointsTotal = setsPoints.SelectMany(x => x)
                                        .Aggregate(new TeamPointsDict(), (acc, set) =>
                                        {
                                            acc[set.TeamId] = acc.GetValueOrDefault(set.TeamId, 0) + set.Points;
                                            return acc;
                                        });
        var concludedSets = setsPoints.Where(set => set!.MaxBy(team => team.Points)!.Points > 0).ToArray();
        var maxScore = setsPointsTotal.DefaultIfEmpty().MaxBy(x => x.Value);
        var winners = setsPointsTotal.Where(scores => scores.Value == maxScore.Value).ToArray();
        var teams = match!.Teams;
        if (winners.Length == teams.Count && concludedSets.Length == match.Sets.Count)
        {
            return teams.Select(team => new TeamPoints { TeamId = team.Id, Points = 1 }).ToArray();
        }

        if (winners.Length == 1 && concludedSets.Length == match.Sets.Count)
        {
            return teams.Select(team => new TeamPoints { TeamId = team.Id, Points = maxScore.Value == setsPointsTotal.GetValueOrDefault(team.Id, 0) ? 2 : 0 }).ToArray();
        }

        return teams.Select(team => new TeamPoints { TeamId = team.Id, Points = 0 }).ToArray();
    }

    private static TeamPoints[] CalculateSetPoints(Set set)
    {
        var legsPoints = set.Legs.Aggregate(new TeamPointsDict(), (acc, leg) =>
        {
            acc[leg.TeamId] = acc.GetValueOrDefault(leg.TeamId, 0) + 1;
            return acc;
        });
        var maxScore = legsPoints.DefaultIfEmpty().MaxBy(x => x.Value);
        var teams = set!.Match!.Teams;

        if ((set.WhoWins == SetWinningRule.WHO_WINS_FIRST && maxScore.Value >= set.NumberLegs / 2 + 1) || (set.WhoWins == SetWinningRule.ALL_LEGS && set.Legs.Count >= set.NumberLegs))
        {
            return teams.Select(team => new TeamPoints { TeamId = team.Id, Points = legsPoints.GetValueOrDefault(team.Id, 0) == maxScore.Value ? 1 : 0 }).ToArray();
        }

        return teams.Select(team => new TeamPoints { TeamId = team.Id, Points = 0 }).ToArray();
    }
}
