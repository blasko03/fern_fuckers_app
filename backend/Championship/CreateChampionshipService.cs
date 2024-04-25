using FernFuckersAppBackend.Championships;
using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

public class CreateChampionshipService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, ChampionshipParams championship, IChampionshipMode matchMode)
    {
        return await ValidateAndSave.Call(() => ValidateData(context, championship), () => SaveData(context, championship, matchMode));

    }
    private static async Task<ChampionshipResponse> SaveData(ApplicationDbContext context, ChampionshipParams championship, IChampionshipMode matchMode)
    {
        var c = (await context.Championships.AddAsync((Championship)championship)).Entity;
        var teams = await context.Teams.Where(team => championship.Teams.Contains(team.Id)).ToListAsync();
        c.Teams.AddRange(teams);

        var matches = matchMode.GetMatches(teams);

        c.Matches.AddRange(matches);
        await context.SaveChangesAsync();
        return (ChampionshipResponse)c;
    }

    private static async Task<List<string>> ValidateData(ApplicationDbContext context, ChampionshipParams championship)
    {
        List<string> errors = [];
        var teamsCount = await context.Teams.Where(team => championship.Teams.Distinct().Contains(team.Id)).CountAsync();
        if (await context.Championships.Where(c => c.Name == championship.Name).AnyAsync())
        {
            errors.Add("Championship already exists");
        }

        if (championship.Name.Length < 3)
        {
            errors.Add("Name too short");
        }

        if (teamsCount < 2)
        {
            errors.Add("Not enought teams");
        }

        if (teamsCount > 20)
        {
            errors.Add("Too many teams");
        }

        return errors;
    }
}
