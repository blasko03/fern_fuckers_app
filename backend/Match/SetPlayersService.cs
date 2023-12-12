using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

public class SetPlayersService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, List<SetPlayersParams> matchPlayers, Guid id)
    {
        return await ValidateAndSave.Call(() => Task.Run(() => ValidateData()), () => SaveData(context, matchPlayers, id));
    }

    private static async Task<SetPlayersResponse> SaveData(ApplicationDbContext context, List<SetPlayersParams> matchPlayers, Guid id)
    {
        foreach (var matchPlayer in matchPlayers)
        {
            await SaveForSet(context, matchPlayer, id);
        }

        return new SetPlayersResponse { };
    }

    private static async Task<SetPlayersResponse> SaveForSet(ApplicationDbContext context, SetPlayersParams legPlayers, Guid id)
    {
        var set = await context.Sets.Where(set => set.Id == legPlayers.SetId)
                                    .Where(set => set.MatchId == id)
                                    .Include(set => set.SetMatchTeam)
                                    .FirstAsync();
        var team = await context.Teams.Include(team => team.Players)
                                      .Where(team => team.Id == legPlayers.TeamId)
                                      .FirstAsync();
        var setTeamPlayers = team.Players.Where(player => legPlayers.Players
                                  .Contains(player.Id))
                                  .Select(player => new SetMatchTeam { Set = set, Player = player, Team = team! });
        set!.SetMatchTeam.RemoveAll(x => x.Team == team);
        set!.SetMatchTeam.AddRange(setTeamPlayers);
        await context.SaveChangesAsync();
        return new SetPlayersResponse { };
    }

    private static List<string> ValidateData()
    {

        return [];
    }
}
