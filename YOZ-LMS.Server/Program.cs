using YOZ_LMS.Shared.Services;
using YOZ_LMS.Shared.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Register OpenRouter service
builder.Services.AddHttpClient<IOpenRouterService, OpenRouterService>();
builder.Services.AddMemoryCache();

// Add configuration
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    // Development configuration
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseRouting();
app.UseStaticFiles();

app.MapControllers();

// Health check endpoint
app.MapGet("/health", () => new { status = "healthy", timestamp = DateTime.UtcNow });

// Fallback route for SPA
app.MapFallbackToFile("index.html");

app.Run();
