using System.Text.Json;
using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;
using FernFuckersAppBackend.Utils;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Controllers;

[Route("api/match")]
[ApiController]
public class MatchController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<MatchResponse> Get(ApplicationDbContext context, Guid id)
    {
        var teams = context.Teams;
        return await context.Matches.Where(match => match.Id == id)
                                          .Include(match => match.Teams)
                                          .ThenInclude(set => set.Players)
                                          .Include(match => match.Sets)
                                          .ThenInclude(set => set.Players)
                                          .Include(match => match.Sets)
                                          .ThenInclude(set => set.Legs)
                                          .Select(x => (MatchResponse)x)
                                          .FirstAsync();
    }

    [HttpPatch("{id}/setPlayers")]
    public async Task<Results<BadRequest, Ok<SetPlayersResponse>>> SetPlayers([FromBody] List<SetPlayersParams> matchPlayers, Guid id, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<SetPlayersResponse>(() => SetPlayersService.Call(context, matchPlayers.First(), id));
    }

    [HttpGet("{id}/matchEvents")]
    public async Task Events(ApplicationDbContext context, [FromQuery] DateTime lastEvent, Guid id)
    {
        Console.WriteLine("new connection");
        var response = Response;
        response.Headers.Append("Content-Type", "text/event-stream");
        var lastQuery = lastEvent;
        while (true)
        {
            var legs = await context.Legs.Where(leg => leg.CreatedDate > lastQuery)
                                         .Where(leg => leg.Set!.MatchId == id)
                                         .ToListAsync();
            if(legs.Count() > 0) {
                lastQuery = legs.Max(x => x.CreatedDate);
                await response.WriteAsync($"data: {JsonSerializer.Serialize(legs.Select(leg => (WonLegResponse)leg), CamelCaseJsonSerializer.Options())}\r\r");
                await response.Body.FlushAsync();
            }
            
            await response.WriteAsync($"data: \r\r");
            await response.Body.FlushAsync();
            await Task.Delay(5000, HttpContext.RequestAborted);
        }
    }
}
