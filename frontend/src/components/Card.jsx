import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";

export default function Card(props) {

    const { image, name, sex } = props;

    return (
        <>
            <div className="immagine">
                {image ?
                    <img src={`http://laravel-gattostello.test/storage/${image}`}
                        alt="gatto"
                        onError={(e) => {
                            e.target.src = "img/default.png"; // Percorso della mia immagine di default
                            e.target.onerror = null; // Evita loop infiniti se anche la default manca
                        }} />
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