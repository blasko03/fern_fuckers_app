using System.ComponentModel.DataAnnotations.Schema;

namespace FernFuckersAppBackend.Models;
[Table("Match")]
public class Match
{
    public Guid Id { get; set; }
    public Guid ChampionshipId { get; set; }
    public List<Team> Teams { get; set; } = [];
    public List<Set> Sets { get; set; } = [];
}
