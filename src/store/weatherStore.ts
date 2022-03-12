import {action, makeAutoObservable, observable} from 'mobx';
import {Coords, WeatherObject} from "../assets/interfaces";

class WeatherStore {
    @observable useGeolocation: boolean;
    @observable weatherObject: WeatherObject;
    @observable cityCoords: Coords;

    constructor() {
        makeAutoObservable(this)
        this.useGeolocation = false;
        this.weatherObject = {
            name: "",
            temp: "",
            min_temp: "",
            max_temp: "",
        }
        this.cityCoords = {
            lat: "",
            lon: ""
        }

    }

    @action
    toggleAutoGeolocation() {
        this.useGeolocation = !this.useGeolocation;
    }

    @action
    setWeatherObject(weatherObject: any) {
        this.weatherObject = {
            name: weatherObject.name,
            temp: weatherObject.main.temp,
            min_temp: weatherObject.main.temp_min,
            max_temp: weatherObject.main.temp_max,
        }

    }

    @action
    setCityCoords(lat: string, lon: string) {
        this.cityCoords = {
            lat: lat,
            lon: lon,
        }
    }
}

const weatherStore = new WeatherStore();
export default weatherStore;
