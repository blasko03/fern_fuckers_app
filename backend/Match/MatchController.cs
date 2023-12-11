using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;
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
        return await ServiceCaller.Call<SetPlayersResponse>(() => SetPlayersService.Call(context, matchPlayers, id));
    }

    [HttpGet("{id}/matchEvents")]
    public async Task Events(string id)
    {
        Console.WriteLine(id);
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
