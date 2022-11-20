import { FormEvent, useEffect, useState } from "react"
import { CardsCovidItem } from "./CardsCovidItem";

interface InputCEPProps {
    getEstado: (uf: string) => void;
}


export function InputCEP({ getEstado }: InputCEPProps) {
    const [searchCEP, setSearchCEP] = useState<string>('');
    const [estadoUF, setEstadoUF] = useState<string>('')

    const MaskCEP = {
        cep(value: string) {
            return value
                .replace(/\D/g, '')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{3})\d+?$/, '$1')
        },
        applyMask(event: FormEvent<HTMLInputElement>) {
            event.currentTarget.value = MaskCEP.cep(event.currentTarget.value)
            setSearchCEP(event.currentTarget.value)
        }
    }

    function chamaApiCep() {
        fetch(`https://viacep.com.br/ws/${searchCEP}/json/`)
            .then(response => response.json())
            .then(data => setEstadoUF(data.uf))
    }

    function handleSubmitSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        searchCEP.length > 8 && chamaApiCep();
        
    }


    return (
        <>
            <section className="w-[min(90vw,1000px)]">
                <form
                    action="submit"
                    className="flex flex-col p-3"
                    onSubmit={(value) => handleSubmitSearch(value)}
                >
                    <label className="font-bold mb-1">CEP da Cidade</label>
                    <div className="flex flex-row ">
                        <input
                            type="text"
                            className="w-1/3 min-w-[300px] bg-zinc-800 rounded-md text-zinc-100  focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"
                            onChange={event => MaskCEP.applyMask(event)}
                        />
                        <button
                            className="p-2 min-w-[80px] w-20 ml-2 bg-brand-500 rounded-md border-transparent flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500 font-bold"
                            type="submit"
                        >
                            Pesquisar
                        </button>
                    </div>
                </form>

            </section>
            {estadoUF && <CardsCovidItem uf={estadoUF} getCityName={getEstado} />}
        </>
    )
}