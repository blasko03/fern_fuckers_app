using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Responses;
public class SetPlayersResponse
{
    public Guid TeamId { get; set; }
    public Guid PlayerId { get; set; }

    public static explicit operator SetPlayersResponse(SetPlayers smt)
    {

        return new SetPlayersResponse
        {
            TeamId = smt.Team.Id,
            PlayerId = smt.Player.Id
        };
    }
}

public class SetTeamPlayersResponse
{
    public Guid SetId { get; set; }
    public SetPlayersResponse[] Players { get; set; } = [];

    public static explicit operator SetTeamPlayersResponse(Set set)
    {

        return new SetTeamPlayersResponse
        {
            Players = set.SetPlayers.Select(p => (SetPlayersResponse)p).ToArray(),
            SetId = set.Id
        };
    }
}
