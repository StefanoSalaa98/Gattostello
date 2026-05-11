import React, { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Repelling({ children, strength = 0.15, isDisabled = false }) {
    // Valori di movimento per la posizione target
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Configurazione della molla per un movimento fluido e "organico"
    const springConfig = { stiffness: 120, damping: 20, mass: 0.5 };
    const translateX = useSpring(mouseX, springConfig);
    const translateY = useSpring(mouseY, springConfig);

    // Stato per gestire la disattivazione su schermi piccoli (< 768px)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Funzione per controllare la larghezza dello schermo
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Controllo iniziale e aggiunta listener per il resize
        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        // Disabilito se:
        // 1. La prop isDisabled è true (burger menu aperto)
        // 2. Lo schermo è mobile (isMobile è true)
        if (isDisabled || isMobile) {
            mouseX.set(0);
            mouseY.set(0);
            return;
        }

        const handleMove = (x, y) => {
            const { innerWidth, innerHeight } = window;
            const centerX = innerWidth / 2;
            const centerY = innerHeight / 2;
            const distX = x - centerX;
            const distY = y - centerY;

            mouseX.set(distX * -strength);
            mouseY.set(distY * -strength);
        };

        const onMouseMove = (e) => handleMove(e.clientX, e.clientY);

        window.addEventListener("mousemove", onMouseMove);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            mouseX.set(0);
            mouseY.set(0);
        };
        // Aggiungiamo isMobile alle dipendenze
    }, [mouseX, mouseY, strength, isDisabled, isMobile]);

    return (
        <motion.div
            style={{
                display: "inline-block",
                x: translateX,
                y: translateY,
                willChange: "transform",
            }}
        >
            {children}
        </motion.div>
    );
}