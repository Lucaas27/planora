using Scalar.AspNetCore;

namespace planora.API.Extensions;

/// <summary>
///     Provides extension methods for development-specific configurations.
/// </summary>
public static class ScalarExtensions
{
    public static void SetUpScalar(this WebApplication app)
    {
        if (!app.Environment.IsDevelopment())
        {
            return;
        }

        app.MapOpenApi();
        app.MapScalarApiReference(options =>
        {
            options
                .WithTitle("Planora API")
                .WithTheme(ScalarTheme.Mars)
                .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
        });
    }
}