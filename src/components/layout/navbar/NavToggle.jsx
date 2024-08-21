import { HiBars3BottomRight } from 'react-icons/hi2';
import { IoCloseOutline } from 'react-icons/io5';

export default function NavToggleButton({ isNavOpen, toggle }) {
    return (
        <>
            {isNavOpen ? (
                <IoCloseOutline
                    className="cursor-pointer lg:hidden z-50"
                    onClick={toggle}
                    size={24}
                />
            ) : (
                <HiBars3BottomRight
                    className="cursor-pointer lg:hidden z-50"
                    onClick={toggle}
                    size={24}
                />
            )}
        </>
    );
}
