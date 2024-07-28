// Box(Con)tainer.jsx
import { CSSProperties } from 'hono/jsx';
import ThemeSwitcher from '../islands/ThemeSwitcher';
import RefreshBtn from '../islands/RefreshBtn';
import Footer from '../islands/Footer';
import ShortenHeader from '../islands/ShortenHeader';

interface BoxContainerProps {
    children: any;
    color?: string;
    color2?: string;
    style?: CSSProperties;
    shead?: boolean;
};

const BoxContainer = (props: BoxContainerProps) => {
    const stopColor1 = props.color ? props.color : "var(--accent)";
    const stopColor2 = props.color2 ? props.color2 : props.color ? props.color : "var(--primary)";
    const shead = props.shead ? true : false;
    return (
        <>
            <svg viewBox="0 0 200 200" version="1.1" id="background" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
                <defs id="defs1">
                    <linearGradient id="swatch1334">
                    <stop style={`stop-color:${stopColor1};stop-opacity:1;`} offset="0" id="stop1334" />
                    <stop style={`stop-color:${stopColor2};stop-opacity:1;`} offset="1" id="stop1335" />
                    </linearGradient>
                    <radialGradient xlink:href="#swatch1334" id="radialGradient1335" cx="10.428646" cy="10.147052" fx="10.428646" fy="10.147052" r="62.105072"  gradientTransform="matrix(-0.89370629,-0.32461619,0.16943097,-0.46646325,18.029566,18.393963)" gradientUnits="userSpaceOnUse" />
                </defs>
                <path fill="#000000" d="M22.2,-27.6C32,-32.8,45.4,-33.4,45.6,-28C45.8,-22.6,32.7,-11.3,34.7,1.1C36.6,13.6,53.6,27.2,52.4,30.7C51.1,34.3,31.7,27.8,20,32.8C8.2,37.8,4.1,54.2,0.8,52.8C-2.4,51.3,-4.9,32,-7.4,21.7C-10,11.4,-12.7,10.1,-26.8,8C-41,5.9,-66.5,3,-71,-2.6C-75.5,-8.1,-58.9,-16.3,-43.6,-16.4C-28.3,-16.4,-14.3,-8.5,-7.2,-4.8C-0.2,-1.2,-0.1,-1.9,3.1,-7.2C6.2,-12.5,12.4,-22.4,22.2,-27.6Z" id="path1" style="fill:url(#radialGradient1335);fill-opacity:1" transform="translate(100 100)" />
            </svg>
            <div className="container">
                <ThemeSwitcher />
                <Footer branch="next" />
                <RefreshBtn />
            </div>
            <div className="boxes" style={props.style}>
                {shead ? <ShortenHeader /> : null}
                {props.children}
            </div>
        </>
    );
};

export default BoxContainer;