using Microsoft.AspNetCore.Mvc;

namespace fern_fuckers_app_backend.Controllers;

[Route("api/teams")]
[ApiController]
public class TeamsController : ControllerBase
{
    [HttpGet]
    public string[] Get()
    {
        return ["Team1", "Team2"];
    }

    [HttpPost]
    public string[] Create()
    {
        return [];
    }
}
