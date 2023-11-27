using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AADTask.Data;
using AADTask.DBdata;
using AADTask.CliamsFile.ClaimsFile;

namespace AADTask
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
                        var connectionString = builder.Configuration.GetConnectionString("AADTaskContextConnection") ?? throw new InvalidOperationException("Connection string 'AADTaskContextConnection' not found.");

                                    builder.Services.AddDbContext<AADTaskContext>(options =>
                options.UseSqlServer(connectionString));

                                                builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<AADTaskContext>();

            builder.Services.AddTransient<IClaimsTransformation, AddRolesClaimsTransformation>();

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            builder.Services.AddAuthentication(AzureADDefaults.AuthenticationScheme)
   .AddAzureAD(options => builder.Configuration.Bind("AzureAd", options));

            // Define the route for authentication
            builder.Services.AddAuthorization();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
                        app.UseAuthentication();;

            app.UseAuthorization();

            app.MapControllerRoute(
               name: "EmployeeData",
               pattern: "/",
               defaults: new { controller = "Home", action = "GetEmployeeData" });

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action}/{plannerId?}",
                defaults: new { controller = "Home", action = "Index" });

            app.Run();
        }
    }
}