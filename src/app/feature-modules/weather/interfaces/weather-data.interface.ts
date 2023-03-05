import { GenericUnit } from "../weather";

export interface AreaLocation {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    Country: Country;
    AdministrativeArea: Area;
}

 interface Country extends GeographicAreaName {}

 interface Area extends GeographicAreaName {}
 
 interface GeographicAreaName {
    ID: string;
    LocalizedName: string;
}