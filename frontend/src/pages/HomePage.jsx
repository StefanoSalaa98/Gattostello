import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import OndaTop from "../components/OndaTop"
import OndaBottom from "../components/OndaBottom"
import "../css/HomePage.css"

export default function HomePage() {

    // recupero l'indirizzo protetto che espone la API
    const API_URL = import.meta.env.VITE_API_URL;

    const color = " rgb(95 201 95)";

    // variabile di stato del totale dei gatti adottati
    const [totale, setTotale] = useState([]);

    // chiamata axios per ricevere il totale dei gatti adottati
    const fecthTotale = () => {
        axios.get(`${API_URL}/total-ex`)
            .then(({ data }) => {
                setTotale(data.data)
            })
            .catch(error => { console.log(error) })
        console.log(totale);
    }

    // faccio partire la chiamata solo al primo montaggio del componente
    useEffect(fecthTotale, []);

    return (
        <>
            <div className="home-container">
                <h1 className=" animate__animated animate__backInLeft animate__slow">BENVENUTI SUL SITO DEL GATTOSTELLO</h1>
                <h2 className=" animate__animated animate__backInRight animate__slow">Dove ogni gatto trova una zampa tesa e un posto sicuro</h2>
                <div className="totale animate__animated animate__backInUp animate__slow">
                    <span>Abbiamo aiutato: </span>
                    <span className="numero">{totale}</span>
                    <span> mici a trovare casa</span>
                </div>
            </div>

            <OndaBottom colore={color} sfondo="bianco" />
            <OndaTop colore={color} sfondo="scuro" />

            <div className="descrizione-container">
                <div className="descrizione">
                    <div className="testo">
                        <h3>Cosa facciamo e perché</h3>
                        <p>Siamo presenti sul territorio per tutelare i gatti in situazione di bisogno, ovunque si trovino: in struttura, in colonia o in stallo, offriamo loro cibo, protezione e accoglienza. Ci battiamo ogni giorno per la loro tutela e per educare a un'adozione consapevole, affinchè gatto e umano diventino buoni compagni di vita.</p>
                        <Link className="bottone" to="/chi-siamo">
                            Scopri di più
                        </Link>
                    </div>
                    <div className="immagine">
                        <img src="img/giornale.jpg" alt="giornale" />
                    </div>
                </div>
            </div>

            <OndaBottom colore={color} sfondo="scuro" />
            <OndaTop colore={color} sfondo="bianco" />

            <div className="aiutaci-container">
                <div className="aiutaci">
                    <div className="immagine">
                        <img src="img/abbraccio.jpg" alt="abbraccio" />
                    </div>
                    <div className="testo">
                        <h3>Come sostenerci</h3>
                        <p>Gattostello è in prima fila nella protezione e cura dei gatti meno fortunati,
                            è solo grazie al verbo "donare" di tante persone sensibili e generose e all'impegno dei volontari che continuiamo ad andare avanti!
                            La cura dei mici sono possibili solo grazie al vostro contributo. Ogni aiuto è veramente prezioso, grazie di cuore. Ci sono molti modi per sostenerci, vieni a scoprirli...
                        </p>
                        <Link className="bottone" to="/sostienici">
                            SOSTIENICI
                        </Link>
                    </div>
                </div>
            </div>

            <OndaBottom colore={color} sfondo="bianco" />
            <OndaTop colore={color} sfondo="scuro" />

            <div className="descrizione-container">
                <div className="descrizione">
                    <div className="testo">
                        <h3>Unisciti a noi</h3>
                        <p>Il cuore della nostra associazione pulsa grazie al lavoro di soli volontari: per questo siamo sempre felici di accogliere nuove persone pronte a donare un po' del proprio tempo ai nostri ospiti. L'impegno quotidiano è concreto, preparare la pappa e curare l'igiene dei loro spazi, ma la vera magia sta nel mezzo: tra una pulizia e l'altra, c'è sempre spazio per lunghe sessioni di coccole, giochi spensierati e quegli sguardi profondi che valgono più di mille parole.</p>
                        <Link className="bottone" to="/unisciti">
                            Scopri di più
                        </Link>
                    </div>
                    <div className="immagine sotto">
                        <img className="img-volontari" src="img/volontari.jpg" alt="volontari" />
                    </div>

                </div>
            </div>

            <OndaBottom colore={color} sfondo="scuro" />
            <OndaTop colore={color} sfondo="bianco" />

            <div className="aiutaci-container">
                <div className="aiutaci">
                    <div className="immagine">
                        <div className="mappa">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.1674397101615!2d9.182261675472207!3d45.76783451312959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47869f8fc6d84c3d%3A0xbcb051b56d6a6290!2sGattostello%20ODV!5e0!3m2!1sit!2sit!4v1772190445417!5m2!1sit!2sit"
                                allowfullscreen=""
                                referrerpolicy="no-referrer-when-downgrade"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mappa associazione"
                            />
                        </div>
                    </div>
                    <div className="testo">
                        <h3>Vieni a trovarci</h3>
                        <p>Puoi venire a conoscere noi e nostri gatti</p>
                        <p><strong>Tutti i giorni dalle 17:30 alle 19:00</strong></p>
                        <p><strong>ad Alzate Brianza, Via A. Diaz 25</strong></p>
                    </div>
                </div>
            </div>
        </>
    )
}