import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style.css';

const Header = props => {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li><NavLink to="/">View Employees</NavLink></li>
                        <li><NavLink to="/addEmployee">Add Employee</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;