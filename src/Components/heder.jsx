
import { NavLink } from 'react-router-dom';


const Header = () => {

    return (
        <header>
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/main">Main</NavLink>
            <NavLink to="/login">Login</NavLink>
        </header>

    )
}
export default Header;