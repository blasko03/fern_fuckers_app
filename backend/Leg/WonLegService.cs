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
        var Sets = await context.Sets.FindAsync(id);
        Sets!.Legs.Add(new Leg { TeamId = wonLeg.TeamId });
        await context.SaveChangesAsync();
        return new WonLegResponse();
    }

    private static List<string> ValidateData()
    {
        return [];
    }
}
