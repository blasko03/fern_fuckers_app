namespace FernFuckersAppBackend.Controllers.Params;

public class WonLegParams
{
    public required Guid TeamId { get; set; }
    public List<ThrowParam> Throws { get; set; } = [];
}
