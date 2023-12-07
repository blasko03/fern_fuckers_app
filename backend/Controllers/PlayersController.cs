using Microsoft.AspNetCore.Mvc;

namespace fern_fuckers_app_backend.Controllers;

[Route("api/players")]
[ApiController]
public class PlayersController : ControllerBase
{
    [HttpGet]
    public string[] Get()
    {
        return ["Player1", "Player2"];
    }
    
    [HttpPost]
    public string[] Create()
    {
        return [];
    }
}
