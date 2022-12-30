import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <header>
      <Link to='/'>
        <img src='data:image/png;base64,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' alt="Icon showing group"/>
      </Link>
      <Link to={'/'}>
        <h1>Boxing Club</h1>
      </Link>
      <div className="login">
        <p>Welcome Player</p>
      </div>
    </header>
  )
}

export default Header;