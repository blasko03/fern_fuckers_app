using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FernFuckersAppBackend.Models;
[Table("Team")]
public class Team
{
    public Guid Id { get; set; }
    [Required]
    public required string Name { get; set; }
    public List<Player> Players { get; } = [];
}
