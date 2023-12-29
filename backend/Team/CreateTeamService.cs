using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

public class CreateTeamService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, TeamParams team)
    {
        return await ValidateAndSave.Call(() => ValidateData(context, team), () => SaveData(context, team));

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
        var nPlatyers = await context.Players.Where(player => team.Players.Distinct().Contains(player.Id)).CountAsync();
        if (team.Name.Length < 3)
        {
            errors.Add("Name too short");
        }

        if (nPlatyers < 2)
        {
            errors.Add("Not enought players");
        }

        if (nPlatyers > 6)
        {
            errors.Add("Too many players");
        }

        if (await context.Teams.Where(t => t.Name == team.Name).AnyAsync())
        {
            errors.Add("Team already exists");
        }

        if (await context.Players.Where(player => team.Players.Contains(player.Id)).CountAsync() < 2)
        {
            errors.Add("Must select at least 2 players");
        }

        return errors;
    }
}
