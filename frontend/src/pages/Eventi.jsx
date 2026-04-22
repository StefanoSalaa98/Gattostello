import { useState } from "react";
import "../css/Eventi.css";
import AnimateOnScroll from "../hooks/AnimateOnScroll";

export default function Eventi() {

    // variabile di stato che indica se devo o non devo girare la card
    const [flipped, setFlipped] = useState(false);

    // Approccio: desktop --> giro la card all'hover
    //            mobile --> giro la card al click
    return (
        <>
            <div className="intro-eventi">
                <AnimateOnScroll>
                    <h2> I nostri eventi </h2>
                    <p>
                        Oltre a prenderci cura con dedizione di ogni micio, noi del Gattostello siamo costantemente al lavoro per organizzare iniziative uniche e divertenti, trasformando la solidarietà in eventi imperdibili per sostenere la nostra causa. Seguici sui nostri canali social per non perderteli!
                    </p>
                </AnimateOnScroll>
            </div>
            <div className="eventi-container">
                <div
                    className={`flip-card ${flipped ? 'flipped' : ''}`}
                    onClick={() => setFlipped(!flipped)}  //cambiolo stato di flipped
                >
                    {/* contenitore interno che faccio effettivamente ruotare */}
                    <div className="flip-card-inner">
                        {/* faccia frontale card */}
                        <div className="flip-card-front">
                            <AnimateOnScroll animation="zoom-in">
                                <img
                                    src="img/eventi/colazione.jpg"
                                    alt="colazione"
                                    className="card-image"
                                />
                            </AnimateOnScroll>
                        </div>

                        {/* faccia posteriore card */}
                        <div className="flip-card-back">
                            <div className="content">
                                <h2>Miao Party</h2>
                                <p>
                                    Volete iniziare la giornata con la zampa giusta? Le nostre <strong> colazioni con i mici </strong> sono il carburante perfetto: cornetti, caffè e tante coccole feline per risvegliare il buonumore! Se invece preferite il relax del tramonto, non potete mancare ai nostri <strong> apericena con i baffi</strong>, dove brindiamo alla salute dei nostri mici tra una fusa e l'altra.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`flip-card ${flipped ? 'flipped' : ''}`}
                    onClick={() => setFlipped(!flipped)}  //cambiolo stato di flipped
                >
                    {/* contenitore interno che faccio effettivamente ruotare */}
                    <div className="flip-card-inner">
                        {/* faccia frontale card */}
                        <div className="flip-card-front">
                            <AnimateOnScroll animation="zoom-in">
                                <img
                                    src="img/eventi/cena.jpg"
                                    alt="cena"
                                    className="card-image"
                                />
                            </AnimateOnScroll>
                        </div>

                        {/* faccia posteriore card */}
                        <div className="flip-card-back">
                            <div className="content">
                                <h2>Cene di gruppo</h2>
                                <p>
                                    Il segreto della felicità sta nella condivisione, specialmente quando ci ritroviamo tutti insieme davanti a tavole imbandite durante le nostre <strong> cene di gruppo.</strong> Questi momenti rappresentano l'occasione ideale per staccare dalla routine e fare quattro chiacchiere insieme sostenendo i nostri amici a 4 zampe.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`flip-card ${flipped ? 'flipped' : ''}`}
                    onClick={() => setFlipped(!flipped)}  //cambiolo stato di flipped
                >
                    {/* contenitore interno che faccio effettivamente ruotare */}
                    <div className="flip-card-inner">
                        {/* faccia frontale card */}
                        <div className="flip-card-front">
                            <AnimateOnScroll animation="zoom-in">
                                <img
                                    src="img/eventi/mercatino.jpg"
                                    alt="mercatino"
                                    className="card-image"
                                />
                            </AnimateOnScroll>
                        </div>

                        {/* faccia posteriore card */}
                        <div className="flip-card-back">
                            <div className="content">
                                <h2>Mercatini</h2>
                                <p>
                                    Ci troverete carichi di colori e creatività anche tra le bancarelle, perché <strong> partecipiamo ai mercatini </strong> della zona con tantissimi gadget fatti a mano che parlano di noi e del nostro impegno.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`flip-card ${flipped ? 'flipped' : ''}`}
                    onClick={() => setFlipped(!flipped)}  //cambiolo stato di flipped
                >
                    {/* contenitore interno che faccio effettivamente ruotare */}
                    <div className="flip-card-inner">
                        {/* faccia frontale card */}
                        <div className="flip-card-front">
                            <AnimateOnScroll animation="zoom-in">
                                <img
                                    src="img/eventi/raccolta_pappe.jpg"
                                    alt="raccolta_pappe"
                                    className="card-image"
                                />
                            </AnimateOnScroll>
                        </div>

                        {/* faccia posteriore card */}
                        <div className="flip-card-back">
                            <div className="content">
                                <h2>Raccolta pappe</h2>
                                <p>
                                    Siccome la pancia dei nostri mici è la nostra priorità, siamo sempre in prima linea con le <strong> raccolte pappe: </strong>un piccolo gesto di solidarietà che per i nostri mici sempre affamati significa tutto.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div >
        </>
    )
}





