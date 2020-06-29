import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  urlBMap: string = 'https://api.mapbox.com/geocoding/v5'
  
  token: string = 'pk.eyJ1IjoiZnNibGFuZG9uIiwiYSI6ImNrYno4MjZ3czBheG4yc3A5emMwaXdoc3cifQ.sXGUzALsdxz4tE0hfbIJBg';

  endPointMap: string = '/mapbox.places/';

  urlDarkSky: string = 'https://api.darksky.net/forecast/';

  keyDarkSky: string = '88030114c5e47763a011a75e7a10c633';

  constructor(
    private httpClient: HttpClient
  ) { }

  getWeather(lat: string, lon: string): Observable<Weather> {
    return this.httpClient.get<Weather>(
      this.urlDarkSky + this.keyDarkSky + '/' + lat + ',' + lon
    );
  }

  getCoordinates(city: string): Promise<City> {
    return this.httpClient.get<City>(
      this.urlBMap + this.endPointMap + city + '.json?access_token=' + this.token
    ).toPromise();
  }
}
