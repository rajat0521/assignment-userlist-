import { auth } from "./firebase";

function Logout() {
  const handleLogout = () => {
    auth.signOut().then(() => {
      // Handle successful logout
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
