using System.Text.Json;
using planora.Domain.Entities;
using planora.Infrastructure.Persistence.Context;

namespace planora.Infrastructure.Persistence.Seeder;

sealed internal class DbSeeder(AppDbContext context) : IDbSeeder
{
    private static readonly string s_activityDataPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory,
        "Persistence", "Seeder", "activityData.json");

    private readonly AppDbContext _context = context ?? throw new ArgumentNullException(nameof(context));


    public async Task SeedActivityDataAsync()
    {
        if (_context.Activities.Any())
        {
            return;
        }

        var activities = await GetSeedDataAsync<Activity>(s_activityDataPath);
        await _context.Activities.AddRangeAsync(activities);
        await _context.SaveChangesAsync();
    }


    private static async Task<IEnumerable<T>> GetSeedDataAsync<T>(string path)
    {
        if (!File.Exists(path))
        {
            throw new FileNotFoundException($"Seed data file not found at: {path}");
        }

        var json = await File.ReadAllTextAsync(path);
        var data = JsonSerializer.Deserialize<IEnumerable<T>>(json);
        return data ?? [];
    }
}