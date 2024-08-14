import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useWindowSize from '../../../hooks/useWindowSize';

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../../routes';

import useAuth from '../../../hooks/useAuth';
import { NavLinks } from './NavLinks';
import NavToggleButton from './NavToggle';

export default function Navbar() {
    const { isLoggedIn, handleLogout } = useAuth();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const windowSize = useWindowSize();

    const toggle = () => {
        setIsNavOpen((prev) => !prev);
    };

    useEffect(() => {
        if (windowSize.width > 1280) {
            setIsNavOpen(false);
        }
    }, [windowSize.width]);

    const NAV_MEUS = isLoggedIn ? PRIVATE_ROUTES : PUBLIC_ROUTES;

    return (
        <header className="shadow-sm sticky top-0 z-50 bg-white">
            <div className="custom_container flex_between h-20">
                <Link to="/">React Best Practices</Link>
                <nav
                    className={`flex_center  ${
                        !isNavOpen
                            ? 'hidden lg:block'
                            : 'fixed top-0 left-0 w-full h-full bg-white z-50'
                    }`}
                >
                    <ul
                        className={`flex_center gap-4 capitalize ${
                            isNavOpen ? 'flex-col' : ''
                        }`}
                    >
                        {NAV_MEUS?.map((route) => (
                            <NavLinks
                                key={route.id}
                                route={route}
                                setIsNavOpen={setIsNavOpen}
                            />
                        ))}

                        {isLoggedIn && (
                            <button className="btn" onClick={handleLogout}>
                                Logout
                            </button>
                        )}
                    </ul>
                </nav>
                <NavToggleButton isNavOpen={isNavOpen} toggle={toggle} />
            </div>
        </header>
    );
}
