import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {

    // recupero il percorso corrente
    const { pathname } = useLocation();

    // lo richiamo ogni volta che cambio percorso (cioè rotta)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

