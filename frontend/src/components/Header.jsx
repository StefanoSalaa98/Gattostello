import { NavLink } from "react-router-dom"
import BurgerMenu from "./BurgerMenu"
import "../css/Header.css";

export default function Header() {

    return (
        <>
            <header>
                <div className="header-container">
                    <div className="logo">
                        <img src="/img/gattostello_post.png" alt="gattostello" />
                    </div>
                    <nav className="pagine">
                        <div className="link-list">
                            <NavLink className="link" to="/">Home Page</NavLink>
                            <NavLink className="link" to="/chi-siamo">Chi Siamo</NavLink>
                            <NavLink className="link" to="/sostienici">Sostienici</NavLink>
                            <NavLink className="link" to="/unisciti">Unisciti</NavLink>
                            <NavLink className="link" to="/eventi">Eventi</NavLink>
                            <NavLink className="link" to="/adotta">Adotta un gatto</NavLink>
                            <NavLink className="link" to="/ex-ospiti">I nostri ex ospiti</NavLink>
                        </div>
                    </nav>
                    <div className="burger">
                        {/* <div className="testa">
                            <a className="icona" href="https://www.facebook.com/ilGattostello"><FaFacebookF /></a>
                            <a className="icona" href="https://www.facebook.com/profile.php?id=100087577566537&locale=it_IT"><FaFacebookF /></a>
                            <a className="icona" href="https://www.instagram.com/gattostello.odv/"><FaInstagram /></a>
                        </div> */}
                        <BurgerMenu />
                    </div>
                </div>
            </header>
        </>
    )
}