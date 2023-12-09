using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

public class CreateTeamService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, TeamParams team)
    {
        return await ValidateAndSave.Call(context, team, ValidateData, SaveData);

    }
    private static async Task<TeamResponse> SaveData(ApplicationDbContext context, TeamParams team)
    {
        var c = (await context.Teams.AddAsync((Team)team)).Entity;
        c.Players.AddRange(context.Players.Where(player => team.Players.Contains(player.Id)).ToList());
        await context.SaveChangesAsync();
        return (TeamResponse)c;
    }

    private static async Task<List<string>> ValidateData(ApplicationDbContext context, TeamParams team)
    {
        List<string> errors = [];
        if (team.Name.Length < 5)
        {
            errors.Add("Name too short");
        }

        Console.WriteLine(await context.Players.Where(player => team.Players.Distinct().Contains(player.Id)).CountAsync());
        if (await context.Players.Where(player => team.Players.Distinct().Contains(player.Id)).CountAsync() < 2)
        {
            errors.Add("Not enought players");
        }

        return errors;
    }
}
