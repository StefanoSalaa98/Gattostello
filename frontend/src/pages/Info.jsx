import axios from "axios"

import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

// import state e effect
import { useState, useEffect } from "react";

// importo hook per il contesto
import { useGlobal } from "../contexts/GlobalContext";

import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

import "../css/Info.css";

export default function Info() {

    // recupero l'indirizzo protetto che espone la API
    const API_URL = import.meta.env.VITE_API_URL;

    // recupero l'indirizzo protetto dove prendere le immagini
    const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

    // recupero lo slug del gatto selezionato
    const { slug } = useParams();

    // recupero la pagina in cui si trovava il gatto
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const page = params.get("page") || 1;

    // estrapolo dal context la variabile di stato
    const { setIsLoading } = useGlobal();

    // variabile di stato del gatto
    const [cat, setCat] = useState([]);

    //variabile di stato per la data estesa
    const [data, setData] = useState([]);

    // chiamata axios per ricevere la lista dei gatti
    const fecthCat = () => {
        // appena entro nella funzione per la chiamata axios, attivo il loading 
        setIsLoading(true);
        axios.get(`${API_URL}/${slug}`)
            .then(response => {
                console.log(response.data.data);
                setCat(response.data.data)
            })
            .catch(error => { console.log(error) })
            // terminata la chiamata axios, disattivo il loading
            .finally(() => { setIsLoading(false) })
    }

    // funzione che restituisce il mese corrispondente alla data presente nel db
    function dataEstesa() {

        const mesi = {
            "01": "Gennaio",
            "02": "Febbraio",
            "03": "Marzo",
            "04": "Aprile",
            "05": "Maggio",
            "06": "Giugno",
            "07": "Luglio",
            "08": "Agosto",
            "09": "Settembre",
            "10": "Ottobre",
            "11": "Novembre",
            "12": "Dicembre"
        };

        const mese = mesi[cat?.date_of_birth?.slice(-2)];
        const anno = cat?.date_of_birth?.slice(0, 4);
        setData(mese + " " + anno);
    }

    // faccio partire la chiamata solo al primo montaggio del componente
    useEffect(fecthCat, []);

    useEffect(dataEstesa, [cat]);

    return (
        <>
            <div className="info">
                <Link
                    to={`/adotta?page=${page}`}
                    className="indietro">
                    <FaArrowLeft />
                </Link>
                <h2>{cat.name}</h2>
                <div className="evidenza">
                    <div className="immagine">
                        {cat.image ?
                            <img src={`${IMAGE_URL}/${cat.image}`}
                                alt="gatto"
                                onError={(e) => {
                                    e.target.src = "../img/default.png"; // Percorso della mia immagine di default
                                    e.target.onerror = null; // Evita loop infiniti se anche la default manca
                                }} />
                            :
                            <img src="../img/default.png" alt="gatto" />
                        }
                    </div>
                    <div className="testo">
                        {cat.sex && (
                            <span> <strong>Sesso: </strong>
                                {cat.sex == "M" ?
                                    <>
                                        <IoMdMale className="icona maschio" />
                                        Maschio
                                    </>
                                    :
                                    <>
                                        <IoMdFemale className="icona femmina" />
                                        Femmina
                                    </>
                                }</span>

                        )}
                        {cat.date_of_birth && (
                            <span><strong>Data di nascita: </strong>{data}</span>
                        )}
                        {cat.coat && (
                            <span><strong>Manto: </strong>{cat.coat}</span>
                        )}
                        {cat.info && (
                            <span><strong>Informazioni: </strong>{cat.info}</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}