export default function OndaBottom(props) {

    const { colore, sfondo } = props

    return (

        <div className={`wave-wrapper ${sfondo}`}>

            <svg viewBox="0 0 1440 120" className="wave-bottom">
                <path
                    d="M0,64L80,80C160,96,320,128,480,117C640,107,800,53,960,48C1120,43,1280,85,1440,106L1440,120L0,120Z"
                    fill={colore}
                />
            </svg>

        </div>
    );
}