import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalContext";

import OndaTop from "../components/OndaTop";
import OndaBottom from "../components/OndaBottom";
import "../css/HomePage.css";
import AnimateOnScroll from "../hooks/AnimateOnScroll";
import Repelling from "../hooks/Repelling";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const { isLoading, setIsLoading, isMenuOpen } = useGlobal();
    // const color = " hsl(120, 40%, 45%)";
    const color = " #779767";

    // Stato per sapere se il contatore è visibile
    const [isVisible, setIsVisible] = useState(false);
    // Riferimento all'elemento DOM
    const counterRef = useRef(null);

    // Variabile di stato che mostra il totale degli adottati
    // const [totale, setTotale] = useState(0);
    const totale = 400;

    // Variabile di stato che gestisce il contatore
    const [count, setCount] = useState(0);

    // Intersection Observer per attivare isVisible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Smetto di osservare una volta attivato
                }
            },
            { threshold: 0.1 } // Parte quando il 10% del componente è visibile
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const animatedCounter = () => {

        // Se non è ancora visibile o ha finito, esco subito
        if (!isVisible || totale <= 0 || count >= totale) return;

        const duration = 3000;

        // Calcolo il tempo tra un incremento e l'altro per finire entro 'duration'
        // Più è alto il numero, più veloce deve essere il timer
        const delay = duration / totale;

        const timer = setTimeout(() => {
            setCount(prevCount => prevCount + 1);
        }, delay);

        // Pulizia del timer
        return () => clearTimeout(timer);
    }

    // const fecthTotale = () => {
    //     setIsLoading(true);
    //     axios
    //         .get(`${API_URL}/total-ex`)
    //         // .then(({ data }) => setTotale(data.data))
    //         .then(({ data }) => setTotale(400))
    //         .catch((error) => console.log(error))
    //         .finally(() => setIsLoading(false));
    // };

    // useEffect(fecthTotale, []);

    useEffect(animatedCounter, [count, totale, isVisible]);

    return (
        <>
            <Helmet>
                <title>Gattostello | Gattile e adozione gatti in Lombardia</title>

                <meta
                    name="description"
                    content="Il Gattostello è un rifugio di Alzate Brianza che recupera, cura e trova una famiglia ai gatti in cerca di adozione. Scopri come aiutarci."
                />

                <link
                    rel="canonical"
                    href="https://gattostello.it/"
                />

                <meta
                    property="og:title"
                    content="Gattostello | Gattile e adozione gatti"
                />

                <meta
                    property="og:description"
                    content="Scopri i gatti in cerca di una famiglia, sostieni il Gattostello o unisciti ai nostri volontari."
                />

                <meta
                    property="og:type"
                    content="website"
                />

                <meta
                    property="og:url"
                    content="https://gattostello.it/"
                />

                <meta
                    property="og:image"
                    content="https://gattostello.it/img/og-image.jpg"
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AnimalShelter",
                        "name": "Gattostello",
                        "url": "https://gattostello.it",
                        "image": "https://gattostello.it/img/icona.ico",
                        "logo": "https://gattostello.it/img/icona.ico",
                        "telephone": "+39 3398067656",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Via A. Diaz 25",
                            "addressLocality": "Alzate Brianza",
                            "addressRegion": "CO",
                            "postalCode": "22040",
                            "addressCountry": "IT"
                        }
                    })}
                </script>
            </Helmet>

            <section className="hero-container">
                {/* Contenitore dell'immagine con overflow hidden */}
                <div className="hero-image-wrapper">
                    <picture>
                        {/* Se lo schermo è largo al massimo 768px, uso l'immagine verticale */}
                        <source media="(max-width: 768px)" srcSet="img/heroimage_mobile.jpg" />

                        {/* Per tutti gli altri casi (Desktop), uso quella orizzontale */}
                        <img
                            src="img/heroimage_desktop.jpg"
                            alt="Immagine Hero Animata"
                            className="hero-image-animated"
                        />
                    </picture>
                </div>

                {/* Contenuto sovrapposto (opzionale) */}

                <div className="hero-content">
                    <Repelling strength={0.2} isDisabled={isMenuOpen}>
                        <h1>BENVENUTI SUL SITO DEL GATTOSTELLO</h1>
                        <h2>Dove ogni gatto trova una zampa tesa e un posto sicuro</h2>
                    </Repelling>
                </div>

            </section>

            <div className="home-container">

                <AnimateOnScroll delay={0.3}>
                    <div className="totale" ref={counterRef}>
                        <span> Più di </span>
                        <span className="numero">{count}</span>
                        <span> mici hanno trovato </span>
                        <span> casa grazie a noi </span>
                    </div>
                </AnimateOnScroll>

            </div>

            <OndaBottom colore={color} sfondo="bianco" />
            <OndaTop colore={color} sfondo="scuro" />

            <div className="descrizione-container">
                <div className="descrizione">
                    <div className="testo">
                        <AnimateOnScroll>
                            <h3>Cosa facciamo e perché</h3>
                            <p>
                                Siamo presenti sul territorio per tutelare i gatti in situazione di bisogno...
                            </p>
                            <Link className="bottone" to="/chi-siamo">
                                Scopri di più
                            </Link>
                        </AnimateOnScroll>
                    </div>


                    <div className="immagine giornale">
                        <AnimateOnScroll animation="slide-right" delay={0.5}>
                            <img src="img/giornale.jpg" alt="giornale" loading="lazy" />
                        </AnimateOnScroll>
                    </div>

                </div>
            </div>

            <OndaBottom colore={color} sfondo="scuro" />
            <OndaTop colore={color} sfondo="bianco" />

            <div className="aiutaci-container">
                <div className="aiutaci">

                    <div className="immagine">
                        <AnimateOnScroll animation="slide-left">
                            <img src="img/abbraccio.jpg" alt="abbraccio" loading="lazy" />
                        </AnimateOnScroll>
                    </div>

                    <div className="testo">
                        <AnimateOnScroll delay={0.5}>
                            <h3>Come sostenerci</h3>
                            <p>
                                Gattostello è in prima fila nella protezione e cura dei gatti meno fortunati...
                            </p>
                            <Link className="bottone" to="/sostienici">
                                SOSTIENICI
                            </Link>
                        </AnimateOnScroll>
                    </div>

                </div>
            </div >

            <OndaBottom colore={color} sfondo="bianco" />
            <OndaTop colore={color} sfondo="scuro" />

            <div className="descrizione-container">
                <div className="descrizione">

                    <div className="testo">
                        <AnimateOnScroll>
                            <h3>Unisciti a noi</h3>
                            <p>
                                Il cuore della nostra associazione pulsa grazie al lavoro di soli volontari...
                            </p>
                            <Link className="bottone" to="/unisciti">
                                Scopri di più
                            </Link>
                        </AnimateOnScroll>
                    </div>

                    <div className="immagine sotto">
                        <AnimateOnScroll animation="slide-right" delay={0.5}>
                            <img className="img-volontari" src="img/volontari.jpg" alt="volontari" loading="lazy" />
                        </AnimateOnScroll>
                    </div>
                </div>
            </div >

            <OndaBottom colore={color} sfondo="scuro" />
            <OndaTop colore={color} sfondo="bianco" />

            <div className="aiutaci-container">
                <div className="aiutaci">
                    <div className="immagine">
                        <AnimateOnScroll animation="slide-left">
                            <div className="mappa">

                                <iframe
                                    src="https://www.google.com/maps?q=45.76782790943917,9.184892010562939&output=embed"
                                    allowFullScreen
                                    loading="lazy"
                                    title="Posizione Gattostello ODV"
                                />

                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=45.76782790943917,9.184892010562939"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mappa-link"
                                    aria-label="Apri la posizione di Gattostello ODV su Google Maps"
                                >
                                </a>

                            </div>

                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=45.76782790943917,9.184892010562939"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="come-arrivare"
                            >
                                📍 Come arrivare al Gattostello
                            </a>
                        </AnimateOnScroll>
                    </div>


                    <div className="testo">
                        <AnimateOnScroll delay={0.5}>
                            <h3>Vieni a trovarci</h3>
                            <p>Puoi venire a conoscere noi e nostri gatti</p>
                            <p><strong>Tutti i giorni dalle 17:30 alle 19:00</strong></p>
                            <p><strong>ad Alzate Brianza, Via A. Diaz 25</strong></p>
                        </AnimateOnScroll>
                    </div>
                </div >
            </div >
        </>
    );
}