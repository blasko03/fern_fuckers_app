using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Championship")]
public class Championship
{
    public int ChampionshipId { get; set; }

    [Required]
    public required string Name { get; set; }
}