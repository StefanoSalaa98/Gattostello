import { FaArrowUp } from "react-icons/fa";
import AnimateOnScroll from "../hooks/AnimateOnScroll";

export default function Seleziona() {
    return (
        <>
            <AnimateOnScroll>
                <div className="seleziona">
                    <FaArrowUp className="arrow" />
                    <FaArrowUp className="arrow" />
                    <FaArrowUp className="arrow" />
                    <h3>Seleziona un'opzione </h3>
                </div>
            </AnimateOnScroll>
        </>
    )
}