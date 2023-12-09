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
        return await context.Championships.Include(e => e.Teams).Select(x => (ChampionshipResponse)x).ToListAsync();
    }

    [HttpPost]
    public async Task<Results<BadRequest, Ok<ChampionshipResponse>>> Create([FromBody] ChampionshipParams championship, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<ChampionshipResponse, ChampionshipParams>(championship, context, CreateChampionshipService.Call);
    }

    [HttpGet("events")]
    public async Task Events()
    {
        var response = Response;
        response.Headers.Append("Content-Type", "text/event-stream");

        for (var i = 0; true; ++i)
        {
            await response.WriteAsync($"data: Controller {i} at {DateTime.Now}\r\r");
            await response.Body.FlushAsync();
            await Task.Delay(5 * 1000);
        }
    }
}
