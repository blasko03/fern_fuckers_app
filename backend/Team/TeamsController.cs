using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Controllers;

[Route("api/teams")]
[ApiController]
public class TeamsController : ControllerBase
{
    [HttpGet]
    public async Task<List<TeamResponse>> Get(ApplicationDbContext context)
    {
        return await context.Teams.Include(e => e.Players).Select(x => (TeamResponse)x).ToListAsync();
    }

    [HttpPost]
    public async Task<Results<BadRequest<List<string>>, Ok<TeamResponse>>> Create([FromBody] TeamParams team, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<TeamResponse>(() => CreateTeamService.Call(context, team));
    }
}
