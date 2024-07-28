function UserInfo() {
    return (
        <svg className="hsvg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" strokeWidth="1.5" color="#000" viewBox="0 0 24 24">
            <path stroke="var(--text)" strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"></path>
            <path stroke="var(--text)" strokeLinecap="round" strokeLinejoin="round" d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z"></path>
        </svg>
    );
}

function Links() {
    return (
        <svg className="hsvg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" strokeWidth="1.5" color="#000" viewBox="0 0 24 24">
            <path fill="#000" stroke="var(--text)" strokeLinecap="round" strokeLinejoin="round" d="M12 17a1 1 0 100-2 1 1 0 000 2z"></path>
            <path stroke="var(--text)" strokeLinecap="round" strokeLinejoin="round" d="M21 7.353v9.294a.6.6 0 01-.309.525l-8.4 4.666a.6.6 0 01-.582 0l-8.4-4.666A.6.6 0 013 16.647V7.353a.6.6 0 01.309-.524l8.4-4.667a.6.6 0 01.582 0l8.4 4.667a.6.6 0 01.309.524z"></path>
            <path stroke="var(--text)" strokeLinecap="round" strokeLinejoin="round" d="M20.5 16.722l-8.209-4.56a.6.6 0 00-.582 0L3.5 16.722M3.528 7.294l8.18 4.544a.6.6 0 00.583 0l8.209-4.56M12 3v9M12 19.5V22"></path>
        </svg>
    );
}

export default async function ShortenHeader() {
    return (
        <div>
            <div className="header">
                <a href="/links">
                    <Links />
                    Home
                </a>
                <a href="/me">
                    <UserInfo />
                    Account
                </a>
            </div>
        </div>
    );
}
