using Microsoft.AspNetCore.Mvc;

namespace fern_fuckers_app_backend.Controllers;

[Route("api/championships")]
[ApiController]
public class ChampionshipsController : ControllerBase
{
    [HttpGet]
    public string[] Get(ApplicationDbContext context)
    {
        return ["CAmpionato1", "CAmpionato2", context.Championships.Count().ToString()];
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

        for(var i = 0; true; ++i)
        {
            await response.WriteAsync($"data: Controller {i} at {DateTime.Now}\r\r");

            await response.Body.FlushAsync();
            await Task.Delay(5 * 1000);
        }
    }
}
