import { useState } from "react";

export default function Iban() {

    const iban = "IT21F0832950860000000117546";
    const [copiato, setCopiato] = useState(false);

    const copiaIban = () => {
        navigator.clipboard.writeText(iban);
        setCopiato(true);

        setTimeout(() => setCopiato(false), 5000);
    };

    return (
        <>
            <div>
                <span className="iban"></span>
                <span
                    onClick={copiaIban}
                    className="iban-text"
                    title="Clicca per copiare"
                >
                    {iban}
                </span >
                <span className={`copiato-msg ${copiato ? "show" : ""}`}>
                    IBAN copiato!
                </span>
            </div>
        </>
    )
}