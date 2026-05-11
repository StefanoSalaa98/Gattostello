import { useEffect, useRef } from "react";
import { useGlobal } from "../contexts/GlobalContext";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function BurgerMenu() {
    const { setIsMenuOpen } = useGlobal();
    const offcanvasRef = useRef(null);

    useEffect(() => {
        const menuElement = offcanvasRef.current;
        if (!menuElement) return;

        // Inizializzazione manuale per garantire il funzionamento su tutti i dispositivi
        const bsOffcanvas = window.bootstrap?.Offcanvas.getOrCreateInstance(menuElement);

        // Uso 'show' e 'hide' invece di 'shown' e 'hidden' per un feedback immediato
        const handleOpen = () => setIsMenuOpen(true);
        const handleClose = () => setIsMenuOpen(false);

        menuElement.addEventListener('show.bs.offcanvas', handleOpen);
        menuElement.addEventListener('hide.bs.offcanvas', handleClose);

        return () => {
            menuElement.removeEventListener('show.bs.offcanvas', handleOpen);
            menuElement.removeEventListener('hide.bs.offcanvas', handleClose);
            // Reset di sicurezza dello stato quando il componente smonta
            setIsMenuOpen(false);
        };
    }, [setIsMenuOpen]);

    // Funzione per chiudere il menu quando si clicca un link
    const closeMenu = () => {
        const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvasRef.current);
        bsOffcanvas?.hide();
    };

    return (
        <>
            {/* Bottone Burger */}
            <button
                className="navbar-toggler"
                data-bs-theme="dark"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMenu"
                aria-controls="offcanvasMenu"
                // Fallback manuale per disattivare il repelling istantaneamente al tocco
                onTouchStart={() => setIsMenuOpen(true)}
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Pannello Offcanvas */}
            <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasMenu"
                ref={offcanvasRef}
                aria-labelledby="offcanvasMenuLabel"
            >
                <div className="offcanvas-header">
                    <h5 id="offcanvasMenuLabel" className="visually-hidden">Menu</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>

                <div className="offcanvas-body menu-laterale d-flex flex-column">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item mb-3">
                            <NavLink className="link" to="/">Home Page</NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink className="link" to="/chi-siamo">Chi Siamo</NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink className="link" to="/sostienici">Sostienici</NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink className="link" to="/unisciti">Unisciti</NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink className="link" to="/eventi">Eventi</NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink className="link" to="/adotta">Adotta un gatto</NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink className="link" to="/ex-ospiti">I nostri ex ospiti</NavLink>
                        </li>

                        <li className="nav-item social mt-auto d-flex justify-content-around">
                            <a className="icona nav-link icona-burger" href="https://www.facebook.com/ilGattostello" target="_blank" rel="noreferrer">
                                <FaFacebookF />
                            </a>
                            <a className="icona nav-link icona-burger" href="https://www.facebook.com/profile.php?id=100087577566537" target="_blank" rel="noreferrer">
                                <FaFacebookF />
                            </a>
                            <a className="icona nav-link icona-burger" href="https://www.instagram.com/gattostello.odv/" target="_blank" rel="noreferrer">
                                <FaInstagram />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}