import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
// importo hook per il contesto
import { useGlobal } from "../contexts/GlobalContext";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";

export default function AdottaUnGatto() {

    // recupero l'indirizzo protetto che espone la API
    const API_URL = import.meta.env.VITE_API_URL;

    // estrapolo dal context la variabile di stato
    const { isLoading, setIsLoading } = useGlobal();

    // variabile di stato dei gatti
    const [cats, setCats] = useState([]);

    // variabile di stato della pagina corrente
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;

    // variabile di stato delle pagine totali
    const [totalPages, setTotalPages] = useState();

    // chiamata axios per ricevere la lista dei gatti
    const fetchCats = () => {
        // appena entro nella funzione per la chiamata axios, attivo il loading 
        setIsLoading(true);
        axios.get(`${API_URL}?adottato=0&page=${page}`)
            .then(({ data }) => {
                setCats(data.data);
                setTotalPages(data.total_pages);
            })
            .catch(error => { console.log(error) })
            // terminata la chiamata axios, disattivo il loading
            .finally(() => { setIsLoading(false) })
    }

    // faccio partire la chiamata solo al primo montaggio del componente
    useEffect(fetchCats, [page]);

    return (
        <>
            <div className="gatto-container fade-in" key={page}>
                {cats?.map((cat) => (
                    <Link
                        to={`/adotta/${cat.slug}?page=${page}`}
                        key={cat.id}
                        className="gatto"
                    >
                        <Card
                            name={cat?.name}
                            sex={cat?.sex}
                            image={cat?.image}
                        />
                    </Link>
                ))}
                {isLoading &&
                    Array.from({ length: 8 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
            </div>
            {/* Controlli di Paginazione */}
            <div className="pagination-container">
                <button
                    className="prev-next-btn"
                    disabled={page === 1}
                    onClick={() => setSearchParams({ page: page - 1 })}
                >
                    <span className="arrow">«</span> Precedente
                </button>

                <span className="page-numbers"> Pagina {page} di {totalPages} </span>

                <button
                    className="prev-next-btn"
                    disabled={page === totalPages}
                    onClick={() => setSearchParams({ page: page + 1 })}
                >
                    Successiva <span className="arrow">»</span>
                </button>
            </div>
        </>
    )
}