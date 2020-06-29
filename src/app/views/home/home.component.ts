import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  citySearch: string = '';

  weather: Weather;
  city: City;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
  }

  async searchCity(city: string) {
    await this.getCoordinates(city);
    if (this.city != undefined) {
      const cityFounded = this.city.features.find(d => d.text.toLowerCase() == city);
      this.weatherService.getWeather(cityFounded.center[0], cityFounded.center[1]).subscribe(
        (data) => {
          this.weather = data;
        },
        (error) => {
          new Error(error);
        }
      );
    }
  }

  async getCoordinates(city: string) {
    if (city != '') {
      this.city = await this.weatherService.getCoordinates(city);
    }
    return this.city;
  }

}
