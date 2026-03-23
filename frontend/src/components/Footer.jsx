import { MdPhoneAndroid } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import "../css/Footer.css";

export default function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="posizione">
                    <div className="logo">
                        <img src="/img/gattostello_post.png" alt="gattostello" />
                    </div>
                    <p><strong>Via A. Diaz 25</strong></p>
                    <p><strong>Alzate Brianza (CO), 22040 </strong></p>
                    <p><strong>C.F. 95142450139</strong></p>
                </div>
                <div className="orari">
                    <h5>Orari apertura</h5>
                    <p><strong>Tutti i giorni</strong></p>
                    <p><strong>17:30 - 19:00</strong></p>
                </div>
                <div className="contatti">
                    <h5>Contatti</h5>
                    <MdPhoneAndroid /><a href="tel:+39 339 806 7656"> 339 806 7656 </a><br /><br />
                    <MdOutlineMailOutline /><a href="mailto:gattostello.co@gmail.com"> gattostello.co@gmail.com</a>
                </div>
            </div>
        </footer>
    )
}