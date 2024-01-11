using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

[Route("liveness/check")]
[ApiController]

public class LivenessCheckController : ControllerBase
{
    [HttpGet]
    public string Get()
    {
        return "OK";
    }
}
