import './css/Refresh.css'

function Reload() {
    return (
    <svg className="hsvg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" strokeWidth="1.5" color="#000" viewBox="0 0 24 24">
        <path stroke="var(--inverse)" strokeLinecap="round" d="M11 21H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v7"></path>
        <path stroke="var(--inverse)" strokeLinecap="round" strokeLinejoin="round" d="M2 7h20M5 5.01l.01-.011M8 5.01l.01-.011M11 5.01l.01-.011M21.666 16.667C21.049 15.097 19.636 14 17.99 14c-1.758 0-3.252 1.255-3.793 3"></path>
        <path stroke="var(--inverse)" strokeLinecap="round" strokeLinejoin="round" d="M19.995 16.772H21.4a.6.6 0 00.6-.6V14.55M14.334 19.333C14.953 20.903 16.366 22 18.01 22c1.758 0 3.252-1.255 3.793-3"></path>
        <path stroke="var(--inverse)" strokeLinecap="round" strokeLinejoin="round" d="M16.005 19.228H14.6a.6.6 0 00-.6.6v1.622"></path>
    </svg>
    );
}

export default function RefreshBtn() {
    return (
        <button className="refresh" onClick={() => window.location.reload()}>
            <p>
                <Reload />
            </p>
        </button>
    );
};