using FernFuckersAppBackend.Championships;
using FernFuckersAppBackend.Championships.Mode1;
using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Controllers;

[Route("api/championships")]
[ApiController]

public class ChampionshipsController : ControllerBase
{
    [HttpGet]
    public async Task<List<ChampionshipResponse>> Get(ApplicationDbContext context)
    {
        var teams = context.Teams;
        return await context.Championships.OrderBy(c => c.Name.ToLower())
                                          .Select(x => (ChampionshipResponse)x).ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<Results<NotFound, Ok<ChampionshipResponse>>> GetOne(ApplicationDbContext context, Guid id)
    {
        var teams = context.Teams;
        var championship = await context.Championships
                                                   .Include(e => e.Teams)
                                                   .ThenInclude(team => team.Players)
                                                   .Include(e => e.Matches)
                                                   .ThenInclude(match => match.Teams)
                                                   .Where(c => c.Id == id)
                                                   .FirstOrDefaultAsync();
        if (championship == null)
        {
            return TypedResults.NotFound();
        }

        return TypedResults.Ok((ChampionshipResponse)championship);
    }

    [HttpGet("{id}/stats")]
    public async Task<TeamPointsResponse[]> GetStats(ApplicationDbContext context, Guid id)
    {
        return await GetChampionshipStats.CallAsync(context, id, GetChampionshipMode());
    }

    [HttpPost]
    public async Task<Results<BadRequest<List<string>>, Ok<ChampionshipResponse>>> Create([FromBody] ChampionshipParams championship, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<ChampionshipResponse>(() => CreateChampionshipService.Call(context, championship, GetChampionshipMode()));
    }

    public static IChampionshipMode GetChampionshipMode()
    {
        return new Mode1Championship();
    }
}
