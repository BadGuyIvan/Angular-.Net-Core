using System;
using System.Linq;
using Auth_Angular_Core.helper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Auth_Angular_Core.models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options)
            :base(options)
        {
        }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>(entity => {
                entity.HasIndex(e => e.Email).IsUnique();
            });
        }

        public override int SaveChanges()
        {
            var salt = Salt.Create();
            var changedEntities = ChangeTracker.Entries<User>().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);
            foreach (EntityEntry entry in changedEntities)
            {
                var password = entry.Property("Password").CurrentValue.ToString();
                var hash = Hash.Create(password, salt);
                entry.Property("Password").CurrentValue = hash;
            }

            return base.SaveChanges();
        }
        
    }
}