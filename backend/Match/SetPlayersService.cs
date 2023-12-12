using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

public class SetPlayersService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, SetPlayersParams legPlayers, Guid id)
    {
        return await ValidateAndSave.Call(() => Task.Run(() => ValidateData()), () => SaveData(context, legPlayers, id));

    }
    private static async Task<SetPlayersResponse> SaveData(ApplicationDbContext context, SetPlayersParams legPlayers, Guid id)
    {
        var set = await context.Sets.FindAsync(id);
        set!.Players = await context.Players.Where(player => legPlayers.Players.Contains(player.Id)).ToListAsync();
        return new SetPlayersResponse { };
    }

    private static List<string> ValidateData()
    {

        return [];
    }
}
