import { gql } from "@apollo/client";

export const GET_VEHICLE_STATUS = gql`
  query VehicleStatus($bike_id: String!) {
    VehicleStatus(Bike_id: $bike_id) {
        Bike_id
        Lat
        Lon
        Is_reserved
        Is_disabled
        Vehicle_type
    }
  }
`;