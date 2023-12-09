using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Services;

public class SetPlayersService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, List<SetPlayersParams> legPlayers, Guid id)
    {
        return await ValidateAndSave.Call(() => Task.Run(() => ValidateData(legPlayers)), () => SaveData(context, legPlayers));

    }
    private static async Task<SetPlayersResponse> SaveData(ApplicationDbContext context, List<SetPlayersParams> legPlayers)
    {
        return new SetPlayersResponse{};
    }

    private static List<string> ValidateData(List<SetPlayersParams> legPlayers)
    {

        return [];
    }
}
