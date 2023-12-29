using System.Text.Json;
using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Events;
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
                                    .ThenInclude(set => set.SetPlayers)
                                    .Include(match => match.Sets)
                                    .ThenInclude(set => set.Legs)
                                    .Select(x => (MatchResponse)x)
                                    .FirstAsync();
    }

    [HttpPatch("{id}/setPlayers")]
    public async Task<Results<BadRequest<List<string>>, Ok<SetPlayersResponse>>> SetPlayers([FromBody] List<SetPlayersParams> matchPlayers, Guid id, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<SetPlayersResponse>(() => SetPlayersService.Call(context, matchPlayers, id));
    }

    [HttpGet("{id}/matchEvents")]
    public async Task Events([FromQuery] DateTime? lastEvent, Guid id)
    {
        Console.WriteLine(id);
        var response = Response;
        response.Headers.Append("Content-Type", "text/event-stream");
        var listner = new MatchEvents(lastEvent);
        while (!HttpContext.RequestAborted.IsCancellationRequested)
        {
            var events = await listner.WaitMessages();
            await Response.WriteAsync($"data: {JsonSerializer.Serialize(events, CamelCaseJsonSerializer.Options())}\r\r");
            await Response.Body.FlushAsync();
        }
    }
}
