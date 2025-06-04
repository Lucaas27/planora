using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using planora.Domain.Repositories;
using planora.Infrastructure.Persistence.Context;

namespace planora.Infrastructure.Repositories;

public class Repository<T>(AppDbContext context) : IRepository<T> where T : class
{
    private readonly DbSet<T> _dbSet = context.Set<T>();

    public async Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbSet.FindAsync([id], cancellationToken);
    }

    public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _dbSet.ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<T>> FindAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken
    )
    {
        return await _dbSet.Where(predicate).ToListAsync(cancellationToken);
    }

    public async Task AddAsync(T entity, CancellationToken cancellationToken)
    {
        _dbSet.Add(entity);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken)
    {
        _dbSet.AddRange(entities);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(T entity, CancellationToken cancellationToken)
    {
        // Get the primary key value of the entity
        var entityType = context.Model.FindEntityType(typeof(T));
        var primaryKey = entityType?.FindPrimaryKey();

        if (primaryKey != null)
        {
            // Get the primary key value from the entity
            var keyProperty = primaryKey.Properties[0];
            var keyValue = keyProperty.GetGetter().GetClrValue(entity);

            // Try to find the entity that's being tracked
            var tracked = await _dbSet.FindAsync([keyValue], cancellationToken);

            if (tracked != null)
            {
                // Detach the tracked entity to avoid conflicts
                context.Entry(tracked).State = EntityState.Detached;
            }
        }

        // Update the entity without tracking conflicts
        _dbSet.Update(entity);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(T entity, CancellationToken cancellationToken)
    {
        _dbSet.Remove(entity);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken)
    {
        _dbSet.RemoveRange(entities);
        await context.SaveChangesAsync(cancellationToken);
    }
}