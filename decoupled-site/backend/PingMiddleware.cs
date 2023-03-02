namespace MusicFestival.Backend;

public class PingMiddleware
{
    private readonly RequestDelegate _next;

    public PingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path == "/")
        {
            context.Response.StatusCode = 200;
            context.Response.ContentType = "text/plain";
            await context.Response.WriteAsync("OK");
        }
        else
        {
            await _next(context);
        }
    }
}

public static class PingMiddlewareExtensions
{
    public static IApplicationBuilder UsePing(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<PingMiddleware>();
    }
}
