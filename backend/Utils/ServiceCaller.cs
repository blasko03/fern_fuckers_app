using FernFuckersAppBackend.Services;
using Microsoft.AspNetCore.Http.HttpResults;

namespace FernFuckersAppBackend.Controllers;

public class ServiceCaller
{
    public static async Task<Results<BadRequest, Ok<ResponseType>>> Call<ResponseType>(Func<Task<IServiceResult>> service)
    {
        var operation = await service();
        if (operation.IsSuccess())
        {
            return TypedResults.Ok(((Success<ResponseType>)operation).GetResult());
        }

        return TypedResults.BadRequest();
    }
}
