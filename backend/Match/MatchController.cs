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
                                          .ThenInclude(set => set.SetPlayers)
                                          .Include(match => match.Sets)
                                          .ThenInclude(set => set.Legs)
                                          .Select(x => (MatchResponse)x)
                                          .FirstAsync();
    }

    [HttpPatch("{id}/setPlayers")]
    public async Task<Results<BadRequest, Ok<SetPlayersResponse>>> SetPlayers([FromBody] List<SetPlayersParams> matchPlayers, Guid id, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<SetPlayersResponse>(() => SetPlayersService.Call(context, matchPlayers, id));
    }

    [HttpGet("{id}/matchEvents")]
    public async Task Events(ApplicationDbContext context, [FromQuery] DateTime? lastEvent, Guid id)
    {
        Response.Headers.Append("Content-Type", "text/event-stream");
        var legs = await context.Legs.Where(leg => leg.CreatedDate > lastEvent)
                                     .Where(leg => leg.Set!.MatchId == id)
                                     .ToListAsync();
        if (legs.Count > 0)
        {
            await Response.WriteAsync($"data: {JsonSerializer.Serialize(legs.Select(leg => (WonLegResponse)leg), CamelCaseJsonSerializer.Options())}\r\r");
            await Response.Body.FlushAsync();
        }

        var listner = new MatchEvents();
        while(true)
        {
            var events = await listner.WaitMessages();
            Console.WriteLine($"New messages {events.Count}");
            Console.WriteLine(JsonSerializer.Serialize(events, CamelCaseJsonSerializer.Options()));
            await Response.WriteAsync($"data: {JsonSerializer.Serialize(events, CamelCaseJsonSerializer.Options())}\r\r");
            await Response.Body.FlushAsync();
        }
    }
}

public class MatchEvents 
{
    private static readonly List<WonLegResponse> s_messages = [];
    private static readonly List<Task> s_listners = [];
    private int _lastMessage = 0;

    public static void AddElement(WonLegResponse message)
    {
        s_messages.Add(message);
        foreach(var l in s_listners)
        {
            l.Start();
        }
        s_listners.RemoveAll(x => true);
    }

    public async Task<List<WonLegResponse>> WaitMessages()
    {
        var t = new Task<List<WonLegResponse>>(GetMessage);
        s_listners.Add(t);
        await t;
        var messages = s_messages.Skip(_lastMessage);
        _lastMessage = _lastMessage + messages.Count();
        Console.WriteLine(_lastMessage);
        return messages.ToList();
    }

    public static List<WonLegResponse> GetMessage()
    {
        return s_messages;
    }
/*
    public static readonly object CounterLock = new object();

...
lock ( CounterLock )
{
    Counter++;
}*/
}