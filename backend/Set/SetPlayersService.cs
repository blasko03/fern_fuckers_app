using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Events;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

public class SetPlayersService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, SetPlayersParams matchPlayers, Guid id)
    {
        return await ValidateAndSave.Call(() => ValidateData(context, matchPlayers, id), () => SaveData(context, matchPlayers, id));
    }

    private static async Task<SetTeamPlayersResponse> SaveData(ApplicationDbContext context, SetPlayersParams legPlayers, Guid id)
    {
        var set = await context.Sets.Where(set => set.Id == id)
                                    .Include(set => set.SetPlayers)
                                    .FirstAsync();
        var team = await context.Teams.Include(team => team.Players)
                                      .Where(team => team.Id == legPlayers.TeamId)
                                      .FirstAsync();
        var setTeamPlayers = team.Players.Where(player => legPlayers.Players
                                         .Contains(player.Id))
                                         .Select(player => new SetPlayers { Set = set, Player = player, Team = team! });
        set!.SetPlayers.RemoveAll(x => x.Team == team);
        set!.SetPlayers.AddRange(setTeamPlayers);
        await context.SaveChangesAsync();
        var res = (SetTeamPlayersResponse)set;
        MatchEvents.NewEvent(res, EventTypes.CHANGED_PLAYERS, DateTime.Now);
        return res;
    }

    private static async Task<List<string>> ValidateData(ApplicationDbContext context, SetPlayersParams setPlayers, Guid id)
    {
        List<string> errors = [];

        var set = await context.Sets.Include(s => s.Match)
                                    .ThenInclude(m => m!.Teams)
                                    .ThenInclude(t => t.Players)
                                    .Where(set => set.Id == id)
                                    .FirstOrDefaultAsync();
        var team = set!.Match!.Teams.Where(t => t.Id == setPlayers.TeamId).FirstOrDefault();

        if (set == null)
        {
            errors.Add("wrong setId");
            return errors;
        }

        if (team == null)
        {
            errors.Add("wrong teamId");
            return errors;
        }

        if (team!.Players.Count(p => setPlayers.Players.Contains(p.Id)) != setPlayers.Players.Count)
        {
            errors.Add("Players not matching teamId");
        }

        if (setPlayers.Players.Count > set!.NumberPlayers)
        {
            errors.Add("To many players");
        }

        return errors;
    }
}
