using Microsoft.AspNetCore.Mvc;

namespace fern_fuckers_app_backend.Controllers;

[Route("api/match")]
[ApiController]
public class MatchController : ControllerBase
{
    [HttpGet]
    public string[] Get()
    {
        return ["returns scores"];
    }
    
    [HttpPut]
    public string[] SetPlayers()
    {
        return [];
    }
}
