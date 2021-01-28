import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "Utensiline",
  className = "container-fluid bg-dark text-white p-4 main_body",
  children,
}) => {
  return (
    <div>
      <nav className="navbar sticky-top navbar-dark bg-custom text-white text-center">
          <span className="navbar-brand font-weight-bold">{title}</span>
          <Menu />
      </nav>
      <div className={className}>{children}</div>
      <footer className="footer bg-custom mt-auto pt-3">
        <div className="container-fluid text-white py-3">
          <div className="row">
            <div className="col-5 text-center">
              <h4>If you got any queries, reach me out at utensiline@gmail.com</h4>
            </div>
            <div className="col-2"></div>
            <div className="col-5">
                <div className="row"><button className="btn btn-warning btn-lg">Contact Us</button></div>
                <div className="row">
                <span className="text-warning font-weight-bold">
                    An online utensil store by the manufacturers of Jagadhri, India
                </span>
                </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Base;
