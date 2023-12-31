﻿using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Services;

public class CreateChampionshipService
{
    public static async Task<IServiceResult> Call(ApplicationDbContext context, ChampionshipParams championship)
    {
        return await ValidateAndSave.Call(() => ValidateData(context, championship), () => SaveData(context, championship));

    }
    private static async Task<ChampionshipResponse> SaveData(ApplicationDbContext context, ChampionshipParams championship)
    {
        var c = (await context.Championships.AddAsync((Championship)championship)).Entity;
        var teams = await context.Teams.Where(team => championship.Teams.Contains(team.Id)).ToListAsync();
        c.Teams.AddRange(teams);

        var matches = teams.Select((team1, i) =>
        {
            return teams.Skip(i + 1).Where(team2 => team1.Id != team2.Id).Select(team2 =>
            {
                var match = new Match { };
                match.Teams.AddRange([team1, team2]);
                match.Sets.Add(new Set { NumberLegs = 5, NumberPlayers = 1, WhoWins = SetWinningRule.WHO_WINS_FIRST });
                match.Sets.Add(new Set { NumberLegs = 5, NumberPlayers = 1, WhoWins = SetWinningRule.WHO_WINS_FIRST });
                match.Sets.Add(new Set { NumberLegs = 2, NumberPlayers = 2, WhoWins = SetWinningRule.ALL_LEGS });
                match.Sets.Add(new Set { NumberLegs = 2, NumberPlayers = 2, WhoWins = SetWinningRule.ALL_LEGS });
                return match;
            });
        }).SelectMany(x => x).ToList();

        c.Matches.AddRange(matches);
        await context.SaveChangesAsync();
        return (ChampionshipResponse)c;
    }

    private static async Task<List<string>> ValidateData(ApplicationDbContext context, ChampionshipParams championship)
    {
        List<string> errors = [];
        var teamsCount = await context.Teams.Where(team => championship.Teams.Distinct().Contains(team.Id)).CountAsync();
        if (await context.Championships.Where(c => c.Name == championship.Name).AnyAsync())
        {
            errors.Add("Championship already exists");
        }

        if (championship.Name.Length < 3)
        {
            errors.Add("Name too short");
        }

        if (teamsCount < 2)
        {
            errors.Add("Not enought teams");
        }

        if (teamsCount > 20)
        {
            errors.Add("Too many teams");
        }

        return errors;
    }
}
