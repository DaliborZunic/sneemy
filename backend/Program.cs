namespace Sneemy.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Services
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("frontend",
                    p => p.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
            });

            var app = builder.Build();

            // Swagger (dev) 
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            if (app.Environment.IsDevelopment())
            {
                app.UseCors("frontend");
            }

            app.UseAuthorization();

            // Serve the built SPA from wwwroot on publish
            app.UseStaticFiles();

            // API routes
            app.MapControllers();

            // SPA fallback (client-side routing)
            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}
