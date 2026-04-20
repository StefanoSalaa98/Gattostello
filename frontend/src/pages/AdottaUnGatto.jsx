import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
// importo hook per il contesto
import { useGlobal } from "../contexts/GlobalContext";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import Pagination from "../components/Pagination";
import AnimateOnScroll from "../hooks/AnimateOnScroll";

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

    // creo un riferimento diretto a un elemento del DOM
    const catsContainerRef = useRef(null);

    // variabile di stato delle pagine totali
    const [totalPages, setTotalPages] = useState();

    // chiamata axios per ricevere la lista dei gatti
    const fetchCats = () => {
        // appena entro nella funzione per la chiamata axios, attivo il loading 
        setIsLoading(true);
        axios.get(`${API_URL}/cats?adottato=0&page=${page}`)
            .then(({ data }) => {
                console.log(API_URL);
                setCats(data.data);
                setTotalPages(data.total_pages);
            })
            .catch(error => { console.log(error) })
            // terminata la chiamata axios, disattivo il loading
            .finally(() => { setIsLoading(false) })
    }

    // quando cambio paginazione risalgo all'inizio del container delle card gatti
    useEffect(() => {
        catsContainerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, [page]);

    // faccio partire la chiamata solo al primo montaggio del componente
    useEffect(fetchCats, [page]);

    return (
        <>
            <div
                ref={catsContainerRef}
                className="gatto-container fade-in"
                key={page}
            >
                {isLoading ?
                    (
                        Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    )
                    :
                    (
                        cats?.map((cat) => (
                            <Link
                                to={`/adotta/${cat.slug}?page=${page}`}
                                key={cat.id}
                                className="gatto"
                            >
                                <AnimateOnScroll animation="zoom-in">
                                    <Card
                                        name={cat?.name}
                                        sex={cat?.sex}
                                        image={cat?.image}
                                    />
                                </AnimateOnScroll>
                            </Link>
                        ))
                    )
                }
            </div>

            <Pagination
                page={page}
                totalPages={totalPages}
                setSearchParams={setSearchParams}
            />
        </>
    )
}