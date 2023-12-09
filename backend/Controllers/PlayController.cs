using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

[Route("api/play")]
[ApiController]
public class PlayController : ControllerBase
{

    [HttpPost]
    public string[] DatsThrow()
    {
        return [];
    }
}
