using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

[Route("api/leg")]
[ApiController]
public class LegsController : ControllerBase
{

    [HttpPost]
    public async Task<Results<BadRequest, Ok<WonLegResponse>>> WonLeg([FromBody] WonLegParams param, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<WonLegResponse>(() => WonLegService.Call(context, param));
    }
}
