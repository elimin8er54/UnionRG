import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <React.Fragment>
    
      <ul className="nav">
        <li>
          <NavLink to="/admin/deals">Deals </NavLink>
        </li>
      </ul>
     
    </React.Fragment>
  );
};

export default Header;