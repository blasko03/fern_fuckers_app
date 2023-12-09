using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Services;

public class CreatePlayerService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, PlayerParams player)
    {
        return await ValidateAndSave.Call(() => Task.Run(() => ValidateData(player)), () => SaveData(context, player));

    }
    private static async Task<PlayerResponse> SaveData(ApplicationDbContext context, PlayerParams player)
    {
        var c = (await context.Players.AddAsync((Player)player)).Entity;
        await context.SaveChangesAsync();
        return (PlayerResponse)c;
    }

    private static List<string> ValidateData(PlayerParams player)
    {
        List<string> errors = [];
        if (player.Name.Length < 5)
        {
            errors.Add("Name too short");
        }

        if (player.Surname.Length < 5)
        {
            errors.Add("Surname too short");
        }

        return errors;
    }
}
