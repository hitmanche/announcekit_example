using announcekit_api.Graphql.Types;
using announcekit_api.Model;
using GraphQL;
using GraphQL.Types;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;

namespace announcekit_api.Graphql.Query
{
    public class VehicleStatusQuery : ObjectGraphType<object>
    {
        public VehicleStatusQuery()
        {
            Name = "VehicleStatus_Query";

            FieldAsync<ListGraphType<VehicleStatusType>>("VehicleStatus",
            arguments: new QueryArguments
            {
             new QueryArgument<StringGraphType>{
                 Name="bike_id",
                 Description="Bike Id"
             }
            },
             resolve: async ctx =>
             {
                 List<VehicleStatus> items = new List<VehicleStatus>();

                 using var client = new HttpClient();

                 var result = await client.GetAsync("https://api.helbiz.com/admin/reporting/arlington/gbfs/free_bike_status.json");
                 var data = await result.Content.ReadAsStringAsync();
                 Vehicles dataJson = JsonConvert.DeserializeObject<Vehicles>(data);
                 items.AddRange(dataJson.data.bikes);
                 string bike_id = ctx.GetArgument<string>("Bike_id");
                 if (bike_id != null && bike_id != "")
                 {
                     return items.Where(x => x.bike_id == bike_id); 
                 }
                 else
                 {
                     return items;
                 }
             });
        }
    }
}
