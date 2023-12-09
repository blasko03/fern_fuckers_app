using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Services;
public class WonLegService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, WonLegParams player)
    {
        return await ValidateAndSave.Call(() => Task.Run(() => ValidateData()), () => SaveData(context));
    }
    private static async Task<WonLegResponse> SaveData(ApplicationDbContext context)
    {
        context.Sets.First().Legs.Add(new Leg { });
        await context.SaveChangesAsync();
        return new WonLegResponse();
    }

    private static List<string> ValidateData()
    {
        return [];
    }
}
