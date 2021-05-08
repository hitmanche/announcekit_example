using announcekit_api.Graphql.Query;
using GraphQL.Types;
using GraphQL;

namespace announcekit_api.Graphql.Scheme
{
    public class VehicleStatusScheme : Schema
    {
        public VehicleStatusScheme(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<VehicleStatusQuery>();
        }
    }
}
