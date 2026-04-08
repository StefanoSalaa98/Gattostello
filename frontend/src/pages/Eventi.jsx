import { useEffect, useState } from "react";
import "../css/Eventi.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { PiPawPrintLight } from "react-icons/pi";
import AnimateOnScroll from "../hooks/AnimateOnScroll";

export default function Eventi() {

    // prendo tutti i file immagine presenti nel percorso specificato
    const images = Object.values(
        import.meta.glob("/public/img/eventi/*.{jpg,png,jpeg}", {
            eager: true,  // importa subito tutte le immagini appena carica il componente
            as: "url"  // fa sì che ogni immagine venga trasformata nel suo percorso URL stringa
        })
    );

    // variabile di stato dell'indice lista immagini
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((index) =>
                // se ho raggounto l'ultima img ricomincio da capo altrimenti faccio +1
                index === images.length - 1 ? 0 : index + 1
            );
        }, 10000); // ogni 3 secondi

        return () => clearInterval(interval);
    }, [images.length]); // aggiorno l'effetto solo se cambia il numero immagini

    return (
        <>
            <div className="carousel-container">
                <div className="carosello">
                    <PiPawPrintLight
                        className="icona ruota-sx"
                        onClick={() =>
                            setCurrentIndex((index) =>
                                index === 0 ? images.length - 1 : index - 1
                            )
                        }
                    />
                    <div className="immagine overflow-hidden rounded shadow">
                        <img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt="carosello"
                            className="zoom-img img-fluid w-100"
                            loading="lazy"
                        />
                    </div>
                    <PiPawPrintLight
                        className="icona ruota-dx"
                        onClick={() =>
                            setCurrentIndex((index) =>
                                index === images.length - 1 ? 0 : index + 1
                            )
                        }
                    />
                </div>

                <div className="testo">
                    <AnimateOnScroll>
                        <p>
                            La nostra associazione non è solo un gruppo di volontari, ma una grande famiglia che oltre a prendersi cura degli amici a quattro zampe organizza una serie di
                            appuntamenti imperdibili aperti a tutti.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <p>
                            Volete iniziare la giornata con la zampa giusta? Le nostre <strong> colazioni con i mici </strong> sono il carburante perfetto: cornetti, caffè e tante coccole feline per risvegliare il buonumore! Se invece preferite il relax del tramonto, non potete mancare ai nostri <strong> apericena con i baffi</strong>, dove brindiamo alla salute dei nostri mici tra una fusa e l'altra.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <p>
                            Ma non finisce qui, perché amiamo stare insieme anche davanti a tavole imbandite nelle <strong> cene di gruppo</strong>, l'occasione ideale per fare quattro chiacchiere, condividere e divertirsi in compagnia.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <p>
                            Ci troverete carichi di colori e creatività anche tra le bancarelle, perché <strong> partecipiamo ai mercatini </strong> della zona con tantissimi gadget fatti a mano che parlano di noi e del nostro impegno.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <p>
                            E siccome la pancia dei nostri amici è la nostra priorità, siamo sempre in prima linea con le <strong> raccolte pappe: </strong>un piccolo gesto di solidarietà che per i nostri mici di strada significa tutto.
                        </p>
                    </AnimateOnScroll>
                    <AnimateOnScroll>
                        <p>
                            Resta sempre aggiornato sui prossimi eventi seguendo i nostri canali social:
                        </p>
                    </AnimateOnScroll>
                    <div className="testa">
                        <AnimateOnScroll>
                            <a className="icona" href="https://www.instagram.com/gattostello.odv/"><FaInstagram /></a>
                            <a className="icona" href="https://www.facebook.com/ilGattostello"><FaFacebookF /></a>
                            <a className="icona" href="https://www.facebook.com/profile.php?id=100087577566537&locale=it_IT"><FaFacebookF /></a>
                        </AnimateOnScroll>
                    </div>
                </div>
            </div >
        </>
    )

}