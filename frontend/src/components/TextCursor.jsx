import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdPaw } from "react-icons/io";
import "../css/TextCursor.css";

export default function TextCursor({
    text = <IoMdPaw />,
    spacing = 100,
    followMouseDirection = true,
    randomFloat = true,
    exitDuration = 0.3,
    removalInterval = 120,
    maxPoints = 8,
}) {
    // array di impronte
    const [trail, setTrail] = useState([]);
    // ultimo movimento
    const lastMoveTimeRef = useRef(Date.now());
    // generatore ID unici
    const idCounter = useRef(0);

    // funzione usata per aggiungere una impronta sia mouse desktop sia dito in trascinamento mobile
    const addTrailPoint = (x, y) => {
        // creo coordinate e rotazione randomiche
        const createRandomData = () =>
            randomFloat
                ? {
                    randomX: Math.random() * 10 - 5,
                    randomY: Math.random() * 10 - 5,
                    randomRotate: Math.random() * 10 - 5,
                }
                : {};

        // prendo lo stato precedente dell'array
        setTrail((prev) => {
            //  copio l'array
            const newTrail = [...prev];

            // Se l'array è vuoto, creo  la prima impronta
            if (newTrail.length === 0) {
                newTrail.push({
                    id: idCounter.current++,
                    x,
                    y,
                    angle: 0,
                    ...createRandomData(),
                });
            } else {
                // prendo l'ultima impronta
                const last = newTrail[newTrail.length - 1];
                const dx = x - last.x;
                const dy = y - last.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance >= spacing) {
                    const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
                    const angle = followMouseDirection ? rawAngle : 0;
                    const steps = Math.floor(distance / spacing);

                    for (let i = 1; i <= steps; i++) {
                        const t = (spacing * i) / distance;

                        newTrail.push({
                            id: idCounter.current++,
                            x: last.x + dx * t,
                            y: last.y + dy * t,
                            angle,
                            ...createRandomData(),
                        });
                    }
                }
            }

            // controllo per non superare il numero massimo di impronte
            return newTrail.length > maxPoints
                ? newTrail.slice(newTrail.length - maxPoints)
                : newTrail;
        });

        // aggiorno ultimo movimento
        lastMoveTimeRef.current = Date.now();
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            addTrailPoint(e.clientX, e.clientY);
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            if (!touch) return;
            addTrailPoint(touch.clientX, touch.clientY);
        };

        const handleTouchStamp = (e) => {
            const touch = e.changedTouches[0];
            if (!touch) return;

            setTrail((prev) =>
                [
                    ...prev,
                    {
                        id: idCounter.current++,
                        x: touch.clientX,
                        y: touch.clientY,
                        angle: idCounter.current % 2 ? -12 : 12,
                        randomX: 0,
                        randomY: 0,
                        randomRotate: 0,
                    },
                ].slice(-maxPoints)
            );

            lastMoveTimeRef.current = Date.now();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchstart', handleTouchStamp, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchStamp);
        };
    }, [spacing, followMouseDirection, randomFloat, maxPoints]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastMoveTimeRef.current > 1400) {
                setTrail((prev) => (prev.length ? prev.slice(1) : prev));
            }
        }, removalInterval);

        return () => clearInterval(interval);
    }, [removalInterval]);

    return (
        <div className="text-cursor-container">
            <AnimatePresence>
                {trail.map((item) => (
                    <motion.div
                        key={item.id}
                        className="text-cursor-item"
                        style={{ left: item.x, top: item.y }}
                        initial={{ opacity: 0, scale: 1, rotate: item.angle }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: randomFloat ? [0, item.randomX, 0] : 0,
                            y: randomFloat ? [0, item.randomY, 0] : 0,
                            rotate: randomFloat
                                ? [item.angle, item.angle + item.randomRotate, item.angle]
                                : item.angle,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.6,
                            rotate: item.angle + 10,
                        }}
                        transition={{
                            opacity: { duration: exitDuration },
                            ...(randomFloat && {
                                x: { duration: 2, repeat: Infinity, repeatType: 'mirror' },
                                y: { duration: 2, repeat: Infinity, repeatType: 'mirror' },
                                rotate: { duration: 2, repeat: Infinity, repeatType: 'mirror' },
                            }),
                        }}
                    >
                        {text}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
