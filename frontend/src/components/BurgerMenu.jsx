import Offcanvas from "bootstrap/js/dist/offcanvas";
import { useEffect, useRef } from "react";
import { useGlobal } from "../contexts/GlobalContext";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const navigateAndClose = (e, path) => {
        e.preventDefault();

        const instance = Offcanvas.getOrCreateInstance(offcanvasRef.current);

        instance.hide();

        setTimeout(() => {
            document
                .querySelectorAll(".offcanvas-backdrop")
                .forEach(el => el.remove());

            document.body.classList.remove("offcanvas-backdrop", "modal-open");
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";

            navigate(path);
        }, 350);
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
                            <a
                                href="/"
                                className="link"
                                onClick={(e) => navigateAndClose(e, "/")}
                            >
                                Home Page
                            </a>
                        </li>

                        <li className="nav-item mb-3">
                            <a
                                href="/chi-siamo"
                                className="link"
                                onClick={(e) => navigateAndClose(e, "/chi-siamo")}
                            >
                                Chi Siamo
                            </a>
                        </li>

                        <li className="nav-item mb-3">
                            <a
                                href="/sostienici"
                                className="link"
                                onClick={(e) => navigateAndClose(e, "/sostienici")}
                            >
                                Sostienici
                            </a>
                        </li>

                        <li className="nav-item mb-3">
                            <a
                                href="/unisciti"
                                className="link"
                                onClick={(e) => navigateAndClose(e, "/unisciti")}
                            >
                                Unisciti
                            </a>
                        </li>

                        <li className="nav-item mb-3">
                            <a
                                href="/eventi"
                                className="link"
                                onClick={(e) => navigateAndClose(e, "/eventi")}
                            >
                                Eventi
                            </a>
                        </li>

                        <li className="nav-item mb-3">
                            <a
                                href="/adotta"
                                className="link"
                                onClick={(e) => navigateAndClose(e, "/adotta")}
                            >
                                Adotta un gatto
                            </a>
                        </li>

                        {/* <li className="nav-item mb-3">
                            <a
                                href="/ex-ospiti"
                                className="link"
                                onClick={(e) => navigateAndClose(e, "/ex-ospiti")}
                            >
                                I nostri ex ospiti
                            </a>
                        </li> */}

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