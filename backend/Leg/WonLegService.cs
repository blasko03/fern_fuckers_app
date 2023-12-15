using FernFuckersAppBackend.Controllers;
using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Services;
public class WonLegService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, Guid id, WonLegParams wonLeg)
    {
        return await ValidateAndSave.Call(() => Task.Run(() => ValidateData()), () => SaveData(context, id, wonLeg));
    }
    private static async Task<WonLegResponse> SaveData(ApplicationDbContext context, Guid id, WonLegParams wonLeg)
    {
        var sets = await context.Sets.FindAsync(id);
        var leg = new Leg { TeamId = wonLeg.TeamId };
        sets!.Legs.Add(leg);
        await context.SaveChangesAsync();
        var wl = (WonLegResponse) leg;
        MatchEvents.AddElement(wl);
        return wl;
    }

    private static List<string> ValidateData()
    {
        return [];
    }
}
