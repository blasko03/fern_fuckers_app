﻿using FernFuckersAppBackend.Controllers.Params;
using FernFuckersAppBackend.Controllers.Responses;
using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FernFuckersAppBackend.Controllers;

[Route("api/championships")]
[ApiController]

public class ChampionshipsController : ControllerBase
{
    [HttpGet]
    public async Task<List<ChampionshipResponse>> Get(ApplicationDbContext context)
    {
        var teams = context.Teams;
        return await context.Championships.Include(e => e.Teams)
                                          .ThenInclude(team => team.Players)
                                          .Include(e => e.Matches)
                                          .ThenInclude(match => match.Teams)
                                          .Select(x => (ChampionshipResponse)x).ToListAsync();
    }

    [HttpPost]
    public async Task<Results<BadRequest, Ok<ChampionshipResponse>>> Create([FromBody] ChampionshipParams championship, ApplicationDbContext context)
    {
        return await ServiceCaller.Call<ChampionshipResponse>(() => CreateChampionshipService.Call(context, championship));
    }
}
