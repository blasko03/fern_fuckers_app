using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

public class CreateChampionshipService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, ChampionshipParams championship)
    {
        return await ValidateAndSave.Call(context, championship, ValidateData, SaveData);

    }
    private static async Task<ChampionshipResponse> SaveData(ApplicationDbContext context, ChampionshipParams championship)
    {
        var c = (await context.Championships.AddAsync((Championship)championship)).Entity;
        c.Teams.AddRange(context.Teams.Where(team => championship.Teams.Contains(team.Id)).ToList());
        await context.SaveChangesAsync();
        return (ChampionshipResponse)c;
    }

    private static async Task<List<string>> ValidateData(ApplicationDbContext context, ChampionshipParams championship)
    {
        List<string> errors = [];
        if (championship.Name.Length < 5)
        {
            errors.Add("Name too short");
        }

        if (await context.Teams.Where(team => championship.Teams.Distinct().Contains(team.Id)).CountAsync() < 2)
        {
            errors.Add("Not enought teams");
        }

        return errors;
    }
}
