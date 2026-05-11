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

        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;

            // 1. Troviamo il centro del viewport
            const centerX = innerWidth / 2;
            const centerY = innerHeight / 2;

            // 2. Calcoliamo la distanza del mouse dal centro
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;

            // 3. APPLICHIAMO LA DIREZIONE OPPOSTA
            // Moltiplicando per -strength, il testo si muove in direzione contraria al mouse
            mouseX.set(distX * -strength);
            mouseY.set(distY * -strength);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, strength, isDisabled]);

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
};