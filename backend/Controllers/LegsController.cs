using Microsoft.AspNetCore.Mvc;

namespace fern_fuckers_app_backend.Controllers;

[Route("api/leg")]
[ApiController]
public class LegsController : ControllerBase
{
    [HttpGet]
    public string[] Get()
    {
        return ["returns scores"];
    }
    
    [HttpPut]
    public string[] SetLeg()
    {
        return [];
    }
}
