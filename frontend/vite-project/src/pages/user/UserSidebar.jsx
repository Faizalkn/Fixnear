import { NavLink } from "react-router-dom";
import "./Dashboard.css";

const navigationItems = [
  { to: "/user/home", icon: "▦", label: "Dashboard" },
  { to: "/report-issue", icon: "＋", label: "Report Issues" },
  { to: "/my-issues", icon: "▤", label: "My Issues" },
  { to: "/advertisements", icon: "▧", label: "Donation with Ads" },
];

const UserSidebar = () => (
  <aside className="sidebar">
    <div className="brand">
      <div className="brand-icon">F</div>
      <h2>FixNear</h2>
    </div>

    <p className="menu-label">MENU</p>
    <nav className="navigation">
      {navigationItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>{item.icon}</span> {item.label}
        </NavLink>
      ))}
    </nav>

    <div className="sidebar-bottom">
      <div className="help-box">
        <h4>Need Help?</h4>
        <p>Contact our support team for assistance.</p>
        <button type="button">Contact Support</button>
      </div>
      <NavLink to="/profile" className="sidebar-profile-link">
        <span className="sidebar-avatar" aria-hidden="true">F</span>
        <span className="sidebar-profile-copy">
          <strong>Faizal</strong>
          <small>View profile</small>
        </span>
        <span className="sidebar-profile-arrow" aria-hidden="true">›</span>
      </NavLink>
      <p className="sidebar-footer">© 2026 FixNear</p>
    </div>
  </aside>
);

export default UserSidebar;
