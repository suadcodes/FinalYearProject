import { NavLink } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  
  const getLinkStyle = ({ isActive }) => (isActive ? 'navSelected' : null );

  return (
    <nav>
       <div className="navItem">
        <NavLink to='/' className={getLinkStyle}>Home</NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/' className={getLinkStyle} >About</NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/Events' className={getLinkStyle} >Events</NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/' className={getLinkStyle} >Profile</NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/' className={getLinkStyle} >Logout</NavLink>
      </div>

    </nav>
  );
}
export default Navbar;