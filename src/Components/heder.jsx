import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <NavLink to="/">Main</NavLink>
      <NavLink to="/home">Admin</NavLink>
      <NavLink to="/login">Login</NavLink>
    </header>
  );
};
export default Header;
