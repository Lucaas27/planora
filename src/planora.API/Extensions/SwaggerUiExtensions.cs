namespace planora.API.Extensions;

/// <summary>
///     Provides extension methods for development-specific configurations.
/// </summary>
public static class SwaggerUiExtensions
{
    public static void SetUpSwaggerUi(this WebApplication app)
    {
        if (!app.Environment.IsDevelopment())
        {
            return;
        }

        app.MapOpenApi();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/openapi/v1.json", "Open API V1");
        });
    }
}
