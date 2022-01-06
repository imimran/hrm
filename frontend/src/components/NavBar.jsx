import React from "react";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            HR Management
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarToggleExternalContent"
          >
            <ul className="navbar-nav ">
              <li className="nav-item ">
                <a className="nav-link" href="/employee-list">
                  Employees
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/create-employee">
                  Add Employee
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/upload-file">
                  Upload
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
