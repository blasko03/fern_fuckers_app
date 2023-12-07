using Microsoft.AspNetCore.Mvc;

namespace fern_fuckers_app_backend.Controllers;

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
