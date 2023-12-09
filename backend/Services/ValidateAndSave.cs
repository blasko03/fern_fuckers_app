using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Services;

public class ValidateAndSave
{
    public static async Task<IServiceResult> Call<ResponseType, ParamsType>(ApplicationDbContext context, ParamsType param, Func<ApplicationDbContext, ParamsType, Task<List<string>>> validate, Func<ApplicationDbContext, ParamsType, Task<ResponseType>> save) 
    {
        var errors = await validate(context, param);
        if (errors.Count != 0)
        {
            return new Error(errors);
        }

        var c = save(context, param);

        return new Success<ResponseType>(await c);
    }
}