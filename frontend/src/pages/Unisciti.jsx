import "../css/Unisciti.css";
import AnimateOnScroll from "../hooks/AnimateOnScroll";

export default function Unisciti() {
    return (
        <>
            <div className="unisciti-par1-container">
                <div className="unisciti">
                    <div className="testo">
                        <AnimateOnScroll>
                            <h2>Codice di fusa e condotta</h2>
                            <p>
                                Siamo una realtà fatta interamente di volontari e siamo sempre alla ricerca di braccia (e cuori!) disposti ad aiutarci nella gestione quotidiana dei nostri gatti. L'unico requisito è avere un grande amore per i nostri amici a 4 zampe, garantendo una minima disponibilità di tempo e occupandosi delle necessità quotidiane dei gatti ospitati.
                            </p>
                            <p>
                                Tutti i nostri ospiti dipendono unicamente da noi volontari, dedicarci a loro è sia una passione che un impegno, per questo è fondamentale essere rigorosi e seri nell'impegno preso, la regolarità è essenziale per garantire il benessere degli animali e il corretto funzionamento del Gattostello. Al momento contiamo su un numero ristretto di volontari, il che rende fondamentale una presenza regolare per garantire la copertura di tutti i turni. Il nostro obiettivo è far crescere la squadra: più saremo, più potremo distribuire gli impegni in modo leggero, offrendo a ciascuno una maggiore flessibilità d'orario.
                            </p>
                        </AnimateOnScroll>
                    </div>
                    <div className="immagine">
                        <AnimateOnScroll animation="slide-right" delay={0.5}>
                            <img src="img/mango.jpg" alt="mango" />
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>
            <div className="unisciti-par2-container">
                <div className="unisciti">
                    <div className="immagine">
                        <AnimateOnScroll animation="slide-left">
                            <img src="img/lino.jpg" alt="lino" />
                        </AnimateOnScroll>
                    </div>
                    <div className="testo">
                        <AnimateOnScroll delay={0.5}>
                            <p>
                                Essere un volontario significa prendersi cura della quotidianità dei nostri ospiti: dare loro da mangiare e pulire i luoghi in cui vivono, compresi lettiere, ciotole e aree comuni, non senza qualche pausa per dare e ricevere coccole.
                                Le altre attività includono eventi di raccolta pappa, mercatini e gestione delle emergenze. In caso di bisogno, potrebbe essere necessario accompagnare gli animali alle visite veterinarie.
                            </p >
                            <p>
                                I turni si svolgono tutti i giorni due volte al giorno: il turno della mattina inizia alle <strong>8:00/8:15</strong>, il turno del pomeriggio inizia alle <strong>17:00/17:15.</strong> Ogni turno viene svolto con l'aiuto di più volontari e ha una <strong>durata media di 2/3 ore </strong>a seconda del periodo.
                            </p>
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>
        </>
    )
}