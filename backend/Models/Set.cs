using System.ComponentModel.DataAnnotations.Schema;

namespace FernFuckersAppBackend.Models;
[Table("Set")]
public class Set
{
    public Guid Id { get; set; }
    public Guid MatchId { get; set; }
    public List<Player> Players { get; } = [];
    public List<Leg> Legs { get; } = [];
}
