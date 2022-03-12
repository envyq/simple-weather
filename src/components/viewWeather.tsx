import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import {styled} from "@mui/system";
import weatherStore from "../store/weatherStore";
import {observer} from "mobx-react";

const MainBox = styled(Box)(({}) => ({
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    ".MuiTypography-h1": {
        fontSize: 150,
        fontStyle: "italic",
        fontFamily: "system-ui",
        fontWeight: "400"
    },
    ".MuiTypography-overline": {
        fontSize: 20,
    },
    ".MuiTypography-h2": {
        fontSize: 80,
        fontStyle: "italic",
    },
    ".MuiTypography-button": {
        fontSize: 15,
    },
}));
const FlexBox = styled(Box)(({}) => ({
    justifyContent: 'center',
    display: "flex"
}));

const ViewWeather = observer(() => {
    const x = weatherStore.weatherObject;
    return (
        <MainBox
            sx={{
                boxShadow: weatherStore.useGeolocation ?
                    "0 14px 28px #1976D2, 0 10px 10px rgba(0,0,0,0.22)" :
                    "0 14px 28px rgba(0,0,0,0.05), 0 10px 10px rgba(0,0,0,0.22)"
            }}>
            <Typography align="center" variant="h2" color="textSecondary">{x.name}</Typography>
            <FlexBox>
                <Typography align="center" variant="h1" color="#ff6ea8">{x.temp}</Typography>
                <Typography align="center" variant="button" color="#999999">avg</Typography>
            </FlexBox>
            <FlexBox>
                <Typography align="center" variant="overline" color="#ff562b">{x.max_temp}</Typography>
                <Typography align="center" variant="button" color="textSecondary">max</Typography>
                &nbsp;
                <Typography align="center" variant="overline" color="#635eff">{x.min_temp}</Typography>
                <Typography align="center" variant="button" color="textSecondary">мin</Typography>
            </FlexBox>
        </MainBox>
    )
})
export default ViewWeather;

