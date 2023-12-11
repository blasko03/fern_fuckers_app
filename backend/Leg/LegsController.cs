using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

[Route("api/legs")]
[ApiController]
public class LegsController : ControllerBase
{
    [HttpPost("{id}/wonLeg")]
    public async Task<Results<BadRequest, Ok<WonLegResponse>>> WonLeg([FromBody] WonLegParams param, Guid id, ApplicationDbContext context)
    {
        Console.WriteLine(id);
        return await ServiceCaller.Call<WonLegResponse>(() => WonLegService.Call(context, param));
    }

    [HttpDelete("{id}")]
    public Results<BadRequest, Ok<string>> Delete(Guid id)
    {
        Console.WriteLine(id);
        return TypedResults.Ok("aaaaaaa");
    }
}
