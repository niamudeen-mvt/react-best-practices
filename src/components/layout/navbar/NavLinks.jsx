import { Link, useLocation } from "react-router-dom";

export function NavLinks({ route, setIsNavOpen }) {

  const currentRoute = useLocation().pathname

  return <li
    className={`text-xs hover:bg-gray-100 py-3 px-8 rounded-md transition-all duration-300 ease-in-out ${currentRoute === route.path ? 'bg-gray-100' : ''}`}
    onClick={() => setIsNavOpen(false)}
  >
    <Link to={route.path}>{route.title}</Link>
  </li>

}