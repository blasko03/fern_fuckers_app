using System.Text.Json;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Events;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Utils;
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

    [HttpGet("{id}/matchEvents")]
    public async Task Events([FromQuery] DateTime? lastEvent, Guid id)
    {
        Console.WriteLine(id);
        var response = Response;
        response.Headers.Append("Content-Type", "text/event-stream");
        var listner = new MatchEvents(lastEvent);
        while (!HttpContext.RequestAborted.IsCancellationRequested)
        {
            var events = await listner.WaitEvents();
            foreach (var e in events)
            {
                await Response.WriteAsync($"data: {JsonSerializer.Serialize((MatchEventResponse<object>)e, CamelCaseJsonSerializer.Options())}\r\r");
                await Response.Body.FlushAsync();
            }
        }
    }
}
