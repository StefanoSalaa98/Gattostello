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
    const color = " hsl(120, 40%, 45%)";

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

        const duration = 5000;

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
                    content="Gattostello è un'associazione che si prende cura dei gatti in difficoltà e li aiuta a trovare una famiglia. Scopri i gatti in adozione, sostienici o diventa volontario."
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
                        "image": "https://gattostello.it/img/logo-og.jpg",
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


                    <div className="immagine">
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
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.1674397101615!2d9.182261675472207!3d45.76783451312959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47869f8fc6d84c3d%3A0xbcb051b56d6a6290!2sGattostello%20ODV!5e0!3m2!1sit!2sit!4v1772190445417!5m2!1sit!2sit"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Mappa associazione"
                                />
                            </div>
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
                </div>
            </div>
        </>
    );
}