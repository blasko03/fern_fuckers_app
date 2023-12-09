using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Services;

public class SetPlayersService
{
#pragma warning disable IDE0060 // Remove unused parameter
    public static async Task<IServiceResult> Call(ApplicationDbContext context, List<SetPlayersParams> legPlayers, Guid id)
#pragma warning restore IDE0060 // Remove unused parameter
    {
        return await ValidateAndSave.Call(() => Task.Run(() => ValidateData(legPlayers)), () => SaveData());

    }
    private static async Task<SetPlayersResponse> SaveData()
    {
        return new SetPlayersResponse { };
    }

    private static List<string> ValidateData(List<SetPlayersParams> legPlayers)
    {

        return [];
    }
}
