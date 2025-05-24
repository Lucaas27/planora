using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using planora.Infrastructure.Persistence.Context;

namespace planora.Infrastructure.Extensions;

public static class DbContextExtensions
{
    public static void ConfigureDbConnection(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<AppDbContext>(opt =>
        {
            var connectionString = config.GetConnectionString("DefaultConnection");
            opt.UseSqlite(connectionString);
        });
    }
}