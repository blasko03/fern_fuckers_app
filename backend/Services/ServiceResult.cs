namespace FernFuckersAppBackend.Services;

public class Success<T>(T result) : IServiceResult
{
    private readonly T _result = result;

    public T GetResult()
    {
        return _result;
    }

    public bool IsSuccess()
    {
        return true;
    }
}

public class Error(List<string> errors) : IServiceResult
{
    private readonly List<string> _errors = errors;

    public List<string> GetErrors()
    {
        return _errors;
    }

    public bool IsSuccess()
    {
        return false;
    }
}

public interface IServiceResult
{
    bool IsSuccess();
}
