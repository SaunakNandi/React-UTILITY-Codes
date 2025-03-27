import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from './context/ThemeContext'

const Navbar = () => {
    const {theme,toggleTheme}=useContext(ThemeContext)

  return (
    <nav>
        <div>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/blog'>Blog</Link>
        </div>
        <div className="mode-switch">
            <label>
                <input type="checkbox" onChange={toggleTheme} checked={theme==="dark"}/>
                <span className='slider round'></span>
            </label>
        </div>
    </nav>
  )
}

export default Navbar