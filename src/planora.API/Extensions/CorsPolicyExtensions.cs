namespace planora.API.Extensions;

public static class CorsPolicyExtensions
{
    public static void SetUpCors(this WebApplication app, IConfiguration config)
    {
        app.UseCors(x =>
        {
            var allowedOrigins = config.GetRequiredSection("Cors:allowedOrigins").Value;
            x
                .WithOrigins(allowedOrigins?.Split(',', StringSplitOptions.RemoveEmptyEntries) ?? [])
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
    }
}