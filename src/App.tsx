import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {styled} from "@mui/system";
import SelectGeo from "./components/selectGeo";
import ViewWeather from "./components/viewWeather";

const SelectBox = styled(Box)(({}) => ({
    padding: 15,
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    borderRadius: 10
}));


const App = () => {
    return (
        <Container maxWidth="sm">
            <SelectBox sx={{m: "50% 0 8% 0"}}>
                <SelectGeo/>
            </SelectBox>
            <ViewWeather/>
        </Container>
    );
}
export default App;