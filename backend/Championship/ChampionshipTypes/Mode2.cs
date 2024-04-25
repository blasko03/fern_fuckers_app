using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;

namespace FernFuckersAppBackend.Championships.Mode1;
using TeamPointsDict = Dictionary<Guid, int>;
public class Mode2Championship : IChampionshipMode
{
    public List<Match> GetMatches(List<Team> teams)
    {
        return teams.Select((team1, i) =>
        {
            return teams.Skip(i + 1).Where(team2 => team1.Id != team2.Id).Select(team2 =>
            {
                var match = new Match { };
                match.Teams.AddRange([team1, team2]);
                match.Sets.Add(new Set { NumberLegs = 5, NumberPlayers = 1, WhoWins = SetWinningRule.WHO_WINS_FIRST });
                match.Sets.Add(new Set { NumberLegs = 5, NumberPlayers = 1, WhoWins = SetWinningRule.WHO_WINS_FIRST });
                match.Sets.Add(new Set { NumberLegs = 2, NumberPlayers = 2, WhoWins = SetWinningRule.ALL_LEGS });
                match.Sets.Add(new Set { NumberLegs = 2, NumberPlayers = 2, WhoWins = SetWinningRule.ALL_LEGS });
                return match;
            });
        }).SelectMany(x => x).ToList();
    }

    public TeamPointsResponse[] CalculateChampionshipPoints(Championship championship)
    {
        var matchesPoints = AggregateByTeam(championship.Matches.SelectMany(CalculateMatchPoints));

        return
        [
            .. championship!.Teams.Select(team => new TeamPointsResponse
            {
                Team = (TeamResponse)team,
                Points = matchesPoints.GetValueOrDefault(team.Id, 0)
            }).OrderByDescending(x => x.Points)
        ];
    }

    private static TeamPoints[] CalculateMatchPoints(Match match)
    {
        var setsPoints = match.Sets.Select(CalculateSetPoints);
        var concluded = setsPoints.Where(set => set!.MaxBy(team => team.Points)!.Points > 0).ToArray();
        var setsPointsTotal = AggregateByTeam(setsPoints.SelectMany(x => x));
        var maxScore = setsPointsTotal.DefaultIfEmpty().MaxBy(x => x.Value);
        var winners = setsPointsTotal.Where(scores => scores.Value == maxScore.Value).ToArray();
        var teams = match!.Teams;
        return teams.Select(team => new TeamPoints
        {
            TeamId = team.Id,
            Points = MatchPoints(winners.Length, concluded.Length, match.Sets.Count, teams.Count, maxScore.Value, setsPointsTotal.GetValueOrDefault(team.Id, 0))
        }).ToArray();
    }

    private static int MatchPoints(int nWinners, int nConcludedSets, int nSets, int nTeams, int maxScore, int score)
    {
        if (maxScore > score)
        {
            return 0;
        }

        if (nConcludedSets != nSets)
        {
            return 0;
        }

        if (nWinners == nTeams)
        {
            return 1;
        }

        if (nWinners == 1)
        {
            return 2;
        }

        return 0;
    }

    private static TeamPoints[] CalculateSetPoints(Set set)
    {
        var legsPoints = AggregateByTeam(set.Legs.Select(leg => new TeamPoints { TeamId = leg.TeamId, Points = 1 }));
        var maxScore = legsPoints.DefaultIfEmpty().MaxBy(x => x.Value);

        return set!.Match!.Teams.Select(team => new TeamPoints
        {
            TeamId = team.Id,
            Points = SetPoints(set.WhoWins, maxScore.Value, set.Legs.Count, set.NumberLegs, legsPoints.GetValueOrDefault(team.Id, 0))
        }).ToArray();
    }
    private static int SetPoints(SetWinningRule whoWins, int maxScore, int playedLegs, int minLegs, int score)
    {
        if (maxScore > score)
        {
            return 0;
        }

        if (whoWins == SetWinningRule.WHO_WINS_FIRST && maxScore >= minLegs / 2 + 1)
        {
            return 1;
        }

        if (whoWins == SetWinningRule.ALL_LEGS && playedLegs >= minLegs)
        {
            return 1;
        }

        return 0;
    }

    private static TeamPointsDict AggregateByTeam(IEnumerable<TeamPoints> teamPoints)
    {
        return teamPoints.Aggregate(new TeamPointsDict(), (acc, res) =>
        {
            acc[res.TeamId] = acc.GetValueOrDefault(res.TeamId, 0) + res.Points;
            return acc;
        });
    }
}