import { useEffect, useState } from "react";
import "../css/Novità.css";

export default function Novita() {

    const numeroFile = 18;
    const [fileNovita, setFileNovita] = useState([]);
    const [cardSelezionata, setCardSelezionata] = useState(null);

    // Stati per la paginazione
    const [currentPage, setCurrentPage] = useState(1);
    const elementiPerPagina = 6;

    // Calcolo degli indici
    const indexOfFirstItem = numeroFile - (currentPage * elementiPerPagina);
    const indexOfLastItem = indexOfFirstItem + elementiPerPagina;

    // Calcolo del numero totale di pagine
    const totalPages = Math.ceil(numeroFile / elementiPerPagina);

    function prendiNovità() {

        let tempArray = [];
        for (let i = indexOfLastItem; i > indexOfFirstItem && i > 0; i--) {
            tempArray.push(`img/novità/news${i}.jpg`);
        }
        setFileNovita(tempArray);
    }

    useEffect(() => {
        prendiNovità();
    }, [currentPage]);

    return (
        <>
            <div className="news-container fade-in" key={currentPage}>
                {fileNovita.map((news, i) => (

                    <div
                        key={i}
                        className="immagine"
                        onClick={() => setCardSelezionata(news)}
                    >
                        <img src={news} alt={news} loading="lazy" />
                    </div>

                ))}

                {cardSelezionata && (
                    <div
                        className="fullscreen"
                        onClick={() => setCardSelezionata(null)}
                    >
                        <div className="fullscreen-card">
                            <img src={cardSelezionata} alt={cardSelezionata} />
                        </div>
                    </div>
                )}
            </div>

            {/* Controlli di Paginazione */}
            <div className="pagination-container">
                <button
                    className="prev-next-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    <span className="arrow">«</span> Precedente
                </button>

                <span className="page-numbers"> Pagina {currentPage} di {totalPages} </span>

                <button
                    className="prev-next-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Successiva <span className="arrow">»</span>
                </button>
            </div>
        </>
    )
}