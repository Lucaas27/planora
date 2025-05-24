using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using planora.Domain.Entities;

namespace planora.Infrastructure.Persistence.Configuration.Common;

/// <summary>
///     Abstract base class for configuring entities that inherit from <see cref="BaseEntity" />.
///     Provides common configuration for the primary key and timestamp properties.
/// </summary>
/// <typeparam name="TEntity">The type of the entity being configured, which must inherit from <see cref="BaseEntity" />.</typeparam>
internal abstract class BaseEntityTypeConfiguration<TEntity>
    : IEntityTypeConfiguration<TEntity>
    where TEntity : BaseEntity
{
    public virtual void Configure(EntityTypeBuilder<TEntity> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedDate).IsRequired();
        builder.Property(x => x.UpdatedAt).IsRequired(false);
    }
}