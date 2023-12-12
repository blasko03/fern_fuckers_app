
using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Responses;

public class SetResponse
{
    public Guid Id { get; set; }
    public List<PlayerResponse> Players { get; set; } = [];
    public List<WonLegResponse> PlayedLegs { get; set; } = [];
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
            PlayedLegs = set.Legs.Select(x => (WonLegResponse)x).ToList()
        };
    }
}
