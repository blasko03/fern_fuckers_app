using System.ComponentModel.DataAnnotations.Schema;

namespace FernFuckersAppBackend.Models;
[Table("Throw")]
public class Throw
{
    public Guid Id { get; set; }
    public Guid LegId { get; set; }

    public required int Score { get; set; }
}
