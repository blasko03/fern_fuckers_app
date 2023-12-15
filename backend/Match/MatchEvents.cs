using System.Collections.Concurrent;
using FernFuckersAppBackend.Controllers.Responses;

namespace FernFuckersAppBackend.Events;
public class MatchEvents
{
    private static readonly ConcurrentQueue<MatchEvent<WonLegResponse>> s_messages = [];
    private static readonly ConcurrentQueue<Task> s_listners = new();
    private DateTime _lastMessage;
    private const int MAX_MESSAGES = 10;

    public MatchEvents(DateTime? lastMessage)
    {
        if (lastMessage != null)
        {
            _lastMessage = (DateTime)lastMessage;
        }
    }
    public static void AddElement(WonLegResponse message)
    {
        s_messages.Enqueue(new MatchEvent<WonLegResponse>(message, message.CreatedDate));
        Task lisnter;
        while (s_listners.TryDequeue(out lisnter!))
        {
            lisnter.Start();
        }

        for (var i = 0; i <= s_messages.Count - MAX_MESSAGES; i++)
        {
            s_messages.TryDequeue(out _);
        }
    }

    public async Task<List<WonLegResponse>> WaitMessages()
    {
        var t = new Task(() => { });
        s_listners.Enqueue(t);
        var messages = GetMessages();
        if (messages.Count > 0)
        {
            return messages;
        }

        await t;
        return GetMessages();
    }

    private List<WonLegResponse> GetMessages()
    {
        var messages = s_messages.Where(x => x.CreatedDate > _lastMessage).ToList();
        if (messages.Count != 0)
        {
            _lastMessage = messages.Max(x => x.CreatedDate);
        }

        return messages.Select(m => m.Message).ToList();
    }
}
