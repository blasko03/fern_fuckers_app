using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Params;

public class ChampionshipParams
{
    public required string Name { get; set; }

    public required List<Guid> Teams { get; set; }

    public static explicit operator Championship(ChampionshipParams championship)
    {
        return new Championship { Name = championship.Name };
    }
}
