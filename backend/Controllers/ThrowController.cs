using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

[Route("api/throw")]
[ApiController]
public class ThrowController : ControllerBase
{

    [HttpPost]
    public string[] DatsThrow()
    {
        return [];
    }
}
