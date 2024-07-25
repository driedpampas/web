import { useEffect, useState } from "hono/jsx";
import './css/ThemeSwitcher.css';

function SunIcon() {
    return (
    <svg
        fill="none"
        strokeWidth="1.5"
        color="#000"
        viewBox="0 0 24 24"
    >
        <path
        stroke="var(--background)"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18a6 6 0 100-12 6 6 0 000 12zM22 12h1M12 2V1M12 23v-1M20 20l-1-1M20 4l-1 1M4 20l1-1M4 4l1 1M1 12h1"
        ></path>
    </svg>
)};

function MoonIcon() {
    return (
    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" color="#000">
        <path
            d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
            stroke="var(--text)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)};

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState("dark");
    const [Icon, setIcon] = useState(<MoonIcon />);

    useEffect(() => {
        switch (theme) {
            case "dark":
                document.documentElement.setAttribute("data-theme", "dark");
                setIcon(<MoonIcon />);
                break;
            case "light":
                document.documentElement.setAttribute("data-theme", "light");
                setIcon(<SunIcon />);
                break;
            case "system":
                try {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const systemTheme = prefersDark ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', systemTheme);
                    setIcon(prefersDark ? <MoonIcon /> : <SunIcon />);
                } catch (error) {
                    console.error('Error setting theme:', error);
                }
                break;
            default:
                break;
        }
    }, [theme]);

    const handleThemeChange = (newTheme: string | ((currentState: string) => string)) => {
        setTheme(newTheme);
    };

    return (
        <div className="theme-switcher">
            <button className="theme-button">
                <div className="theme-icon">
                    {Icon}
                </div>
                <div className="theme-menu">
                    <p onClick={() => handleThemeChange("dark")}>Dark</p>
                    <p onClick={() => handleThemeChange("light")}>Light</p>
                    <p onClick={() => handleThemeChange("system")}>System</p>
                </div>
            </button>
        </div>
    );
}
