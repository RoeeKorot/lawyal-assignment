export interface WeatherData {
    version: number;
    key: string;
    rank: number;
    localizedName: string;
    englishName: string;
    primaryPostalCode: string;
    region: Region;
    country: Country;
    administrativeArea: Area;
    timeZone: TimeZone;
    geoPosition: Position;
    isAlias: boolean;
    "supplementalAdminAreas": any[];
    dataSets: string[]; 
}

 interface Region extends GeographicAreaName {}

 interface Country extends GeographicAreaName {}

 interface Area extends GeographicAreaName {
    level: number;
    localizedType: string; 
    englishType: string;
    countryID: string;
}


 interface GeographicAreaName {
    id: string;
    LocalizedName: string;
    EnglishName: string; 
}
 interface TimeZone {
    code: string;
    name: string;
    gmtOffset: number;
    isDaylightSaving: boolean;
    nextOffsetChange: string;
}

 interface Position {
    latitude: number; 
    longitude: number;
    elevation: Elevation; 
}

 interface Elevation {
    metric: GenericUnit;
    imperial: GenericUnit;
}

 interface GenericUnit {
    value: number;
    unit: string;
    unitType: string;
}
