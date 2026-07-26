import Offcanvas from "bootstrap/js/dist/offcanvas";
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

        Offcanvas.getOrCreateInstance(menuElement);

        const handleOpen = () => setIsMenuOpen(true);
        const handleClose = () => setIsMenuOpen(false);

        menuElement.addEventListener("show.bs.offcanvas", handleOpen);
        menuElement.addEventListener("hide.bs.offcanvas", handleClose);

        return () => {
            menuElement.removeEventListener("show.bs.offcanvas", handleOpen);
            menuElement.removeEventListener("hide.bs.offcanvas", handleClose);
            setIsMenuOpen(false);
        };
    }, [setIsMenuOpen]);

    // Funzione per chiudere il menu quando si clicca un link
    const closeMenu = () => {
        const instance = Offcanvas.getOrCreateInstance(offcanvasRef.current);
        instance.hide();
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
                            <NavLink className="link"
                                to="/"
                                onClick={closeMenu}>
                                Home Page
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink
                                className="link"
                                to="/chi-siamo"
                                onClick={closeMenu}>
                                Chi Siamo
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink
                                className="link"
                                to="/sostienici"
                                onClick={closeMenu}>
                                Sostienici
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink
                                className="link"
                                to="/unisciti"
                                onClick={closeMenu}>
                                Unisciti
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink
                                className="link"
                                to="/eventi"
                                onClick={closeMenu}>
                                Eventi
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink
                                className="link"
                                to="/adotta"
                                onClick={closeMenu}>
                                Adotta un gatto
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink
                                className="link"
                                to="/ex-ospiti"
                                onClick={closeMenu}>
                                I nostri ex ospiti
                            </NavLink>
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