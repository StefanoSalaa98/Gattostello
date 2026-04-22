import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalContext";

import OndaTop from "../components/OndaTop";
import OndaBottom from "../components/OndaBottom";
import "../css/HomePage.css";
import AnimateOnScroll from "../hooks/AnimateOnScroll";

export default function HomePage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const { isLoading, setIsLoading } = useGlobal();
    const color = " hsl(120, 40%, 45%)";
    const [totale, setTotale] = useState([]);

    const fecthTotale = () => {
        console.log("API URL:", API_URL);
        setIsLoading(true);
        axios
            .get(`${API_URL}/total-ex`)
            .then(({ data }) => setTotale(data.data))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    };

    useEffect(fecthTotale, []);

    return (
        <>
            <div className="home-container">
                <AnimateOnScroll>
                    <h1>BENVENUTI SUL SITO DEL GATTOSTELLO</h1>
                    <h2>Dove ogni gatto trova una zampa tesa e un posto sicuro</h2>
                </AnimateOnScroll>

                {!isLoading && (

                    <AnimateOnScroll delay={0.3}>
                        <div className="totale">
                            <span className="numero">{totale}</span>
                            <span> mici hanno trovato </span>
                            <span> casa grazie a noi </span>
                        </div>
                    </AnimateOnScroll>

                )}
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