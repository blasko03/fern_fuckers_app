using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Params;

public class PlayerParams
{
    public required string Name { get; set; }
    public required string Surname { get; set; }

    public static explicit operator Player(PlayerParams player)
    {
        return new Player { Name = player.Name, Surname = player.Surname };
    }
}
