using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

public class SetPlayersService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, List<SetPlayersParams> matchPlayers, Guid id)
    {
        return await ValidateAndSave.Call(() => ValidateData(context, matchPlayers, id), () => SaveData(context, matchPlayers, id));
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
        return new SetPlayersResponse { };
    }

    private static async Task<List<string>> ValidateData(ApplicationDbContext context, List<SetPlayersParams> matchPlayers, Guid id)
    {
        var match = await context.Matches.Include(x => x.Sets).Include(x => x.Teams).ThenInclude(t => t.Players).Where(match => match.Id == id).FirstAsync();
        return matchPlayers.SelectMany(mp => ValidateSetPlayers(match, mp)).ToList();
    }

    private static List<string> ValidateSetPlayers(Match match, SetPlayersParams setPlayers)
    {
        List<string> errors = [];
        var team = match.Teams.Where(team => team.Id == setPlayers.TeamId).FirstOrDefault();
        var set = match.Sets.Where(set => set.Id == setPlayers.SetId).FirstOrDefault();

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
