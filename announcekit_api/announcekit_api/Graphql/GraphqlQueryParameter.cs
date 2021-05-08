using Newtonsoft.Json.Linq;

namespace announcekit_api.Graphql
{
    public class GraphqlQueryParameter
    {
        public string OperationName { get; set; }
        public string NamedQuery { get; set; }
        public string Query { get; set; }
        public JObject Variables { get; set; }

    }
}
