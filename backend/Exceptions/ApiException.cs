namespace Sneemy.API.Exceptions
{
    public class ApiException : Exception
    {
        public int StatusCode { get; }

        public ApiException(string message, int statusCode = 400) : base(message)
        {
            StatusCode = statusCode;
        }
    }

    public class UnauthorizedException : ApiException
    {
        public UnauthorizedException(string message = "Unauthorized") : base(message, 401) { }
    }

    public class NotFoundException : ApiException
    {
        public NotFoundException(string message = "Resource not found") : base(message, 404) { }
    }

    public class BadRequestException : ApiException
    {
        public BadRequestException(string message) : base(message, 400) { }
    }
}
