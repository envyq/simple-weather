import React, {useEffect} from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {observer} from "mobx-react";
import weatherStore from "../store/weatherStore";
import {cities, City} from "../assets/russian-cities";

const SelectGeo = observer(() => {

    const getWeather = (lat: string, lon: string) => {
        if (lat === "" || lon === "") return;
        const APIkey: string = ""; // get api key
        const url = (new URL("https://api.openweathermap.org/data/2.5/weather"));
        url.searchParams.set("appid", APIkey);
        url.searchParams.set("lang", "ru");
        url.searchParams.set("units", "metric");
        url.searchParams.set("lat", lat);
        url.searchParams.set("lon", lon);
        fetch(url.toString())
            .then((resp) => resp.json())
            .then((data) => {
                weatherStore.setWeatherObject(data);
            });
    }

    const getCityWeather = (value: City | null) => {
        const lat = value && value.coords.lat || "";
        const lon = value && value.coords.lon || "";
        getWeather(lat, lon);
        weatherStore.setCityCoords(lat, lon);
    }

    useEffect(() => {
        if (weatherStore.useGeolocation) {
            navigator.geolocation.getCurrentPosition((zxc) => {
                getWeather(zxc.coords.latitude.toString(), zxc.coords.longitude.toString());
            });
        } else {
            getWeather(weatherStore.cityCoords.lat, weatherStore.cityCoords.lon);
        }
    }, [weatherStore.useGeolocation]);

    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <FormControlLabel
                    sx={{m: 1}}
                    control={
                        <Switch checked={weatherStore.useGeolocation}
                                onChange={() => weatherStore.toggleAutoGeolocation()}/>
                    }
                    label={<Typography variant="button" color="textSecondary">use geolocation</Typography>}
                />

            </Grid>
            <Grid item xs={6}>
                <Autocomplete
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={`${option.subject}_${option.district}_${option.name}`}>
                                {option.name}
                            </li>
                        );
                    }}
                    disablePortal
                    disabled={weatherStore.useGeolocation}
                    id="combo-box-demo"
                    options={cities}
                    getOptionLabel={cities => cities.name}
                    renderInput={(params) => <TextField {...params} label="City"/>}
                    onChange={((event, value) => getCityWeather(value))}
                />
            </Grid>
        </Grid>
    );
})
export default SelectGeo;
