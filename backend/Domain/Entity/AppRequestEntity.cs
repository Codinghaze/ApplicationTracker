using Microsoft.AspNetCore.Mvc;

namespace backend.Domain.Entity;

public class AppRequestEntity
{
    public String BuisnessName { get; set; }
    public String Industry { get; set; }
    public String Email { get; set; }
    public int AnnualSales { get; set; }
    public int AnnualPayroll { get; set; }
    public int EmpCount { get; set; }
    public String ZipCode { get; set; }
}
