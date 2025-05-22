namespace planora.API.Extensions;

public static class CorsPolicyExtensions
{
    public static void SetUpCors(this WebApplication app)
    {
        app.UseCors(x => x
            .WithOrigins("http://localhost:3000", "https://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
    }
}