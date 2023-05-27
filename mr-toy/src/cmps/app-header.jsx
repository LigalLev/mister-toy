import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/img/logobear.png'

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
    }
    const isOpen = (isMenuOpen) ? 'menu-open' : ''
    return (
        <header className="app-header full ">
            <div className="nav-container flex">
                <Link to="/">  <img src={logo} alt="" /></Link>
                <nav className={isOpen}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <button className="hamburger-btn btn-menu" onClick={() => toggleMenu()}>☰</button>
                </nav>
            </div>
        </header >
    )
}

