using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Senai.OpFlix.WebApi
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            //CONFIG MVC
            services.AddMvc() //addiciona aí o mvc 
                .AddJsonOptions(options =>
               {
                   options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                   options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
               })
               .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);

            //CONFIG SWAGGER
            services.AddSwaggerGen(c => // addiciona ai o swagger e nomeia como tal além do mais sua versão é tal
                  c.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info
                  {
                      Title = "OpFlix API",
                      Version = "v1"
                  })
           );

            //CONFIG JWT
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "JwtBearer";
                options.DefaultChallengeScheme = "JwtBearer";
            }).AddJwtBearer("JwtBearer", options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("Chave_OpFlix_linda_bonita_e_charmosa")),
                    ClockSkew = TimeSpan.FromMinutes(30),
                    ValidIssuer = "OpFlix.WebApi",
                    ValidAudience = "OpFlix.WebApi"
                };
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials());
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "OpFlix API V1");
            });

            //FICAR EM ÚLTIMO
            app.UseMvc();

            
        }
    }
}
