// import { useState } from 'react';
// import authService from '../authService';
// import LoginButton from './LoginButton';
// import LogoutButton from './LogoutButton';
import LoginButton from './login-btn';

function Header() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [username, setUsername] = useState("");

    // authService.getUser().then((user) => {
    //     if (user && !user.expired) {
    //         setIsLoggedIn(true);
    //         setUsername(user.profile.name || "");
    //     }
    // });

    return (
        <nav className="Page-container LoginBar">
            <LoginButton/>
            {/* {isLoggedIn ? <LogoutButton username={username} /> : <LoginButton />} */}
        </nav>
    );
}

export default Header;