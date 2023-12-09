using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Responses;
public class TeamResponse
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public List<PlayerResponse> Players { get; set; } = [];

    public static explicit operator TeamResponse(Team team)
    {
        return new TeamResponse { Id = team.Id, Name = team.Name, Players = team.Players.Select(x => (PlayerResponse)x).ToList() };
    }
}
