import { useState } from "react";

export default function CodiceFiscale() {

    const iban = "95142450139";
    const [copiato, setCopiato] = useState(false);

    const copiaCodice = () => {
        navigator.clipboard.writeText(iban);
        setCopiato(true);

        setTimeout(() => setCopiato(false), 5000);
    };

    return (
        <>
            <div className="codice-fiscale">
                <div>
                    <span className="codice">C.F. : </span>
                    <span
                        onClick={copiaCodice}
                        className="codice-text"
                        title="Clicca per copiare"
                    >
                        {iban}
                    </span >
                </div>
                <span className={`copiato-msg ${copiato ? "show" : ""}`}>
                    CODICE FISCALE copiato!
                </span>
            </div>
        </>
    )
}