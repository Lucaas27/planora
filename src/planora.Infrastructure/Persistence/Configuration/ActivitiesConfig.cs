using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using planora.Domain.Entities;
using planora.Infrastructure.Persistence.Configuration.Common;

namespace planora.Infrastructure.Persistence.Configuration;

/// <summary>
///     Configuration class for the <see cref="Activity" /> entity.
///     Inherits common configuration from <see cref="BaseEntityTypeConfiguration{TEntity}" />.
/// </summary>
internal class ActivitiesConfig : BaseEntityTypeConfiguration<Activity>
{
    public override void Configure(EntityTypeBuilder<Activity> builder)
    {
        // Apply base configuration for entities inheriting from BaseEntity.
        base.Configure(builder);

        // Entity-specific configuration
        builder.ToTable("Activities");

        builder.Property(a => a.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(a => a.Description)
            .IsRequired()
            .HasMaxLength(1000);
    }
}