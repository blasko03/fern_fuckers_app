using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Params;

public class TeamParams
{
    public required string Name { get; set; }

    public required List<Guid> Players { get; set; }

    public static explicit operator Team(TeamParams team)
    {
        return new Team { Name = team.Name };
    }
}
