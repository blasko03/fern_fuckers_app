namespace FernFuckersAppBackend.Events;
public class MatchEvent<T>(T message, DateTime createdDate, EventTypes type)
{
    public T Message { get; } = message;
    public DateTime CreatedDate { get; } = createdDate;
    public EventTypes Type { get; } = type;
}

public class MatchEventResponse<T>
{
    public required T Message { get; set; }
    public required DateTime CreatedDate { get; set; }
    public required string Type { get; set; }

    public static explicit operator MatchEventResponse<T>(MatchEvent<T> me)
    {

        return new MatchEventResponse<T>
        {
            Message = me.Message,
            Type = me.Type.ToString(),
            CreatedDate = me.CreatedDate
        };
    }
}

public enum EventTypes
{
    WON_LEG,
    CHANGED_PLAYERS
}
