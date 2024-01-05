using System.Collections.Concurrent;

namespace FernFuckersAppBackend.Events;

public class MatchEvents
{
    private static readonly ConcurrentQueue<MatchEvent<object>> s_events = [];
    private static readonly ConcurrentQueue<Task> s_listners = new();
    private DateTime _lastMessage;
    private const int MAX_EVENTS = 10;

    public MatchEvents(DateTime? lastMessage)
    {
        if (lastMessage != null)
        {
            _lastMessage = (DateTime)lastMessage;
        }
    }
    public static void NewEvent<T>(T message, EventTypes type, DateTime createdDate)
    {
        s_events.Enqueue(new MatchEvent<object>(message!, createdDate, type));
        Task lisnter;
        while (s_listners.TryDequeue(out lisnter!))
        {
            lisnter.Start();
        }

        for (var i = 0; i <= s_events.Count - MAX_EVENTS; i++)
        {
            s_events.TryDequeue(out _);
        }
    }

    public async Task<List<MatchEvent<object>>> WaitEvents()
    {
        var t = new Task(() => { });
        s_listners.Enqueue(t);
        var events = GetEvents();
        if (events.Count > 0)
        {
            return events;
        }

        await t;
        return GetEvents();
    }

    private List<MatchEvent<object>> GetEvents()
    {
        var events = s_events.Where(x => x.CreatedDate > _lastMessage).ToList();
        if (events.Count != 0)
        {
            _lastMessage = events.Max(x => x.CreatedDate);
        }

        return events;
    }
}
