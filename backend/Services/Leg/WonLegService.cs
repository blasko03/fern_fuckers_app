using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Services;
public class WonLegService
{
#pragma warning disable IDE0060 // Remove unused parameter
    public static async Task<IServiceResult> Call(ApplicationDbContext context, WonLegParams wonLeg)
#pragma warning restore IDE0060 // Remove unused parameter
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
