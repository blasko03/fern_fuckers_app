
using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Responses;

public class SetResponse
{
    public Guid Id { get; set; }
    public List<PlayerResponse> Players { get; set; } = [];
    public List<LegsResponse> PlayedLegs { get; set; } = [];
    public int NumberPlayers { get; set; }
    public int NumberLegs { get; set; }
    public string WhoWins { get; set; } = "";

    public static explicit operator SetResponse(Set set)
    {

        return new SetResponse
        {
            Id = set.Id,
            Players = set.Players.Select(x => (PlayerResponse)x).ToList(),
            NumberPlayers = set.NumberPlayers,
            NumberLegs = set.NumberLegs,
            WhoWins = set.WhoWins.ToString(),
            PlayedLegs = set.Legs.Select(x => (LegsResponse)x).ToList()
        };
    }
}

public class LegsResponse {
    public required Guid Id {get; set;}
    public required Guid TeamId {get; set;}

    public static explicit operator LegsResponse(Leg leg)
    {

        return new LegsResponse
        {
            Id = leg.Id,
            TeamId = leg.TeamId
        };
    }
}
