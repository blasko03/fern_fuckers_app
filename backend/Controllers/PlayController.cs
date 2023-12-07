using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

[Route("api/leg")]
[ApiController]
public class PlasController : ControllerBase
{

    [HttpPost]
    public string[] DatsThrow()
    {
        return [];
    }
}
