import axios from "axios";
import { useState } from "react";
import AnimateOnScroll from "../hooks/AnimateOnScroll";
import "../css/Ricevuta.css";

export default function Ricevuta() {

    const [status, setStatus] = useState({ loading: false, success: false, error: null });
    // status è un'oggetto con tre proprietà:
    // loading: false: Indica se la chiamata al server è in corso
    // success: false: Indica se l'operazione è andata a buon fine
    // error: null: Se il server risponde con un errore, salvo qui il messaggio

    const [fieldErrors, setFieldErrors] = useState({});
    // variabile di stato che contiene i campi errati

    const MAIL_URL = import.meta.env.VITE_MAIL_URL;

    console.log("Variabili env:", import.meta.env);
    console.log("MAIL_URL:", MAIL_URL);

    const [formData, setFormData] = useState({
        cognome: "",
        nome: "",
        cap: "",
        cf: "",
        via: "",
        civico: "",
        citta: "",
        email: "",
        importo: "",
        messaggio: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (name === "cf") {
            // Forzo tutto in MAIUSCOLO
            // Rimuovo eventuali spazi vuoti
            finalValue = value.toUpperCase().replace(/\s/g, "");
        }

        setFormData({ ...formData, [name]: finalValue });
    };

    // funzione che si occupa della validazione del form
    const isFormValid = () => {

        let erroriVisivi = {}; // Oggetto temporaneo per raccogliere gli errori
        let messaggiErrore = []; // Array che conterrà l'elenco degli errori

        const regexCap = /^[0-9]{5}$/;

        // VALIDAZIONE EMAIL
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            erroriVisivi.email = true;
            messaggiErrore.push("L'email è obbligatoria.");
        } else if (!regexEmail.test(formData.email)) {
            erroriVisivi.email = true;
            messaggiErrore.push("L'indirizzo email non è valido (es: nome@esempio.it).");
        }

        // VALIDAZIONE CODICE FISCALE
        // Controlla che siano 16 caratteri alfanumerici
        const regexCF = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i;
        if (!formData.cf) {
            erroriVisivi.cf = true;
            messaggiErrore.push("Il Codice Fiscale è obbligatorio per la ricevuta.");
        } else if (formData.cf.length !== 16) {
            erroriVisivi.cf = true;
            messaggiErrore.push("Il Codice Fiscale deve essere di esattamente 16 caratteri.");
        } else if (!regexCF.test(formData.cf)) {
            erroriVisivi.cf = true;
            messaggiErrore.push("Il formato del Codice Fiscale non è corretto.");
        }

        if (formData.via.length < 3) {
            erroriVisivi.via = true;
            messaggiErrore.push("Il nome della via è troppo corto.");
        }
        if (formData.civico.length === 0) {
            erroriVisivi.civico = true;
            messaggiErrore.push("Il numero civico è obbligatorio.");
        }
        if (!regexCap.test(formData.cap)) {
            erroriVisivi.cap = true;
            messaggiErrore.push("Il CAP deve essere di 5 cifre numeriche.");
        }

        setFieldErrors(erroriVisivi); // Aggiorno lo stato campi errati

        if (messaggiErrore.length > 0) {
            // Salvo l'intero array nello stato status.error
            setStatus({ ...status, error: messaggiErrore });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Se il form non è valido esco e non procedo con l'invio
        if (!isFormValid()) return;

        // Attivo lo stato di caricamento e azzero errori precedenti
        setStatus({ loading: true, success: false, error: null });

        try {
            // Effettuo la chiamata POST verso l'API di Laravel
            const response = await axios.post(`${MAIL_URL}`, formData);

            // Se tutto va bene, imposto il successo
            setStatus({ loading: false, success: true, error: null });

            // Svuoto il form per sicurezza
            setFormData({
                cognome: "", nome: "", cap: "", cf: "", via: "",
                civico: "", citta: "", email: "", importo: "", messaggio: ""
            });

        } catch (err) {
            // Gestione degli errori provenienti dal server (es. validazione Laravel fallita o server spento)
            let messaggioErroreServer = "Si è verificato un errore di rete. Riprova più tardi.";

            if (err.response && err.response.data) {
                // Se Laravel ci restituisce un errore di validazione (422) o altro messaggio specifico
                messaggioErroreServer = err.response.data.message || "Errore nell'invio dei dati.";
            }

            setStatus({
                loading: false,
                success: false,
                error: [messaggioErroreServer] // Lo salvo come array per mantenerlo coerente con il .map() nel mio JSX
            });
        }
    };

    // SCHERMATA DI SUCCESSO
    // Se l'invio va a buon fine, mostro questo box al posto del form
    if (status.success) {
        return (
            <div className="form-ricevuta-wrapper">
                <AnimateOnScroll animation="fade-up">
                    <div className="success-card" style={{ textAlign: "center", padding: "40px", background: "#f0fff0", borderRadius: "15px", border: "2px dashed #4caf50" }}>
                        <h3>🐾 Richiesta Inviata!</h3>
                        <p>I dati sono stati registrati nei sistemi del Gattostello e abbiamo inviato la mail di riepilogo ai volontari.</p>
                        <p>Riceverai la tua ricevuta fiscale non appena avremo verificato il versamento. Grazie per il tuo grande cuore!</p>
                        <button
                            onClick={() => setStatus({ loading: false, success: false, error: null })}
                            style={{ marginTop: "20px", padding: "10px 20px", borderRadius: "20px", cursor: "pointer" }}
                        >
                            Invia un'altra richiesta
                        </button>
                    </div>
                </AnimateOnScroll>
            </div>
        );
    }

    return (
        <>
            <div className="form-ricevuta-wrapper">
                <AnimateOnScroll animation="fade-up">
                    <form className="form-ricevuta" onSubmit={handleSubmit}>
                        <h3>Richiedi Ricevuta Fiscale</h3>
                        <p>Inserisci i tuoi dati per ricevere la certificazione della tua donazione.</p>
                        <p>I campi con * sono obbligatori.</p>

                        <input
                            type="text"
                            name="cognome"
                            placeholder="Cognome*"
                            value={formData.cognome}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome*"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="La tua Email*"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={fieldErrors.email ? "input-error" : ""}
                        />
                        <input
                            type="text"
                            name="cf"
                            placeholder="Codice Fiscale*"
                            value={formData.cf}
                            onChange={handleChange}
                            required
                            maxLength="16"
                            className={fieldErrors.cf ? "input-error" : ""}
                        />
                        <input
                            type="text"
                            name="cap"
                            placeholder="CAP*"
                            value={formData.cap}
                            onChange={handleChange}
                            required
                            maxLength="5"
                            className={fieldErrors.cap ? "input-error" : ""}
                        />
                        <input
                            type="text"
                            name="citta"
                            placeholder="Città*"
                            value={formData.citta}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="via"
                            placeholder="Via / Piazza / Corso*"
                            value={formData.via}
                            onChange={handleChange}
                            className={fieldErrors.via ? "input-error" : ""}
                            required
                        />
                        <input
                            type="text"
                            name="civico"
                            placeholder="Civico*"
                            value={formData.civico}
                            onChange={handleChange}
                            className={fieldErrors.civico ? "input-error" : ""}
                            required
                        />
                        <input
                            type="number"
                            name="importo"
                            placeholder="Importo (€)"
                            min="0"
                            value={formData.importo}
                            onChange={handleChange}
                        />
                        <textarea
                            name="messaggio"
                            placeholder="Note aggiuntive (es. Tessera Socio)"
                            value={formData.messaggio}
                            onChange={handleChange}>
                        </textarea>

                        <button type="submit" disabled={status.loading}>
                            {status.loading ? "Invio in corso..." : "Invia Richiesta"}
                        </button>

                        {status.error &&
                            <ul className="elenco-errori">
                                {status.error.map((errore, index) => (
                                    <li key={index}>
                                        {errore}
                                    </li>
                                ))}
                            </ul>
                        }
                    </form>
                </AnimateOnScroll>
            </div>
        </>
    )
}