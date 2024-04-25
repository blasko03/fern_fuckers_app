using FernFuckersAppBackend.Championships;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

public class ChampionshipStats
{
    public TeamPoints[] TeamRanking { get; set; } = [];
}
public class TeamPoints
{
    public required Guid TeamId { get; set; }
    public required int Points { get; set; }
}
public class TeamPointsResponse
{
    public required TeamResponse Team { get; set; }
    public required int Points { get; set; }
}

public class GetChampionshipStats
{
    public static async Task<TeamPointsResponse[]> CallAsync(ApplicationDbContext context, Guid id, IChampionshipMode matchMode)
    {
        var championship = await context.Championships
                                   .Where(c => c.Id == id)
                                   .Include(c => c.Teams)
                                   .Include(c => c.Matches)
                                   .ThenInclude(m => m.Teams)
                                   .Include(c => c.Matches)
                                   .ThenInclude(c => c.Sets)
                                   .ThenInclude(s => s.Legs)
                                   .FirstAsync();

        return matchMode.CalculateChampionshipPoints(championship);
    }
}
