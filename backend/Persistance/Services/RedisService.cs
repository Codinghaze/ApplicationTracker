using backend.Domain.Entity;
using StackExchange.Redis;
using Newtonsoft.Json;

namespace backend.Persistance.Services;

public class RedisService
{
    private IDatabase db;
    public RedisService(ConnectionMultiplexer redis)
    {
        db = redis.GetDatabase();
    }
    public List<Application> GetApplications()
    {
        var apps = new List<Application>();
        var totalApps = db.ListLength("AppsList");
        var appsList = db.ListRange("AppsList", 0, totalApps);
        for (var i = 0; i < appsList.Length; i++)
        {
            Application app = JsonConvert.DeserializeObject<Application>(appsList[i]);
            app.guid = new Guid();
            apps.Add(app);
        }

        return apps;
    }

    public Boolean deleteApplicationFromList(Guid extGuid)
    {
        try
        {
            var totalApps = db.ListLength("AppsList");
            var appsList = db.ListRange("AppsList", 0, totalApps);
            for (var i = 0; i < appsList.Length; i++)
            {
                Application app = JsonConvert.DeserializeObject<Application>(appsList[i]);
                if (app.extGuid == extGuid)
                {
                    db.ListRemove("AppsList", appsList[i]);
                }
            }
        }
        catch (System.Exception)
        {

            throw;
        }
        return false;
    }
    public Boolean addOrUpdateApplication(Application app)
    {

        try
        {
            db.ListLeftPush("AppsList", JsonConvert.SerializeObject(app));
        }
        catch (System.Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }


        return false;
    }
}
