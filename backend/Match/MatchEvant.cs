namespace FernFuckersAppBackend.Events;
public class MatchEvent<T>(T message, DateTime createdDate)
{
    public T Message { get; } = message;
    public DateTime CreatedDate { get; } = createdDate;
}
