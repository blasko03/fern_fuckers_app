using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

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
