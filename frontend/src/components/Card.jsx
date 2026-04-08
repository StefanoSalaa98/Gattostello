import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";

export default function Card(props) {

    // recupero l'indirizzo protetto dove prendere le immagini
    const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

    const { image, name, sex } = props;

    return (
        <>
            <div className="immagine">
                {image ?
                    <img src={`${IMAGE_URL}/${image}`}
                        alt="gatto"
                        onError={(e) => {
                            e.target.src = "img/default.png"; // Percorso della mia immagine di default
                            e.target.onerror = null; // Evita loop infiniti se anche la default manca
                        }}
                        loading="lazy"
                    />
                    :
                    <img src="img/default.png" alt="gatto" />
                }
            </div>
            <div className="testo">
                <span>{sex == "M" ? <IoMdMale className="icona maschio" /> : <IoMdFemale className="icona femmina" />}</span>
                <span className="titolo">{name}</span>
            </div>
        </>
    )
}