import { useEffect, useState } from 'hono/jsx';
import './css/Footer.css';

interface FooterProps {
    branch: string;
}

function SpinnerIcon() {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" display="block" preserveAspectRatio="xMidYMid" viewBox="0 0 100 100" style={{ background: "transparent" }} shapeRendering="auto" version="1.1">
        <g fill="var(--accent)" fillOpacity="1">
            <g>
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="-0.40381791483113066s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
            <g transform="rotate(30 50 50)">
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="-0.36710719530102787s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
            <g transform="rotate(60 50 50)">
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="-0.33039647577092507s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
            <g transform="rotate(90 50 50)">
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="-0.29368575624082227s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
            <g transform="rotate(120 50 50)">
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="-0.25697503671071953s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
            <g transform="rotate(150 50 50)">
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="-0.22026431718061673s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
            <g transform="rotate(180 50 50)">
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="-0.18355359765051393s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
            <g transform="rotate(210 50 50)">
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="-0.14684287812041114s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
            <g transform="rotate(240 50 50)">
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="-0.11013215859030837s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
            <g transform="rotate(270 50 50)">
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="-0.07342143906020557s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
            <g transform="rotate(300 50 50)">
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="-0.036710719530102784s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
            <g transform="rotate(330 50 50)">
            <rect width="3" height="26" x="48.5" y="10" fill="var(--accent)" fillOpacity="1" rx="1.5" ry="5.72">
                <animate attributeName="opacity" begin="0s" dur="0.44052863436123346s" keyTimes="0;1" repeatCount="indefinite" values="1;0"></animate>
            </rect>
            </g>
        </g>
    </svg>
  );
}

const Footer = ({ branch }: FooterProps) => {
    const [commitId, setCommitId] = useState('');
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchCommitId = async () => {
            try {
                const response = await fetch(`https://api.github.com/repos/driedpampas/web/commits?sha=${branch}`);
                const data: { sha: string }[] = await response.json();
                const latestCommitId = data[0].sha;
                setCommitId(latestCommitId.substring(0, 6));
            } catch (error) {
                console.error('Error fetching commit ID:', error);
                setHasError(true);
                return;
            } finally {
                setLoading(false);
            }
        };

        fetchCommitId();
    }, [branch]);

    if (hasError) {
        return null;
    }

    return (
        <footer>
            Version {loading ? (
                <SpinnerIcon />
            ) : (
                <pre>{commitId}</pre>
            )}
        </footer>
    );
};

export default Footer;