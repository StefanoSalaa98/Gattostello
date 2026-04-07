import { useInView } from "react-intersection-observer";
import "../css/animations.css";



export default function AnimateOnScroll({
    children,
    animation = "fade-up",
    delay = 0,
}) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
        rootMargin: "0px 0px -150px 0px",
    });

    return (
        <div
            ref={ref}
            className={`scroll-base ${inView ? animation : ""}`}
            style={{ animationDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
}