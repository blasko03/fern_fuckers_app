using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

[Route("api/match")]
[ApiController]
public class MatchController : ControllerBase
{
    [HttpPatch("{id}")]
    public async Task<Results<BadRequest, Ok<SetPlayersResponse>>> SetPlayers([FromBody] List<SetPlayersParams> matchPlayers, Guid id, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<SetPlayersResponse>(() => SetPlayersService.Call(context, matchPlayers, id));
    }
}
