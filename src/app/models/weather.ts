export interface Weather {
    latitude: string;
    longitude: string;
    timezone: string;
    currently: Object;
    hourly: Object;
    daily: Object;
}