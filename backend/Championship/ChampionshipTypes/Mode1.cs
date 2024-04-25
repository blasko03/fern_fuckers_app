using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;

namespace FernFuckersAppBackend.Championships.Mode1;

using TeamPointsDict = Dictionary<Guid, int>;
public class Mode1Championship : IChampionshipMode
{
    public TeamPointsResponse[] CalculateChampionshipPoints(Championship championship)
    {
        var matchesPoints = championship.Matches.SelectMany(x => x.Sets)
                           .SelectMany(x => x.Legs)
       .Aggregate(new TeamPointsDict(), (acc, leg) =>
       {
           acc[leg.TeamId] = acc.GetValueOrDefault(leg.TeamId, 0) + 1;
           return acc;
       });

        return
        [
            .. championship!.Teams.Select(team => new TeamPointsResponse
            {
                Team = (TeamResponse)team,
                Points = matchesPoints.GetValueOrDefault(team.Id, 0)
            }).OrderByDescending(x => x.Points)
        ];
    }

    public List<Match> GetMatches(List<Team> teams)
    {
        return teams.Select((team1, i) =>
        {
            return teams.Skip(i + 1).Where(team2 => team1.Id != team2.Id).Select(team2 =>
            {
                var match = new Match { };
                match.Teams.AddRange([team1, team2]);
                match.Sets.Add(new Set { NumberLegs = 3, NumberPlayers = 2, WhoWins = SetWinningRule.ALL_LEGS });
                return match;
            });
        }).SelectMany(x => x).ToList();
    }
}