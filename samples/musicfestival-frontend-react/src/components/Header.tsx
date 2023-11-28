import { useEffect, useState } from 'react';
import authService from '../authService';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        authService.getUser().then((user) => {
            if(user && user.expired) {
                authService.refreshAccessToken().then((_) => {
                    authService.getUser().then((_user) => { user = _user })
                })
            }

            if (user && !user.expired) {
                setIsLoggedIn(true);
                setUsername(user.profile.name || "");
            }
        });
    }, [])

    return (
        <nav className="Page-container LoginBar">
            {isLoggedIn ? <LogoutButton username={username} /> : <LoginButton />}
        </nav>
    );
}

export default Header;
