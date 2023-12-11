using System.ComponentModel.DataAnnotations.Schema;

namespace FernFuckersAppBackend.Models;
[Table("Set")]
public class Set
{
    public Guid Id { get; set; }
    public Guid MatchId { get; set; }
    public required int NumberPlayers { get; set; }
    public required int NumberLegs { get; set; }
    public required SetWinningRule WhoWins { get; set; }
    public List<Player> Players { get; set; } = [];
    public List<Leg> Legs { get; set; } = [];
}

public enum SetWinningRule
{
    WHO_WINS_FIRST,
    ALL_LEGS
}
