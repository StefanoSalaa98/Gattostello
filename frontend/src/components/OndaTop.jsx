export default function OndaTop(props) {

    const { colore, sfondo } = props

    return (

        <div className={`wave-wrapper ${sfondo}`}>

            {/* viewBox --> l’area interna del disegno: parte da (0,0), larghezza 1440, altezza 120 */}
            <svg viewBox="0 0 1440 120" className="wave-top">
                <path
                    d="M0,64L80,80C160,96,320,128,480,117C640,107,800,53,960,48C1120,43,1280,85,1440,106L1440,0L0,0Z"
                    fill={colore}
                />
            </svg>

        </div >
    );
}