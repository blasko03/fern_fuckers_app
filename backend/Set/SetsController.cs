using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

[Route("api/sets")]
[ApiController]
public class SetsController : ControllerBase
{
    [HttpPatch("{id}/setPlayers")]
    public async Task<Results<BadRequest<List<string>>, Ok<SetTeamPlayersResponse>>> SetPlayers([FromBody] SetPlayersParams setPlayers, Guid id, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<SetTeamPlayersResponse>(() => SetPlayersService.Call(context, setPlayers, id));
    }

    [HttpPost("{id}/wonLeg")]
    public async Task<Results<BadRequest<List<string>>, Ok<WonLegResponse>>> WonLeg([FromBody] WonLegParams param, Guid id, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<WonLegResponse>(() => WonLegService.Call(context, id, param));
    }
}
