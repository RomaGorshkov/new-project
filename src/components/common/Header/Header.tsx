import React from "react";

import { NavLink } from "react-router-dom";

import "./Header.css";

const Header: React.FC = () => {
  return (
    <nav>
      <NavLink to="/">Users</NavLink>
      <NavLink to="/users-edit">UsersEdit</NavLink>
    </nav>
  );
};

export default Header;
