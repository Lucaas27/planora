namespace planora.API.Extensions;

static internal class CorsPolicyExtensions
{
    static internal void SetUpCors(this WebApplication app, IConfiguration config)
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