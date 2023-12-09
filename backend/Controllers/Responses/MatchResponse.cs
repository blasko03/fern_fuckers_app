
using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Responses;

public class MatchResponse
{
    public Guid Id { get; set; }
    public List<SetResponse> Sets { get; set; } = [];

    public static explicit operator MatchResponse(Match match)
    {

        return new MatchResponse
        {
            Id = match.Id,
            Sets = match.Sets.Select(x => (SetResponse)x).ToList()
        };
    }
}
