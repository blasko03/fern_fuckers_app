var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(builder => builder.AllowAnyMethod()
                              .AllowAnyOrigin()
                              .AllowAnyHeader());
app.Run();

/*
Endpoint

GET /championships  - list championships
POST /championships - create championship

GET /players - list players
POST /players - create players

GET /teams - list teams
POST /teams - create teams


GET /match/:id - get match returns scores
PUT /match/:id - set match players
POST /match/:id/leg sets score


GET /leg - gets selected leg
POST /play sets single 3 darts play
*/