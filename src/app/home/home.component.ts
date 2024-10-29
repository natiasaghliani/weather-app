import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe, NgStyle, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, DatePipe, DecimalPipe, UpperCasePipe, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  weatherData: any;
  city: string = 'London';
  backgroundImage: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(
      data => {
        this.weatherData = data;
        
        const localTime = data.dt + data.timezone;
        this.weatherData.localDate = new Date(localTime * 1000);
        
        this.setBackgroundImage(data.weather[0].description);
        this.city = '';
      },
      error => {
        console.error('Error fetching weather data', error);
      }
    );
  }

  setBackgroundImage(description: string) {
    if (description.includes('snow')) {
      this.backgroundImage = 'url(../../assets/images/snow.png)';
    } else if (description.includes('rain')) {
      this.backgroundImage = 'url(../../assets/images/rainy.jpg)';
    } else if (description.includes('cloud')) {
      this.backgroundImage = 'url(../../assets/images/cloudy.jpg)';
    } else if (description.includes('clear')) {
      this.backgroundImage = 'url(../../assets/images/sunny.jpg)';
    } else if (description.includes('wind')) {
      this.backgroundImage = 'url(../../assets/images/windy.jpg)';
    } else {
      this.backgroundImage = 'url(../../assets/images/default.png)';
    }
  }
}
