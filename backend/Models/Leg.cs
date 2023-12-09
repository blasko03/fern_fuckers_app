using System.ComponentModel.DataAnnotations.Schema;

namespace FernFuckersAppBackend.Models;
[Table("Leg")]
public class Leg
{
    public Guid Id { get; set; }
    public Guid SetId { get; set; }
    public Guid TeamId { get; set; }
    public List<Throw> Throws { get; set; } = [];
}
