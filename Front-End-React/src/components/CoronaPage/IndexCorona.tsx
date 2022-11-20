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
            <section className="flex flex-col items-center justify-center h-28">
                    <p className="text-1xl font-bold ">
                        Feito por Wilson Brandão
                    </p>
            </section>
        </>
    )
}