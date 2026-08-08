import axios from "axios";
import { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import { Italian } from "flatpickr/dist/l10n/it.js";
import "flatpickr/dist/flatpickr.min.css";
import { useGlobal } from "../contexts/GlobalContext";
import "../css/VolunteerForm.css";

export default function VolunteerForm() {

    const { setIsLoading } = useGlobal();

    const dateInputRef = useRef(null);

    const MAIL_VOLUNTEER_URL = import.meta.env.VITE_MAIL_VOLUNTEER_URL;

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null
    });

    const [formData, setFormData] = useState({
        nome: "",
        cognome: "",
        data_nascita: "",
        comune_residenza: "",
        telefono: "",
        email: "",
        esperienza_gatti: "",
        disponibilita_settimanale: "",
        orario: "",
        come_aiutare: [],
        motivazione: ""
    });

    useEffect(() => {

        if (!dateInputRef.current) return;

        const picker = flatpickr(dateInputRef.current, {
            locale: Italian,

            dateFormat: "d/m/Y",

            // Disabilita il calendario nativo del telefono
            disableMobile: true,

            // Non permette date future
            maxDate: "today",

            allowInput: false,

            onReady: (selectedDates, dateStr, instance) => {
                instance.jumpToDate(new Date(2000, 0, 1));
            },

            onChange: (selectedDates) => {

                if (selectedDates.length > 0) {

                    const data = selectedDates[0];

                    const anno = data.getFullYear();
                    const mese = String(data.getMonth() + 1).padStart(2, "0");
                    const giorno = String(data.getDate()).padStart(2, "0");

                    setFormData(prev => ({
                        ...prev,
                        data_nascita: `${anno}-${mese}-${giorno}`
                    }));
                }
            }
        });

        return () => {
            picker.destroy();
        };

    }, []);

    const [fieldErrors, setFieldErrors] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleCheckboxChange = (e) => {

        const { value, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            come_aiutare: checked
                ? [...prev.come_aiutare, value]
                : prev.come_aiutare.filter(item => item !== value)
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setIsLoading(true);

        setStatus({
            loading: true,
            success: false,
            error: null
        });

        setFieldErrors({});

        try {

            await axios.post(
                MAIL_VOLUNTEER_URL,
                formData
            );

            setStatus({
                loading: false,
                success: true,
                error: null
            });

            setFormData({
                nome: "",
                cognome: "",
                data_nascita: "",
                comune_residenza: "",
                telefono: "",
                email: "",
                esperienza_gatti: "",
                disponibilita_settimanale: "",
                orario: "",
                come_aiutare: [],
                motivazione: ""
            });

        } catch (err) {

            console.log("Errore completo:", err);
            console.log("Response:", err.response);
            console.log("Data:", err.response?.data);

            if (err.response?.status === 422) {

                setFieldErrors(err.response.data.errors);

                setStatus({
                    loading: false,
                    success: false,
                    error: ["Controlla i campi evidenziati."]
                });

            } else {

                let messaggioErrore = "Si è verificato un errore durante l'invio della richiesta.";

                if (err.response?.data?.message) {
                    messaggioErrore = err.response.data.message;
                }

                setStatus({
                    loading: false,
                    success: false,
                    error: [messaggioErrore]
                });

            }

        } finally {

            setIsLoading(false);

        }

    };

    if (status.success) {
        return (

            <div className="form-ricevuta-wrapper">

                <div
                    className="success-card"
                    style={{
                        textAlign: "center",
                        padding: "40px",
                        background: "#f0fff0",
                        borderRadius: "15px",
                        border: "2px dashed #4caf50"
                    }}
                >

                    <h3>
                        🐾 Richiesta inviata!
                    </h3>

                    <p>
                        Grazie per esserti candidato come volontario del Gattostello.
                    </p>

                    <p>
                        Ti contatteremo appena possibile.
                    </p>

                </div>

            </div>

        );
    }


    return (

        <form
            className="volunteer-form"
            onSubmit={handleSubmit}
        >

            <h2>
                Diventa volontario
            </h2>

            <p>
                Compila il modulo per entrare a far parte dei volontari del Gattostello.
            </p>

            <p>
                I campi contrassegnati con * sono obbligatori.
            </p>

            <div className="form-row">

                <div className="form-group">

                    <label>
                        Nome *
                    </label>

                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className={fieldErrors.nome ? "input-error" : ""}
                    />

                </div>

                <div className="form-group">

                    <label>
                        Cognome *
                    </label>

                    <input
                        type="text"
                        name="cognome"
                        value={formData.cognome}
                        onChange={handleChange}
                        className={fieldErrors.cognome ? "input-error" : ""}
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

                    <label>
                        Data di nascita *
                    </label>

                    <input
                        ref={dateInputRef}
                        type="text"
                        name="data_nascita"
                        placeholder="Seleziona la data"
                        readOnly
                    />

                </div>

                <div className="form-group">

                    <label>
                        Comune di residenza *
                    </label>

                    <input
                        type="text"
                        name="comune_residenza"
                        value={formData.comune_residenza}
                        onChange={handleChange}
                        className={fieldErrors.comune_residenza ? "input-error" : ""}
                    />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group">

                    <label>
                        Numero di telefono *
                    </label>

                    <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className={fieldErrors.telefono ? "input-error" : ""}
                    />

                </div>

                <div className="form-group">

                    <label>
                        Email *
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={fieldErrors.email ? "input-error" : ""}
                    />

                </div>

            </div>

            <div className="form-section">

                <label>
                    Hai esperienza con gatti? *
                </label>

                <div className="radio-group">

                    <label>

                        <input
                            type="radio"
                            name="esperienza_gatti"
                            value="1"
                            checked={formData.esperienza_gatti === "1"}
                            onChange={handleChange}
                        />

                        Sì

                    </label>

                    <label>

                        <input
                            type="radio"
                            name="esperienza_gatti"
                            value="0"
                            checked={formData.esperienza_gatti === "0"}
                            onChange={handleChange}
                        />

                        No

                    </label>

                </div>

            </div>


            <div className="form-section">

                <label>
                    Quante volte saresti disponibile settimanalmente? *
                </label>

                <select
                    name="disponibilita_settimanale"
                    value={formData.disponibilita_settimanale}
                    onChange={handleChange}
                    className={fieldErrors.disponibilita_settimanale ? "input-error" : ""}
                >

                    <option value="">Seleziona</option>
                    <option value="1">1 volta</option>
                    <option value="2">2 volte</option>
                    <option value="3">3 volte</option>
                    <option value="4">4 volte</option>
                    <option value="5">5 volte</option>

                </select>

            </div>


            <div className="form-section">

                <label>
                    In quali orari? *
                </label>

                <label>

                    <input
                        type="radio"
                        name="orario"
                        value="mattina"
                        checked={formData.orario === "mattina"}
                        onChange={handleChange}
                    />

                    Mattina 8/8.30 fino a fine turno

                </label>

                <label>

                    <input
                        type="radio"
                        name="orario"
                        value="pomeriggio"
                        checked={formData.orario === "pomeriggio"}
                        onChange={handleChange}
                    />

                    Pomeriggio 17.15/17.30 fino a fine turno

                </label>

                <label>

                    <input
                        type="radio"
                        name="orario"
                        value="indifferente"
                        checked={formData.orario === "indifferente"}
                        onChange={handleChange}
                    />

                    Indifferente

                </label>

            </div>


            <div className="form-section">

                <label>
                    Come ti piacerebbe aiutarci? *
                </label>

                {
                    [
                        ["cura_gatti", "Cura dei gatti e pulizie"],
                        ["trasporti", "Trasporti"],
                        ["raccolte_pappe", "Raccolte pappe"],
                        ["eventi", "Eventi"],
                        ["social_media", "Social media"],
                        ["dove_serve", "Dove c'è bisogno"]
                    ].map(([value, label]) => (

                        <label key={value}>

                            <input
                                type="checkbox"
                                value={value}
                                checked={formData.come_aiutare.includes(value)}
                                onChange={handleCheckboxChange}
                            />

                            {label}

                        </label>

                    ))
                }

            </div>


            <div className="form-section">

                <label>
                    Raccontaci qualcosa di te e del motivo per cui vorresti diventare volontario *
                </label>

                <textarea
                    name="motivazione"
                    rows="6"
                    value={formData.motivazione}
                    onChange={handleChange}
                    className={fieldErrors.motivazione ? "input-error" : ""}
                />

            </div>


            <button
                type="submit"
                disabled={status.loading}
            >

                {
                    status.loading
                        ? "Invio in corso..."
                        : "Invia richiesta"
                }

            </button>


            {
                status.error &&

                <ul className="elenco-errori">

                    {
                        status.error.map((errore, index) => (

                            <li key={index}>
                                {errore}
                            </li>

                        ))
                    }

                </ul>
            }

        </form>

    );

}
