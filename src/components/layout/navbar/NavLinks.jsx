import { Link, useLocation } from 'react-router-dom';

export function NavLinks({ route, setIsNavOpen }) {
    const currentRoute = useLocation().pathname;

    const navLinkClass = `text-xs bg-gray-100 py-3 px-8 rounded-md transition-all duration-300 ease-in-out ${
        currentRoute === route.path && '!btn'
    }`;

    return (
        <>
            {route?.isButton ? (
                <Link to={route.path}>
                    <button className={navLinkClass}>Login</button>
                </Link>
            ) : (
                <li
                    className={navLinkClass}
                    onClick={() => setIsNavOpen(false)}
                >
                    <Link to={route.path}>{route.title}</Link>
                </li>
            )}
        </>
    );
}
