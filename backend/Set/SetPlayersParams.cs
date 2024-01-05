namespace FernFuckersAppBackend.Controllers.Params;

public class SetPlayersParams
{
    public List<Guid> Players { get; set; } = [];
    public Guid TeamId { get; set; }
}
