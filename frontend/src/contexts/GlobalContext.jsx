// importo le funzionalità necessarie per il context
import { createContext, useContext, useState } from "react";

// istanza del context
const GlobalContext = createContext();

// funzione di creazione del provider
function GlobalProvider({ children }) {
    // variabile di stato per la gestione del loader, inizialmente settata su false
    const [isLoading, setIsLoading] = useState(false);

    // Variabile che mi dice lo stato del Burger Menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                isLoading,
                setIsLoading,
                isMenuOpen,
                setIsMenuOpen,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}


// Definisco un hook per il context
function useGlobal() {
    const context = useContext(GlobalContext);
    return context;
}

// Esporto il nostro provider ed il nostro hook
export { GlobalProvider, useGlobal }