
import authService from '../authService';

function LoginButton() {
  function login() {
    authService.login()
  }

  return (
    <button className="btn" onClick={login}>
      Login
    </button>
  );
}

export default LoginButton;