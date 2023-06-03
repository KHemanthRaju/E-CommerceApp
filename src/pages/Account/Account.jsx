import { NavLink, Outlet } from "react-router-dom";
import "./Account.css";

export function Account() {
  return (
    <div className="account-container">
      <div className="modal">
        <div className="modal__actions">
          <NavLink to="profile">Profile</NavLink>
          <NavLink to="address">Address</NavLink>
        </div>
        <div className="modal-info">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
