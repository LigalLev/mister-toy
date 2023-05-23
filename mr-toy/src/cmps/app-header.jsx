
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service.js'


import { Link, NavLink } from 'react-router-dom'


export function AppHeader() {
   
    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
            </nav>
        </header>
    )
}

