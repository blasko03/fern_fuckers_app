using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FernFuckersAppBackend.Models;
[Table("Championship")]
public class Championship
{
    public Guid Id { get; set; }
    [Required]
    public required string Name { get; set; }
    public List<Team> Teams { get; set; } = [];
    public List<Match> Matches { get; set; } = [];
}
