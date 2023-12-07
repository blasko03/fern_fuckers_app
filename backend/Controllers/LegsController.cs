using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

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
