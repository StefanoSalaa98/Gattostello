import "../css/SkeletonCard.css"

export default function SkeletonCard() {
    return (
        <div className="gatto skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text small"></div>
        </div>
    );
}