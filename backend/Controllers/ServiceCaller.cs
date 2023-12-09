using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;
using Microsoft.AspNetCore.Http.HttpResults;

namespace FernFuckersAppBackend.Controllers;

public class ServiceCaller
{

    public static async Task<Results<BadRequest, Ok<ResponseType>>> Call<ResponseType, ParamsType>(ParamsType param, ApplicationDbContext context, Func<ApplicationDbContext, ParamsType, Task<IServiceResult>> service)
    {
        var operation = await service(context, param);
        if (operation.IsSuccess())
        {
            return TypedResults.Ok(((Success<ResponseType>)await service(context, param)).GetResult());
        }

        return TypedResults.BadRequest();
    }
}
