// Box(Con)tainer.jsx

import { ReactNode, CSSProperties } from 'react';

interface BoxContainerProps {
    children: any;
    color?: string;
    style?: CSSProperties;
}

const BoxContainer = (props: BoxContainerProps) => {
    const pathColor = props.color ? props.color : "var(--secondary)";
    return (
        <>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill={pathColor} d="M22.2,-27.6C32,-32.8,45.4,-33.4,45.6,-28C45.8,-22.6,32.7,-11.3,34.7,1.1C36.6,13.6,53.6,27.2,52.4,30.7C51.1,34.3,31.7,27.8,20,32.8C8.2,37.8,4.1,54.2,0.8,52.8C-2.4,51.3,-4.9,32,-7.4,21.7C-10,11.4,-12.7,10.1,-26.8,8C-41,5.9,-66.5,3,-71,-2.6C-75.5,-8.1,-58.9,-16.3,-43.6,-16.4C-28.3,-16.4,-14.3,-8.5,-7.2,-4.8C-0.2,-1.2,-0.1,-1.9,3.1,-7.2C6.2,-12.5,12.4,-22.4,22.2,-27.6Z" transform="translate(100 100)" />
            </svg>
            <div className="boxes" style={props.style}> 
                {props.children}
            </div>
        </>
    );
};

export default BoxContainer;