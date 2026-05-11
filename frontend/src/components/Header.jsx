import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom"
import BurgerMenu from "./BurgerMenu"
import "../css/Header.css";

export default function Header() {

    // ricavo la pagina in cui mi trovo
    const location = useLocation();
    // variabile che mi dice se sono nella HomePage
    const isHomePage = location.pathname === "/";

    const [headerState, setHeaderState] = useState('top');

    useEffect(() => {

        // Se non sonon nella HomePage esco subito
        if (!isHomePage) {
            setHeaderState('sticky');
            return;
        }

        const handleScroll = () => {
            const heroHeight = window.innerHeight * 0.8;

            if (scrollY < 50) {
                // 1. Siamo proprio all'inizio
                setHeaderState('top');
            } else if (scrollY > 50 && scrollY < heroHeight) {
                // 2. L'utente ha iniziato a scrollare ma è ancora nella Hero
                setHeaderState('hidden');
            } else if (scrollY >= heroHeight) {
                // 3. Abbiamo superato la Hero
                setHeaderState('sticky');
            }
        };

        // Eseguo il controllo immediatamente al montaggio del componente
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    return (
        <>
            <header className={`navbar-${headerState}`}>
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