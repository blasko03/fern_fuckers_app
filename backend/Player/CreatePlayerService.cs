using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

public class CreatePlayerService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, PlayerParams player)
    {
        return await ValidateAndSave.Call(() => ValidateData(context, player), () => SaveData(context, player));

    }
    private static async Task<PlayerResponse> SaveData(ApplicationDbContext context, PlayerParams player)
    {
        var c = (await context.Players.AddAsync((Player)player)).Entity;
        await context.SaveChangesAsync();
        return (PlayerResponse)c;
    }

    private static async Task<List<string>> ValidateData(ApplicationDbContext context, PlayerParams player)
    {
        List<string> errors = [];
        if (player.Name.Length < 3)
        {
            errors.Add("Name too short");
        }

        if (player.Surname.Length < 3)
        {
            errors.Add("Surname too short");
        }

        if (await context.Players.Where(p => p.Name == p.Name && p.Surname == player.Surname).AnyAsync())
        {
            errors.Add("Player already exists");
        }

        return errors;
    }
}
