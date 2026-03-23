import axios from "axios"
import { useState, useEffect } from "react"
// importo hook per il contesto
import { useGlobal } from "../contexts/GlobalContext";
import Card from "../components/Card";

export default function ExOspiti() {

    // estrapolo dal context la variabile di stato
    const { setIsLoading } = useGlobal();

    // variabile di stato dei gatti
    const [cats, setCats] = useState([]);

    // variabile di stato della pagina corrente
    const [page, setPage] = useState(1);

    // variabile di stato delle pagine totali
    const [totalPages, setTotalPages] = useState();

    // chiamata axios per ricevere la lista dei gatti
    const fecthCats = () => {
        // appena entro nella funzione per la chiamata axios, attivo il loading 
        setIsLoading(true);
        axios.get('http://localhost:3000/api/cats/exOspiti')
            .then(response => {
                setCats(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
            })
            .catch(error => { console.log(error) })
            // terminata la chiamata axios, disattivo il loading
            .finally(() => { setIsLoading(false) })
    }

    // faccio partire la chiamata solo al primo montaggio del componente
    useEffect(fecthCats, []);

    return (
        <>
            <div className="gatto-container fade-in" key={page}>
                {cats.map((cat) => (
                    <div key={cat.id} className="gatto">
                        <Card
                            name={cat.name}
                            sex={cat.sex}
                            image={cat.image}

                        />
                    </div>
                ))}
            </div>

            {/* Controlli di Paginazione */}
            <div className="pagination-container">
                <button
                    className="prev-next-btn"
                    disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}
                >
                    <span className="arrow">«</span> Precedente
                </button>

                <span className="page-numbers"> Pagina {page} di {totalPages} </span>

                <button
                    className="prev-next-btn"
                    disabled={page === totalPages}
                    onClick={() => setPage(prev => prev + 1)}
                >
                    Successiva <span className="arrow">»</span>
                </button>
            </div>

        </>
    )
}