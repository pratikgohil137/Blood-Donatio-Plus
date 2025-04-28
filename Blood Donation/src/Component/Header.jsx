import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <NavLink to="/">
                    <img
                        src="https://www.shutterstock.com/image-vector/blood-drop-plus-heart-shape-600nw-2238094877.jpg"
                        alt="logo"
                    />
                </NavLink>
                <span>Blood Donation</span>
            </div>
            <nav className="nav">
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/register"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            Register
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/aboutus"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            About Us
                        </NavLink>
                    </li>
                    <li className="dropdown">
                        <NavLink
                            to="/register"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            Donate Blood
                        </NavLink>
                        <ul className="dropdown-menu">
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/eligible">Eligibility</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blood-camp">Blood Donation Camp</NavLink>
                            </li>
                            <li>
                                <NavLink to="/awareness">Awareness</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <NavLink
                            to="/register"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            Receive Blood
                        </NavLink>
                        <ul className="dropdown-menu">
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/find-blood-bank">Find Blood Bank</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blood-donation-guidelines">Blood Donation Guidelines</NavLink>
                            </li>
                            <li>
                                <NavLink to="/awareness">Awareness</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink
                            to="/organization"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            Organization
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;