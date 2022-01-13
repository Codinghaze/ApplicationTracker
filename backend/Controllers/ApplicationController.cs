using backend.Domain.Entity;
using backend.Persistance;
using backend.Persistance.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ApplicationController : ControllerBase
{
    RedisService _rs;
    public ApplicationController(RedisService rs)
    {
        _rs = rs;
    }
    [HttpGet]
    public List<Application> AppList()
    {
        return _rs.GetApplications();
    }
    [HttpPost]
    public bool NewApplication(AppRequestEntity app)
    {
        try
        {
            Application newApp = new Application()
            {
                AnnualPayroll = app.AnnualPayroll,
                AnnualSales = app.AnnualSales,
                BuisnessName = app.BuisnessName,
                Industry = app.Industry,
                Email = app.Email,
                ZipCode = app.ZipCode,
                extGuid = Guid.NewGuid(),
                guid = Guid.NewGuid(),
                createdDate = DateTime.Now
            };
            _rs.addOrUpdateApplication(newApp);
            return true;
        }
        catch (System.Exception)
        {
            return false;
            throw;
        }
    }
    [HttpDelete]
    public bool RemApplication(Guid extGuid)
    {
        try
        {
            _rs.deleteApplicationFromList(extGuid);
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}
