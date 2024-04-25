using FernFuckersAppBackend.Models;
using FernFuckersAppBackend.Services;

namespace FernFuckersAppBackend.Championships;
public interface IChampionshipMode
{
    public List<Match> GetMatches(List<Team> teams);
    public TeamPointsResponse[] CalculateChampionshipPoints(Championship championship);
}