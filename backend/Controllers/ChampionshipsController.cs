using FernFuckersAppBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Controllers;

[Route("api/championships")]
[ApiController]
public class ChampionshipsController : ControllerBase
{
    [HttpGet]
    public async Task<List<Championship>> Get(ApplicationDbContext context)
    {
        //context.Championships.Add(new Championship{Name = "Champ1"});
        await context.SaveChangesAsync();
        return await context.Championships.ToListAsync();
    }

    [HttpPost]
    public string[] Create()
    {
        return [];
    }

    [HttpGet("events")]
    public async Task Events()
    {
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
