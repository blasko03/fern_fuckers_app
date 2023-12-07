using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

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
