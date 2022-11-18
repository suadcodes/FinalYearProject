import { NavLink } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  
  const getLinkStyle = ({ isActive }) => (isActive ? 'navSelected' : null );

  return (
    <nav>
       <div className="navItem">
        <NavLink to='/' className={getLinkStyle} exact>Home</NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/' className={getLinkStyle} exact>About</NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/Events' className={getLinkStyle} exact>Events</NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/' className={getLinkStyle} exact>Profile</NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/' className={getLinkStyle} exact>Logout</NavLink>
      </div>

    </nav>
  )
}
export default Navbar;