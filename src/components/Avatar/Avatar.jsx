import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Avatar.css';

function Avatar() {
    const BASE_URL = "http://localhost:8000";
    const relativeAvatarUrl = localStorage.getItem('user_avatar_url');
    const userAvatarUrl = BASE_URL + "/" + relativeAvatarUrl;
    const userName = localStorage.getItem('user_name');

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_avatar_url');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_id');
    };
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    return (
        <div className="avatar-container" onClick={toggleDropdown}>
            <img src={userAvatarUrl} alt="User Avatar" className="user-avatar"/>
            <div className="dropdown-menu">
                <span className='dduserName'><strong>{userName}</strong></span>
                <Link to='/History'><button className='ddButton'>Historial</button></Link>
                <Link to="/Login"><button onClick={handleLogout} className='ddButton'>Cerrar sesión</button></Link>
            </div>
        </div>
    );
}

export default Avatar;