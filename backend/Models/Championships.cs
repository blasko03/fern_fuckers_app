using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FernFuckersAppBackend.Models;
[Table("Championship")]
public class Championship
{
    public int ChampionshipId { get; set; }

    [Required]
    public required string Name { get; set; }
}
