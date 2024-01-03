using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Events;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;
public class WonLegService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, Guid id, WonLegParams wonLeg)
    {
        return await ValidateAndSave.Call(() => ValidateData(context, id, wonLeg), () => SaveData(context, id, wonLeg));
    }
    private static async Task<WonLegResponse> SaveData(ApplicationDbContext context, Guid id, WonLegParams wonLeg)
    {
        var set = await context.Sets.FindAsync(id);
        var leg = new Leg { TeamId = wonLeg.TeamId };
        set!.Legs.Add(leg);
        await context.SaveChangesAsync();
        var wl = (WonLegResponse)leg;
        MatchEvents.AddElement(wl);
        return wl;
    }

    private static async Task<List<string>> ValidateData(ApplicationDbContext context, Guid id, WonLegParams wonLeg)
    {
        List<string> errors = [];
        var set = await context.Sets.Include(set => set.Legs).Where(set => set.Id == id).FirstAsync();
        if (set!.Legs.Count >= set.NumberLegs)
        {
            errors.Add("Reached maximum number of legs");
        }

        if (!await context.Matches.Include(m => m.Teams).Where(m => m.Id == set.MatchId).AnyAsync(m => m.Teams.Select(t => t.Id).Contains(wonLeg.TeamId)))
        {
            errors.Add("Wrong teamId");
        }

        return errors;
    }
}
