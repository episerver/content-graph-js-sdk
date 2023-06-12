import authService from '../authService';

function LogoutButton({ username }: any) {
  function logout() {
    authService.logout();
  }

  return (
    <button className="btn" onClick={logout}>
      {username},
      Logout
    </button>
  );
}

export default LogoutButton;