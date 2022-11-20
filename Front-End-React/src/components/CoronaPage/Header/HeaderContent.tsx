interface HeaderContentProps{
    city: string;
}

export function HeaderContent({ city }: HeaderContentProps) {
   
    return (
        <header className="bg-zinc-900 flex flex-col items-center justify-center h-28">
            <h1 className="text-3xl font-bold ">
                    CORONAVÍRUS - {city.toLocaleUpperCase()}
            </h1>
        </header>
    )
}