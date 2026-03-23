import "../css/NotFoundPage.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {

    return (
        <>
            <div className="notFound">
                <div className="testo">
                    <h4>Ops... qualcosa non ha funzionato</h4>
                    <h3>Pagina non trovata</h3>
                    <p>Non c'è bisogno di arrabbiarsi: torna all'homepage e continua a navigare.</p>
                    <Link to="/">
                        Homepage
                    </Link>
                </div>
                <div className="immagine">
                    <img src="img/404.jpg" alt="404" />
                </div>
            </div>
        </>
    )
}