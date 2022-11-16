import { useEffect, useState } from "react";


interface covidDataRepository {
    uf: any;
    state: any;
    cases: any;
    suspects: any;
    deaths: any;
}




interface CardsCovidItemProps {
    uf: string;
    getCityName:  (parameter: string) => void;
}



export function CardsCovidItem({ uf, getCityName}: CardsCovidItemProps) {
    const [estadoUF, setEstadoUF] = useState<string>('SP')
    

    const [covidData, setCovidData] = useState<covidDataRepository[]>([{
        uf: "SP",
        state: "São Paulo",
        cases: '34.908.198',
        suspects: '34.908.198',
        deaths: '34.908.198'
    }])

   
    useEffect(() => {
        setEstadoUF(uf)
        fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${estadoUF}`).then(response => response.json()).then(data => {
            setCovidData([data])
            getCityName(data.state)
            console.log(covidData, data.state)
        })
    }, [estadoUF, uf])

    return (
        <>
            <section className=" w-[min(90vw,1000px)] flex flex-row p-3 mt-5 " >
                <div
                    className=" bg-zinc-900 rounded-lg py-8 flex-1 flex-col items-center justify-around gap-2 text-center mr-2 h-52"
                >
                    <h3>
                        <span className="font-bold mb-1 text-center text-xl">Casos Confirmados</span>
                    </h3>
                    <p className="text-3xl mt-6 font-bold h-full">{covidData[0].cases}</p>
                </div>

                <div
                    className=" bg-zinc-900 rounded-lg py-8 flex-1 flex-col items-center justify-around gap-2 text-center mr-2"
                >
                    <h3>
                        <span className="font-bold mb-1 text-center text-xl">Total Suspeitos</span>
                    </h3>
                    <p className="text-3xl mt-6 font-bold h-full">{covidData[0].suspects}</p>
                </div>

                <div
                    className=" bg-zinc-900 rounded-lg py-8 flex-1 flex-col items-center justify-around gap-2 text-center mr-2"
                >
                    <h3>
                        <span className="font-bold mb-1 text-center text-xl">Total Óbitos</span>
                    </h3>
                    <p className="text-3xl mt-6 font-bold h-full">{covidData[0].deaths}</p>
                </div>
            </section>
        </>
    )
}