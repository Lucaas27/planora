using Microsoft.EntityFrameworkCore;
using planora.Domain.Entities;

namespace planora.Infrastructure.Persistence.Context;

/// <summary>
///     Represents the application's database context, responsible for managing database connections
///     and providing access to the application's entities.
///     Inherits from <see cref="DbContext" />.
/// </summary>
public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Activity> Activities { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply all configurations specified in types implementing IEntityTypeConfiguration.
        // Located in Persistence/Extensions
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }

    /// <summary>
    ///     Overrides the SaveChangesAsync method to automatically set timestamps for entities
    ///     inheriting from BaseEntity when they are added or modified.
    /// </summary>
    /// <param name="cancellationToken">A CancellationToken to observe while waiting for the task to complete.</param>
    /// <returns>
    ///     A task that represents the asynchronous save operation. The task result contains the number of state entries
    ///     written to the database.
    /// </returns>
    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Retrieve all tracked entities that are of type BaseEntity and are in the Added or Modified state.
        var entries = ChangeTracker
            .Entries()
            .Where(e => e is { Entity: BaseEntity, State: EntityState.Added or EntityState.Modified });

        // Iterate through the filtered entries to set timestamps.
        foreach (var entityEntry in entries)
        {
            var entity = (BaseEntity)entityEntry.Entity;

            // If the entity is being added, set the CreatedDate to the current UTC time.
            if (entityEntry.State == EntityState.Added)
            {
                entity.CreatedDate = DateTimeOffset.UtcNow;
            }
            // If the entity is being modified, update the UpdatedAt property to the current UTC time.
            else
            {
                entity.UpdatedAt = DateTimeOffset.UtcNow;
            }
        }

        // Call the base SaveChangesAsync method to persist changes to the database.
        return await base.SaveChangesAsync(cancellationToken);
    }
}