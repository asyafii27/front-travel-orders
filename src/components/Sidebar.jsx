import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    // <!-- ======= Sidebar ======= -->
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link ">
            <Link to="/dashboard">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </a>
        </li>
        {/* <!-- End Dashboard Nav --> */}

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-menu-button-wide"></i>
            <span>Passangers</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="components-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/passanger">
                <i className="bi bi-circle"></i>
                <span>Data Penumpang</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* <!-- End Components Nav --> */}

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#forms-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-journal-text"></i>
            <span>Schedules</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="forms-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/travel-schedule">
                <i className="bi bi-circle"></i>
                <span>Jadwal Perjalanan</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* <!-- End Forms Nav --> */}

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Orders</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="tables-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="tables-general.html">
                <i className="bi bi-circle"></i>
                <span>Ticket</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#setting-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Settings</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="setting-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="tables-general.html">
                <i className="bi bi-circle"></i>
                <span>Profile</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
    // <!-- End Sidebar-->
  );
};

export default Sidebar;
