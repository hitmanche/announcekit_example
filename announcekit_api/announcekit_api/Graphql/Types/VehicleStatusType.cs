using announcekit_api.Model;
using GraphQL.Types;

namespace announcekit_api.Graphql.Types
{
    public class VehicleStatusType : ObjectGraphType<VehicleStatus>
    {
        public VehicleStatusType()
        {
            Name = "VehicleStatus";
            Field(p => p.bike_id);
            Field(p => p.lat);
            Field(p => p.lon);
            Field(p=>p.is_reserved);
            Field(p => p.is_disabled);
            Field(p => p.vehicle_type);
        }
    }
}
