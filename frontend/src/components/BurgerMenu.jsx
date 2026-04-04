import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function BurgerMenu() {
    return (
        <>
            {/* bottone burger */}
            <button
                className="navbar-toggler "
                data-bs-theme="dark"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMenu"
                aria-controls="offcanvasMenu"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* pannello offcanvas */}
            <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasMenu"
            >
                <div className="offcanvas-header">
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
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
                        <li className="nav-item social mt-auto">
                            <a className="icona nav-link icona-burger"
                                href="https://www.facebook.com/ilGattostello">
                                <FaFacebookF />
                            </a>
                            <a className="icona nav-link icona-burger"
                                href="https://www.facebook.com/profile.php?id=100087577566537&locale=it_IT">
                                <FaFacebookF />
                            </a>
                            <a className="icona nav-link icona-burger"
                                href="https://www.instagram.com/gattostello.odv/">
                                <FaInstagram />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}