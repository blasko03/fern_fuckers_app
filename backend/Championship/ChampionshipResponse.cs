
using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Responses;

public class ChampionshipResponse
{
    public Guid Id { get; set; }
    public required string Name { get; set; }

    public List<TeamResponse> Teams { get; set; } = [];
    public List<MatchResponse> Matches { get; set; } = [];

    public static explicit operator ChampionshipResponse(Championship championship)
    {

        return new ChampionshipResponse
        {
            Id = championship.Id,
            Name = championship.Name,
            Matches = championship.Matches.Select(x => (MatchResponse)x).ToList(),
            Teams = championship.Teams.Select(x => (TeamResponse)x).ToList()
        };
    }
}

