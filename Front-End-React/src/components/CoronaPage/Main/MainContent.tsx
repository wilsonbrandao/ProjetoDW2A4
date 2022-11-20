import React, { FormEvent, useState } from "react";
import { CardsCovidItem } from "./CardsCovidItem";
import { InputCEP,  } from "./InputCEP";


interface MainContentProps {
    getCity: (parameter: string) => void;
}


export function MainContent({getCity}: MainContentProps ) {
   
    function getEstado(uf: string) {
        getCity(uf)
    }
    
    return (
        <main className="flex flex-col items-center">
            <InputCEP getEstado={getEstado} />
        </main>
    )
}