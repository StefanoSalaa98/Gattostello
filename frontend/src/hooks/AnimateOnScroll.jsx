import { useEffect, useState, useRef } from "react";
// useRef → crea un riferimento al DOM (serve per collegare l’Observer all’elemento HTML)

// Parametri:
// children → il contenuto che voglio animare può essere qualsiasi elemento JSX
// animation → il tipo di animazione CSS da applicare, di default: "fade-up"
// delay → ritardo in secondi prima che l’animazione parta, di default: 0)
export default function AnimateOnScroll({ children, animation = "fade-up", delay = 0 }) {
    // creo un riferimento a un elemento DOM (all'inizio è null perchè il DOM non è ancora stato creato )
    const ref = useRef(null);
    // variabile di stato booleana che controlla se l'elemento è entrato nel viewport
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // controllo di sicurezza: se il ref non punta ancora al DOM esco subito
        if (!ref.current) return;
        // Creo un oggetto IntersectionObserver, cioè uno strumento per sapere quando un elemento entra nella viewport
        const observer = new IntersectionObserver(
            // [entry] rappresenta l’elemento osservato
            ([entry]) => {
                if (entry.isIntersecting) {   // true quando l’elemento è visibile almeno al 20% (threshold 0.2)
                    setIsVisible(true);
                    observer.disconnect(); // attiva solo una volta
                }
            },
            {
                threshold: 0.2,  // parte quando il 20% dell’elemento entra nella viewport
                rootMargin: "0px 0px -100px 0px", // parte un po’ prima che entri completamente
            }
        );

        // imposto un timeout per dare tempo a ScrollToTop e al layout di stabilizzarsi
        const timer = setTimeout(() => {
            observer.observe(ref.current);  // osservo questo elemento quando entra nello schermo
        }, 500); // 500ms è sufficiente

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref} // collega il div all’Observer
            // L’elemento parte invisibile (scroll-base)
            // Quando entra in viewport → isVisible = true → aggiunge la classe CSS dell’animazione
            className={`scroll-base ${isVisible ? animation : ""}`}
            style={{ animationDelay: `${delay}s` }} // applica il ritardo dell'animazione
        >
            {children}
        </div>
    );
}