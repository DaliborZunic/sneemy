using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Sneemy.API.Models;

namespace Sneemy.API.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
            var dbContext = serviceProvider.GetRequiredService<ApplicationDbContext>();

            // Seed Roles
            string[] roleNames = { "Admin", "User" };
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            // Seed Admin User
            var adminEmail = "admin@sneemy.com";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                adminUser = new User
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true,
                    FirstName = "Admin",
                    LastName = "User"
                };

                var result = await userManager.CreateAsync(adminUser, "Admin@123");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }

            // Seed Services
            if (!await dbContext.Services.AnyAsync())
            {
                var services = new List<Service>
                {
                    new Service
                    {
                        Name = "Story / reel objava",
                        Description = "Za male obrte, OPG-ove i influencere koji žele prezentirati proizvod u modernom formatu.",
                        Price = 59m,
                        Features = new List<string>
                        {
                            "video ca. 30 sekundi",
                            "autentičan stil mobilnog formata",
                            "animacija logotipa",
                            "glazba u pozadini",
                            "1 revizija uključena"
                        },
                        IsActive = true,
                        DisplayOrder = 1,
                        VideoType = "reel"
                    },
                    new Service
                    {
                        Name = "YouTube promo video",
                        Description = "Za tvrtke koje žele profesionalni promotivni video za YouTube ili web stranicu.",
                        Price = 149m,
                        Features = new List<string>
                        {
                            "video do 2 minute",
                            "profesionalna montaža",
                            "animacija logotipa",
                            "glazba u pozadini",
                            "2 revizije uključene"
                        },
                        IsActive = true,
                        DisplayOrder = 2,
                        VideoType = "landscape"
                    }
                };

                dbContext.Services.AddRange(services);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}