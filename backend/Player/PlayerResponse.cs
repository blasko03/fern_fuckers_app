using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Responses;
public class PlayerResponse
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Surname { get; set; }

    public static explicit operator PlayerResponse(Player player)
    {
        return new PlayerResponse { Id = player.Id, Name = player.Name, Surname = player.Surname };
    }
}
