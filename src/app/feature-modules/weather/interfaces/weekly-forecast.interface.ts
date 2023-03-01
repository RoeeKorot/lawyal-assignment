import { GenericUnit } from "../weather";

export interface Forecast {
    HeadLine: Headline;
    DailyForecasts: DailyForecast[];
}

interface Headline {
    EffectiveDate: string;
    EffectiveEpochDate: number;  
    Severity: number;
    Text: string;
    Category: string;
    EndDate: null | Date;
    EndEpochDate: null | Date;
    MobileLink: string;
    Link: string;
}
interface DailyForecast {
    Date: Date;
    EpochDate: number;
    Temperature: Temperature;
    Day: CloudyCondition;
    Night: CloudyCondition;
    Sources: string[];
    MobileLink: string;
    Link: string;   

}

interface Temperature {
    Minimum: GenericUnit;
    Maximum: GenericUnit;
}

interface CloudyCondition {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
}
