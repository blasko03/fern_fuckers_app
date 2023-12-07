using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Models;
public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Championship> Championships { get; set; }
}
