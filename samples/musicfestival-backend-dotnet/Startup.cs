using System.Runtime.InteropServices;
using EPiServer.Cms.Shell;
using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.ContentApi.Cms;
using EPiServer.ContentApi.Core.DependencyInjection;
using EPiServer.ContentDefinitionsApi;
using EPiServer.Core;
using EPiServer.Data;
using EPiServer.DependencyInjection;
using EPiServer.OpenIDConnect;
using EPiServer.Web;
using EPiServer.Web.Routing;

// using Optimizely.ContentGraph.Cms.NetCore.ProxyUtils;

namespace MusicFestival.Backend;

public class Startup
{
    private readonly IWebHostEnvironment _webHostingEnvironment;
    private readonly string _frontendUri;
    private readonly IConfiguration _configuration;

    public Startup(IWebHostEnvironment webHostingEnvironment, IConfiguration configuration)
    {
        _webHostingEnvironment = webHostingEnvironment;
        _configuration = configuration;
        _frontendUri = _configuration["FRONT_END_URI"];
    }

    public void ConfigureServices(IServiceCollection services)
    {
        var isMacOs = RuntimeInformation.IsOSPlatform(OSPlatform.OSX);
        var localDBPath = Path.Combine(_webHostingEnvironment.ContentRootPath, "App_Data\\musicfestival.mdf");
        var localDBConnString = $@"Data Source=(LocalDb)\MSSQLLocalDB;AttachDbFilename={localDBPath};
                                    Integrated Security=True;Encrypt=False;
                                    Connect Timeout=30;MultipleActiveResultSets=True";
        var macOsConnString = @"Data Source=localhost,1433;Initial Catalog=musicfestival;
                                User=sa;Password=Admin123!;
                                Trust Server Certificate=True;Connect Timeout=30";
        var connectionstring = _configuration.GetConnectionString("EPiServerDB")
                                ?? (isMacOs ? macOsConnString : localDBConnString);
        services.Configure<DataAccessOptions>(o =>
        {
            o.SetConnectionString(connectionstring);
        });
        AppDomain.CurrentDomain.SetData("DataDirectory", Path.Combine(_webHostingEnvironment.ContentRootPath, "App_Data"));

        services
            .AddCmsAspNetIdentity<ApplicationUser>()
            .AddCms()
            .AddAdminUserRegistration()
            .AddEmbeddedLocalization<Program>()
            .ConfigureForExternalTemplates()
            .Configure<ExternalApplicationOptions>(options => options.OptimizeForDelivery = true)
            .Configure<DisplayOptions>(options =>
            {
                options
                    .Add("full", "Full", "u-md-sizeFull", string.Empty, "epi-icon__layout--full")
                    .Add("wide", "Wide", "u-md-size2of3", string.Empty, "epi -icon__layout--two-thirds")
                    .Add("half", "Half", "u-md-size1of2", string.Empty, "epi-icon__layout--half")
                    .Add("narrow", "Narrow", "u-md-size1of3", string.Empty, "epi-icon__layout--one-third");
            });

        // services.AddOpenIddict();

        Console.WriteLine("Adding OpenID Connect");
        services.AddOpenIDConnect<ApplicationUser>(
            useDevelopmentCertificate: true,
            signingCertificate: null,
            encryptionCertificate: null,
            createSchema: true,
            options =>
            {
                var baseUri = new Uri(_frontendUri);
                options.RequireHttps = !_webHostingEnvironment.IsDevelopment();
                options.DisableTokenPruning = true;
                options.DisableSlidingRefreshTokenExpiration = true;

                options.Applications.Add(new OpenIDConnectApplication
                {
                    ClientId = "frontend",
                    // ClientSecret = "frontend",
                    Scopes = { "openid", "offline_access", "profile", "email", "roles", ContentDeliveryApiOptionsDefaults.Scope },
                    PostLogoutRedirectUris = { baseUri },
                    RedirectUris =
                    {
                        new Uri(baseUri, "/"),
                        new Uri(baseUri, "/login-callback"),
                        new Uri(baseUri, "/login-renewal"),
                        new Uri(baseUri, "/api/auth/callback/optimizely_cms"),
                    },
                });

                options.Applications.Add(new OpenIDConnectApplication
                {
                    ClientId = "cli",
                    ClientSecret = "cli",
                    Scopes = { ContentDefinitionsApiOptionsDefaults.Scope },
                });
            });

        services.AddOpenIDConnectUI();

        // No encrypt the token so it's easier to debug, not recommend for production.
        services.AddOpenIddict()
            .AddServer(options => options.DisableAccessTokenEncryption());

        services.AddContentDefinitionsApi(OpenIDConnectOptionsDefaults.AuthenticationScheme);

        services.AddContentDeliveryApi(OpenIDConnectOptionsDefaults.AuthenticationScheme);

        services.AddContentManagementApi(OpenIDConnectOptionsDefaults.AuthenticationScheme, options =>
        {
            options.DisableScopeValidation = false;
            options.RequiredRole = "WebAdmins";
        });
        // services.AddContentManagementApi(string.Empty);

        services.AddOpenIddict()
            .AddServer(options =>
            {
                options.DisableAccessTokenEncryption();
            });

        services.ConfigureForContentDeliveryClient();

        services.ConfigureContentApiOptions(o =>
        {
            o.FlattenPropertyModel = true;
            o.EnablePreviewFeatures = true;
            o.SetValidateTemplateForContentUrl(true);
            o.IncludeSiteHosts = true;
            o.IncludeInternalContentRoots = true;
            o.IncludeNumericContentIdentifier = true;
        });

        services.AddContentGraph(OpenIDConnectOptionsDefaults.AuthenticationScheme);
        services.AddHostedService<ProvisionDatabase>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseStaticFiles();
        app.UseRouting();
        app.UseCors(b => b
            .WithOrigins(new[] { $"{_frontendUri}", "*" })
            .WithExposedContentDeliveryApiHeaders()
            .WithExposedContentDefinitionApiHeaders()
            .WithHeaders("Authorization")
            .AllowAnyMethod()
            .AllowCredentials());

        app.UseAuthentication();
        app.UseAuthorization();

        app.Use(async (context, next) => {
            context.Request.EnableBuffering();
            await next.Invoke();
        });

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapContent();
        });

        app.UseStatusCodePages(context =>
        {
            if (context.HttpContext.Response.HasStarted == false &&
                context.HttpContext.Response.StatusCode == StatusCodes.Status404NotFound &&
                context.HttpContext.Request.Path == "/")
            {
                context.HttpContext.Response.Redirect("/episerver/cms");
            }

            return Task.CompletedTask;
        });
    }
}
