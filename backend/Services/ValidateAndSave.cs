namespace FernFuckersAppBackend.Services;

public class ValidateAndSave
{
    public static async Task<IServiceResult> Call<ResponseType>(Func<Task<List<string>>> validate, Func<Task<ResponseType>> save)
    {
        var errors = await validate();
        if (errors.Count != 0)
        {
            return new Error(errors);
        }

        var c = save();

        return new Success<ResponseType>(await c);
    }
}
