import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
    const phone = "393398067656";
    const message = "Ciao, vorrei informazioni per adottare un gatto a distanza";
    const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={link}
            className="whatsapp-button"
            target="_blank"
            rel="noopener noreferrer"
        >
            <FaWhatsapp size={28} />
        </a>
    );
}

export default WhatsAppButton;