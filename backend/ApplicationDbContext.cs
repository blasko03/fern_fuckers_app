using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Models;
public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Championship> Championships { get; set; }
    public DbSet<Player> Players { get; set; }
    public DbSet<Team> Teams { get; set; }
    public DbSet<Match> Matches { get; set; }
    public DbSet<Set> Sets { get; set; }
    public DbSet<Leg> Legs { get; set; }
}
