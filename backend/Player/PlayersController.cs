using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Controllers;

[Route("api/players")]
[ApiController]
public class PlayersController : ControllerBase
{
    [HttpGet]
    public async Task<List<PlayerResponse>> Get(ApplicationDbContext context)
    {
        return await context.Players.Select(x => (PlayerResponse)x).ToListAsync();
    }

    [HttpPost]

    public async Task<Results<BadRequest<List<string>>, Ok<PlayerResponse>>> Create([FromBody] PlayerParams player, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<PlayerResponse>(() => CreatePlayerService.Call(context, player));
    }
}
