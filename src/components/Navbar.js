//styles
import "./Navbar.css";
import Dumbbell from "../assets/dumbbell_icon.svg";

// hooks
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// router
import { Link } from "react-router-dom";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Dumbbell} alt="dumbbell icon" />
          <span>FitGenius</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && user && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Loggin out...
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
