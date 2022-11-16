import { useState } from "react";
import { HeaderContent } from "./Header/HeaderContent";
import { MainContent } from "./Main/MainContent";

export function IndexCorona() {
    const [city, setCity] = useState("BRAZIL");

    function getCity(cityName: string) {
        setCity(cityName)
    }




    return (
        <>
            <HeaderContent city={city} />
            <MainContent getCity={getCity} />
        </>
    )
}