using backend.Persistance;
using backend.Persistance.Services;
using Microsoft.AspNetCore.Authentication.Certificate;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost,password=AppPass");
builder.Services.AddSingleton(redis);
builder.Services.AddSingleton<RedisService>();

builder.Services.AddAuthentication(
    CertificateAuthenticationDefaults.AuthenticationScheme)
    .AddCertificate();
builder.Services.AddCors(options =>
{
options.AddDefaultPolicy(
    builder =>
    {
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
        builder.AllowAnyOrigin();
    });
});
var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthorization();
app.Urls.Add("http://*:3005");
app.UseCors();
app.MapControllers();

app.Run();
