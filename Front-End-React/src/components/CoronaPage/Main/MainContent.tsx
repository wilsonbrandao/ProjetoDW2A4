import React, { FormEvent, useState } from "react";
import { CardsCovidItem } from "./CardsCovidItem";
import { InputCEP,  } from "./InputCEP";


interface MainContentProps {
    getCity: (parameter: string) => void;
}


export function MainContent({getCity}: MainContentProps ) {
    const [searchDataCovid, setSearchDataCovid] = useState<string>('SP')
    
    function getEstado(uf: string) {
        setSearchDataCovid(uf)   
    }
    
    return (
        <main className="flex flex-col items-center">
            <InputCEP getEstado={getEstado} />
            <CardsCovidItem uf={searchDataCovid} getCityName={getCity} />
        </main>
    )
}