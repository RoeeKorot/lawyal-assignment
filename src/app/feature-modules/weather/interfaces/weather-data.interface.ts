import { GenericUnit } from "../weather";

export interface WeatherData {
    Version: number;
    Key: string;
    Rank: number;
    LocalizedName: string;
    EnglishName: string;
    PrimaryPostalCode: string;
    Region: Region;
    Country: Country;
    AdministrativeArea: Area;
    TimeZone: TimeZone;
    GeoPosition: Position;
    IsAlias: boolean;
    SupplementalAdminAreas: any[];
    DataSets: string[]; 
}

 interface Region extends GeographicAreaName {}

 interface Country extends GeographicAreaName {}

 interface Area extends GeographicAreaName {
    Level: number;
    LocalizedType: string; 
    EnglishType: string;
    CountryID: string;
}


 interface GeographicAreaName {
    ID: string;
    LocalizedName: string;
    EnglishName: string; 
}
 interface TimeZone {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange: string;
}

 interface Position {
    Latitude: number; 
    Longitude: number;
    Elevation: Elevation; 
}

 interface Elevation {
    Metric: GenericUnit;
    Imperial: GenericUnit;
}

//  interface GenericUnit {
//     Value: number;
//     Unit: string;
//     UnitType: string;
// }
