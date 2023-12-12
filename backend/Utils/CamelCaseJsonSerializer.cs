using System.Text.Json;

namespace FernFuckersAppBackend.Utils;

public class CamelCaseJsonSerializer
{
    public static JsonSerializerOptions Options() { 
        return new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }
}