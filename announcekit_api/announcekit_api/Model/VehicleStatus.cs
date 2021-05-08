using System;
using System.Collections.Generic;

namespace announcekit_api.Model
{
    public class Vehicles
    {
        public Int64 last_updated { get; set; }
        public int ttl { get; set; }
        public VehicleData data { get; set; }
    }

    public class VehicleData
    {
        public List<VehicleStatus> bikes { get; set; }
    }
    public class VehicleStatus
    {
        public string bike_id { get; set; }
        public decimal lat { get; set; }
        public decimal lon { get; set; }
        public bool is_reserved { get; set; }
        public bool is_disabled { get; set; }
        public string vehicle_type { get; set; }
    }
}
