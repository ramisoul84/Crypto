import { Outlet, Link } from "react-router-dom";
import "./nav.css";
const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/symmetric">Symmetric Crypto.</Link>
        </li>
        <li>
          <Link to="/asymmetric">Asymmetric Crypto.</Link>
        </li>
        <li>
          <Link to="/hash">Hash Functions.</Link>
        </li>
        <li>
          <Link to="/conv">Converters.</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <Outlet />
    </nav>
  );
};
export default Nav;
