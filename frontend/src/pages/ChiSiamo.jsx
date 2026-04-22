import OndaTop from "../components/OndaTop"
import OndaBottom from "../components/OndaBottom"
import { Link } from "react-router-dom";
import "../css/Chisiamo.css";
import AnimateOnScroll from "../hooks/AnimateOnScroll";

export default function ChiSiamo() {

    const color = " hsl(120, 40%, 45%)";

    return (
        <>
            <div className="chi-siamo-container">
                <div className="chi-siamo">
                    <div className="testo">
                        <AnimateOnScroll>
                            <h2>Gattostello: una storia di fusa, impegno e amore</h2>
                            <p>La nostra avventura nasce nel 2022 grazie alla determinazione di un gruppo di appassionati volontari. Gattostello è il frutto di un sogno che il nostro gruppo di inguaribili gattari ha coltivato e protetto a lungo: grazie alle iniziative, alla dedizione e tanta perseveranza abbiamo creato un rifugio sicuro ai gatti abbandonati o in stato di necessità. Attraverso un impegno costante e una inesauribile passione, quella che era solo una visione ideale è diventata oggi una realtà concreta al servizio dei nostri amici a 4 zampe.</p>
                        </AnimateOnScroll>
                    </div>
                    <div className="immagine">
                        <AnimateOnScroll animation="slide-right" delay={0.5}>
                            <img src="img/bianconero2.png" alt="coppia" loading="lazy" />
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>
            <div className="chi-siamo2-container">
                <div className="chi-siamo2">
                    <div className="immagine">
                        <AnimateOnScroll animation="slide-left">
                            <img src="img/romeo.png" alt="romeo" loading="lazy" />
                        </AnimateOnScroll>
                    </div>
                    <div className="testo">
                        <AnimateOnScroll delay={0.5}>
                            <p>
                                Accogliamo e ci prendiamo cura di mici che arrivano con le storie più varie: da cuccioli nei primi giorni dalla nascita a gatti adulti che dopo un cammino insieme hanno perso il loro umano e hanno bisogno di una nuova casa, da randangi che dopo un'esistenza passata in strada cercano un futuro migliore a mici che hanno attraversato le situazioni più disparate e complicate.
                            </p>
                            <p>
                                Quando possibile, li accompagniamo in un percorso di adozione verso una nuova vita. Per i piccoli ospiti più fragili o con difficoltà, fisiche o comportamentali, che rendono difficile l'adozione, il nostro rifugio si trasforma in una famiglia a tutti gli effetti: un luogo dove l'amore dei volontari e il sostegno della comunità garantiscono loro una quotidianità serena e protetta.
                            </p>
                            <p>
                                Gattostello opera in totale autonomia dal sostegno pubblico, affidandosi alla generosità di chi sostiene la nostra causa. Più che un rifugio, siamo uno spazio comunitario guidato dall'empatia: i valori della famiglia e dell'armonia tra uomo e animale sono il pilastro di ogni nostra attività.
                            </p>
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>

            <OndaBottom colore={color} sfondo="bianco" />
            <OndaTop colore={color} sfondo="scuro" />

            <div className="chi-siamo3-container">
                <div className="chi-siamo3">
                    <AnimateOnScroll>
                        <h2>Informazioni sulle adozioni</h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <h3>Diamoci la zampa</h3>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <p>
                            Se siete interessati a incontrare i nostri mici, come prima cosa potrete fare un giro del rifugio per vederli e conoscerli un po'. Questa visita serve a darvi un'occhiata intorno e scoprire i coinquilini della struttura in quel momento, dato che tra nuove entrate e felici adozioni, la nostra "famiglia" è in costante mutamento.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <h3>Dimmi chi sei e ti dirò che gatto cerchi</h3>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <p>
                            Vi verranno fatte alcune domande che aiuteranno a individuare il gatto o i gatti più adatti in base al vostro nucleo familiare, stile di vita e tipo di abitazione. Ogni micio ha la sua età e una personalità unica, per aiutarvi a trovare il compagno ideale, analizziamo insieme il vostro contesto familiare, come la presenza di bambini, anziani o altri animali, e la vostra precedente esperienza con i felini. È altrettanto importante valutare le vostre abitudini quotidiane: se lavorate molte ore fuori casa, se viaggiate spesso o se vi spostate nei weekend, dobbiamo scegliere un gatto che si adatti bene alla solitudine o, al contrario, agli spostamenti.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <h3>Castello o monolocale? Ad ogni spazio il suo micio.</h3>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <p>
                            Per trovare il compagno ideale, dobbiamo immaginare la sua nuova vita nelle vostre stanze: si tratta di un appartamento in condominio o di una casa indipendente? Ci sono balconi da mettere in sicurezza o accessi diretti a vie molto frequentate? Come potete notare, ogni dettaglio architettonico ci aiuta a compiere la scelta migliore per la felicità vostra e del piccolo ospite.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <h3>La visita di pre-affido</h3>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <p>
                            Si tratta di una fase essenziale per approfondire la conoscenza reciproca e integrare le informazioni raccolte inizialmente. È un momento di condivisione sereno, concordato in base ai vostri impegni, utile a gettare le basi per un'adozione di successo.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <p>
                            È bene sapere che l'indole da esploratore dei felini li spinge a esaminare ogni angolo, comprese le aperture verso l'esterno. Per questo potrebbe essere necessario mettere in sicurezza finestre e balconi, un piccolo accorgimento tecnico per prevenire possibili incidenti.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <p>
                            Questo incontro sarà anche l'occasione perfetta per chiarire ogni dubbio con il nostro incaricato, chiedendo consigli sull'inserimento in casa o sulla gestione del gatto durante le ferie. Grazie di cuore per aver pensato ai nostri mici per una possibile adozione, per averci letto fino a qui e per l'attenzione che dedicherete a quanto vi abbiamo raccontato!
                        </p>
                    </AnimateOnScroll>
                    <div className="adotta">
                        <AnimateOnScroll>
                            <Link to="/adotta">
                                Vieni a scoprire i nostri ospiti
                            </Link>
                        </AnimateOnScroll>
                    </div>
                </div>
            </div >
        </>
    )
}