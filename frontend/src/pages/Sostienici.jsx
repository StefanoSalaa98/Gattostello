import { useState } from "react";
import { useEffect } from "react";
import Tessera from "../components/Tessera";
import Seleziona from "../components/Seleziona";
import CodiceFiscale from "../components/CodiceFiscale";
import Iban from "../components/Iban";
import WhatsAppButton from "../components/WhatsAppButton";
import OndaTop from "../components/OndaTop";
import OndaBottom from "../components/OndaBottom";
import "../css/Sostienici.css";

export default function Sostienici() {

    const [scelta, setScelta] = useState(() => {
        return sessionStorage.getItem("scelta") || "";
    });

    useEffect(() => {
        sessionStorage.setItem("scelta", scelta);
    }, [scelta]);

    const color = " rgb(95 201 95)";

    return (
        <>
            <div className="sostienici-container">
                <div className="sostienici">
                    <div className="testo">
                        <h2>Come aiutare i gatti del Gattostello</h2>
                        <p>Se sei arrivato in questa pagina, probabilmente è perché desideri aiutare i mici del Gattostello! La nostra associazione non gode di sovvenzioni comunali o statali ma sopravvive grazie all'autotassazione dei volontari e alle donazioni di chi, generosamente, decide di sostenere la nostra missione. Ogni piccolo aiuto rappresenta un grande passo avanti per migliorare la vita dei nostri amici a 4 zampe. Ricorda: le donazioni possono essere dedotte dalla dichiarazione dei redditi. Ti consigliamo di conservare le ricevute dei versamenti come prova delle donazioni effettuate. Grazie per il tuo contributo!</p>
                    </div>
                    <div className="immagine">
                        <img src="img/filippo.jpg" alt="filippo" />
                    </div>
                </div>
            </div>

            <OndaBottom colore={color} sfondo="bianco" />
            <OndaTop colore={color} sfondo="scuro" />

            <div className="tessera-container">
                <div className="tessera">
                    <div className="immagine">
                        <img src="img/tessera.jpg" alt="tessera" />
                    </div>
                    <div className="testo">
                        <div>
                            <h2>Diventa Socio</h2>
                            <h5>Decidi che impronta lasciare</h5>
                            <div className="radio-container">
                                <label>
                                    <input
                                        type="radio"
                                        name="livello"
                                        value="giovanile"
                                        checked={scelta === "giovanile"}
                                        onChange={(e) => setScelta(e.target.value)}
                                    />
                                    Giovanile 5 &euro;
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="livello"
                                        value="silver"
                                        checked={scelta === "silver"}
                                        onChange={(e) => setScelta(e.target.value)}
                                    />
                                    Silver 25 &euro;
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="livello"
                                        value="gold"
                                        checked={scelta === "gold"}
                                        onChange={(e) => setScelta(e.target.value)}
                                    />
                                    Gold 50 &euro;
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="livello"
                                        value="platinum"
                                        checked={scelta === "platinum"}
                                        onChange={(e) => setScelta(e.target.value)}
                                    />
                                    Platinum 100 &euro;
                                </label>
                            </div>
                        </div>

                        {scelta ? <Tessera livello={scelta} /> : <Seleziona />}
                    </div>
                </div>
            </div>

            <OndaBottom colore={color} sfondo="scuro" />
            <OndaTop colore={color} sfondo="bianco" />

            <div className="distanza-container">
                <div className="distanza">
                    <div className="testo">
                        <h2>Adotta a distanza</h2>
                        <p>Puoi offrire amore e cure a un micio bisognoso del Gattostello senza portarlo a casa. Alcuni mici sono adottabili a distanza in quanto per problemi comportamentali o di salute è più difficile trovar loro una casa. Con un contributo di <strong> 120 euro </strong> sostieni le sue esigenze quotidiane per un anno intero, ricevi aggiornamenti e vieni a trovarlo nella nostra struttura. Fai una differenza significativa nella sua vita. Grazie al tuo sostegno potrai garantirgli tutte le cure e le attenzioni necessarie.</p>
                        <p>Scrivici su whatsapp per sapere chi di loro è in cerca di una mamma o un papà a distanza:</p>
                        <div className="whatsapp"> <WhatsAppButton />339 806 7656 </div>

                    </div>
                    <div className="immagine">
                        <img src="img/adozioni.jpg" alt="adozioni" />
                    </div>
                </div>
            </div>

            <OndaBottom colore={color} sfondo="bianco" />
            <OndaTop colore={color} sfondo="scuro" />

            <div className="cinque-x-mille-container">
                <div className="cinque-x-mille">
                    <div className="immagine">
                        <img src="img/5x1000.jpg" alt="5x1000" />
                    </div>
                    <div className="testo">
                        <h2>Dona il tuo 5X1000 a Gattostello</h2>
                        <p>Il tuo aiuto in questo momento è fondamentale per la cura dei tanti mici che ospitiamo e per portare avanti la nostra missione. Con una semplice firma ci aiuti a garantire cibo, cure e protezione ai mici del Gattostello. Grazie di cuore!</p>
                        <h3>Donare il 5X1000 è semplice</h3>
                        <span>Nella prossima dichiarazione dei redditi:</span> <br />
                        <ul>
                            <li>
                                Vai nell'Apposito Riquadro, dedicato al sostegno degli enti del Terzo Settore iscritti nel RUNTS (Registro Nazionale Terzo Settore) di cui all'art. 46, comma 1 del D.Lgs. n.117/2017
                            </li>
                            <li>
                                Riporta il codice fiscale dell' “Associazione Gattostello”: <br />
                                <CodiceFiscale />
                            </li>
                            <li>
                                Firma il Riquadro, così da destinare l'importo interamente alla nostra associazione
                            </li>
                        </ul>
                    </div>
                </div>
            </div >

            <OndaBottom colore={color} sfondo="scuro" />
            <OndaTop colore={color} sfondo="bianco" />

            <div className="esselunga-container">
                <div className="esselunga">
                    <div className="testo">
                        <h2>Dona i tuoi punti</h2>
                        <p>
                            Potete continuate a fare la differenza sostenendoci anche con i punti della carta Fidaty Esselunga. Se non vi servono, al di là delle scadenze potete sempre donarli. Verranno trasformati in tante pappe per i mici. Grazie mille per il vostro aiuto.
                        </p>
                    </div>
                    <div className="immagine">
                        <img src="img/fidaty.jpg" alt="fidaty" />
                    </div>
                </div>
            </div>

            <OndaBottom colore={color} sfondo="bianco" />
            <OndaTop colore={color} sfondo="scuro" />

            <div className="dona-container">
                <div className="dona">
                    <div className="immagine">
                        <img src="img/iban.jpg" alt="iban" />
                    </div>
                    <div className="testo">
                        <h2>Sostienici come e quando vuoi</h2>
                        <p>Ogni aiuto è fondamentale, piccolo o grande che sia, a seconda delle vostre disponibilità, si può aiutare i nostri mici in tanti modi:</p>
                        <ul>
                            <li>
                                Potete effettuare una donazione libera al nostro iban:
                                <Iban />
                            </li>
                            <li>
                                Potete portare cibo, giochi, articoli per felini al nostro indirizzo: <br />
                                Via A. Diaz 25, Alzate Brianza (CO)
                            </li>
                            <li>
                                <span className="diventa">Potete donare parte del vostro tempo libero diventando volontari</span>
                                <a href="/unisciti">Scopri di più</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
        </>
    )
}