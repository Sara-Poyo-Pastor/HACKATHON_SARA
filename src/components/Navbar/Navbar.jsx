import 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { useLocation } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';

function Navbar() {
    const location = useLocation().pathname;
    const token = localStorage.getItem('token');

    console.log('Token:', token);
    console.log('Location:', location);

    return (
        <nav className="navbar">
            {token && location.toLowerCase() !== '/login' ? (
                <>
                    <img className='navbarLogo' src={logo} alt="Logo" />
                    {(location !== '/registration' && location !== '/' && location !== '/privacyterms') && <Avatar className='avatar' />}
                </>
            ) : (
                <img className='navbarLogo' src={logo} alt="Logo" />
            )}
        </nav>
    );
}

export default Navbar;