namespace planora.API.Extensions;

/// <summary>
///     Provides extension methods for development-specific configurations.
/// </summary>
public static class SwaggerExtensions
{
    /// <summary>
    ///     Configures middleware that is only available in development environment.
    /// </summary>
    /// <param name="app">The <see cref="WebApplication" /> instance.</param>
    public static void SetUpSwagger(this WebApplication app)
    {
        if (!app.Environment.IsDevelopment())
        {
            return;
        }

        app.MapOpenApi();
        app.UseSwaggerUI(options => { options.SwaggerEndpoint("/openapi/v1.json", "Open API V1"); });
    }
}