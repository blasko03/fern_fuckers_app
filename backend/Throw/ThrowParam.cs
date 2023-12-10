namespace FernFuckersAppBackend.Controllers.Params;

public class ThrowParam
{
    public required Guid TeamId { get; set; }
    public required int Score { get; set; }
    public required int NumberOfDarts { get; set; }
}
