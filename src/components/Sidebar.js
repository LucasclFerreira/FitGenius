import "./Sidebar.css";
import AddIcon from "../assets/add_icon.svg";
import DashboardIcon from "../assets/dashboard_icon.svg";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Avatar from "./Avatar";

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <>
      {user && (
        <div className="sidebar">
          <div className="sidebar-content">
            <div className="user">
              <Avatar />
              <p>Hey, {user.displayName}!</p>
            </div>
            <div className="links">
              <ul>
                <li>
                  <NavLink exact to="/">
                    <img src={DashboardIcon} alt="dashboard icon" />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/create">
                    <img src={AddIcon} alt="add icon" />
                    <span>New Workout</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
