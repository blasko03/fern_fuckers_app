using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Responses;
public class SetPlayersResponse
{
    public Guid TeamId {get; set;}
    public Guid PlayerId {get; set;}

    public static explicit operator SetPlayersResponse(SetPlayers smt)
    {

        return new SetPlayersResponse
        {
            TeamId = smt.Team.Id,
            PlayerId = smt.Player.Id
        };
    }
}
