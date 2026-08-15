import React, {createContext,useContext,useState,ReactNode,} from 'react';

interface CycleContextData {
    ultimaMenstruacao: string | null;
    setUltimaMenstruacao:(data: string) => void;
}

const CycleContext = createContext<CycleContextData | null>(null);

interface ProviderProps {
    children: ReactNode;
}

export function CycleProvider({
    children
}: ProviderProps) {
    

    const [ultimaMenstruacao,setUltimaMenstruacao] = useState<string | null>(null);

    return (

        <CycleContext.Provider
            value={{ultimaMenstruacao,setUltimaMenstruacao}}
        >
            {children}
        </CycleContext.Provider>
    );
}

export function useCycle() {

    const context =
        useContext(CycleContext);

    if (!context) {

        throw new Error(
            'useCycle deve ser usado dentro de CycleProvider'

        );
    }
    return context;
}