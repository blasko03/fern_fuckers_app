using System.ComponentModel.DataAnnotations.Schema;

namespace FernFuckersAppBackend.Models;
[Table("Set")]
public class Set
{
    public Guid Id { get; set; }
    public Guid MatchId { get; set; }
    public Match? Match { get; set; }
    public required int NumberPlayers { get; set; }
    public required int NumberLegs { get; set; }
    public required SetWinningRule WhoWins { get; set; }
    public List<SetPlayers> SetPlayers { get; set; } = [];
    public List<Leg> Legs { get; set; } = [];
}

public class SetPlayers
{
    public Guid Id { get; set; }
    public required Player Player { get; set; }
    public required Team Team { get; set; }
    public required Set Set { get; set; }
}

public enum SetWinningRule
{
    WHO_WINS_FIRST,
    ALL_LEGS
}
