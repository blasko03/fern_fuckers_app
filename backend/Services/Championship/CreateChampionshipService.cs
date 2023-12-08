using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Services;

public class CreateChampionshipService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, ChampionshipParams championship)
    {
        var errors = ValidateData(context, championship);
        if (errors.Count != 0)
        {
            return new Error(errors);
        }

        var c = (await context.Championships.AddAsync((Championship)championship)).Entity;
        c.Teams.AddRange(context.Teams.Where(team => championship.Teams.Contains(team.Id)).ToList());
        await context.SaveChangesAsync();

        return new Success<ChampionshipResponse>((ChampionshipResponse)c);
    }

    private static List<string> ValidateData(ApplicationDbContext context, ChampionshipParams championship)
    {
        List<string> errors = [];
        if (championship.Name.Length < 5)
        {
            errors.Add("Name too short");
        }

        if (context.Teams.Where(team => championship.Teams.Distinct().Contains(team.Id)).Count() < 2)
        {
            errors.Add("Not enought teams");
        }

        return errors;
    }
}
