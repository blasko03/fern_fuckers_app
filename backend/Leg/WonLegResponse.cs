using FernFuckersAppBackend.Models;

namespace FernFuckersAppBackend.Controllers.Responses;

public class WonLegResponse
{
    public Guid Id { set; get; }
    public Guid TeamId { set; get; }
    public Guid SetId { set; get; }
    public DateTime CreatedDate { set; get; }

    public static explicit operator WonLegResponse(Leg leg)
    {

        return new WonLegResponse
        {
            Id = leg.Id,
            TeamId = leg.TeamId,
            SetId = leg.SetId,
            CreatedDate = leg.CreatedDate
        };
    }
}
