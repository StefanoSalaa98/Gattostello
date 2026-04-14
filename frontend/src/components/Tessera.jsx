import { useState } from "react";
import Iban from "./Iban";
import AnimateOnScroll from "../hooks/AnimateOnScroll";

export default function Tessera({ livello }) {

    const livelli =
    {
        giovanile:
            <>
                <h3 className="titolo-livello">Apprendista Dispensatore di Croccantini</h3>
                <p>
                    Piccolo contributo, grande cuore. Benvenuto nella tribù, entri ufficialmente nel grande club degli amici dei gatti. Ti sei meritato il titolo di {" "}
                    <strong> Apprendista Dispensatore di Croccantini. </strong>  {" "} Anche se le tue tasche sono leggere, il tuo cuore è colmo di amore felino. Sei la prova che non serve un tesoro per fare la differenza, basta rinunciare a un paio di gelati per garantire una manciata di croccantini extra a un micio bisognoso. Sei all'inizio del tuo percorso felino, come un gattino alle prime esplorazioni. Oggi socio giovanile, domani chissà, i gatti non dimenticano. Mai.
                </p>
            </>
        ,

        silver:
            <>
                <h3 className="titolo-livello">Cavaliere della Ciotola Piena</h3>
                <p>
                    Complimenti, hai ufficialmente varcato la soglia della nobiltà felina. Non sei più un semplice umano che pulisce lettiere, hai guadagnato il titolo di {" "}
                    <strong> Cavaliere della Ciotola Piena. </strong> {" "} Con la tua tessera Silver, i gatti hanno iniziato a guardarti con un briciolo di rispetto in più: ora, quando ti ignorano, lo fanno con classe. Hai dimostrato che il tuo cuore non è fatto di pietra, ma di una morbida pasta di pelo e fusa. Sei colui che assicura che la ciotola non veda mai il fondo. Grazie per aver scelto di essere la spalla su cui un micio può dormire (per poi svegliarti bruscamente alle 4 del mattino).
                </p>
            </>
        ,

        gold:
            <>
                <h3 className="titolo-livello">Iniziato del Gomitolo</h3>
                <p>
                    Qui si sale di livello. Con il livello Gold, non sei solo un donatore: sei un {" "}
                    <strong> Iniziato del Gomitolo. </strong> {" "} La tua generosità è tale che i gatti dell'associazione hanno indetto una riunione straordinaria per dichiararti ufficialmente 'Umano di serie A'. Grazie a te, le scatolette di paté diventano gourmet e le spese veterinarie non fanno più così paura. Ti sei guadagnato il diritto di avere i vestiti perennemente ricoperti di peli come segno di distinzione e onore. I gatti lo sanno, lo sentono. Forse non ti ringraziano apertamente, ma ti ignorano con grande rispetto.
                </p>
            </>
        ,

        platinum:
            <>
                <h3 className="titolo-livello">Venerabile Custode dell'Erba Gatta</h3>
                <p>
                    In piedi. Qui entriamo nel territorio del mito. Vieni nominato {" "}
                    <strong> Venerabile Custode dell'Erba Gatta. </strong> {" "} Con il livello Platinum, hai praticamente acquistato un posto d'onore nel Valhalla dei gatti. Tu non sostieni i gatti, li vizi. La tua generosità riecheggia tra le cucce. Grazie a te si salvano vite, si curano mici sfortunati e si affrontano emergenze con coraggio. Sei il mecenate che permette a ogni gatto di vivere come un imperatore romano, tra velluti, scatolette di prima scelta e visite veterinarie senza stress. Per noi sei un eroe, per i gatti sei la reincarnazione di una divinità egizia tornata sulla terra per portare abbondanza.
                </p>
            </>
    }

    function causale() {
        switch (livello) {
            case "giovanile": {
                return "Socio giovanile"
                break;
            }
            case "silver": {
                return "Socio ordinario 'Silver'"
                break;
            }
            case "gold": {
                return "Socio sostenitore 'Gold'"
                break;
            }
            case "platinum": {
                return "Socio benemerito 'Platinum'"
                break;
            }
            default:
                return "Stato sconosciuto";
        }
    }

    console.log("è di tipo: ", typeof (livello));

    return (
        <>
            <AnimateOnScroll>
                <div className="scelta">
                    {livelli[livello]}
                </div>

                <Iban />

                <div>
                    <span className="inserisci"> Inserici nella causale: </span>
                    <span className="causale"> Tessera {causale()}</span>
                </div>
            </AnimateOnScroll>
        </>
    )
}