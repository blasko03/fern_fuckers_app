using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FernFuckersAppBackend.Controllers;

[Route("api/legs")]
[ApiController]
public class LegsController : ControllerBase
{
    [HttpDelete("{id}")]
    public Results<BadRequest, Ok<string>> Delete(Guid id)
    {
        Console.WriteLine(id);
        return TypedResults.Ok("aaaaaaa");
    }
}
