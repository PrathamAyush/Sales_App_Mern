import { NavLink } from "react-router-dom"
import React from "react"

export const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand fw-bolder">SALES APP</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page">ADD SALES</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/topSales" className="nav-link" >TOP 5 SALES</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/revenue" className="nav-link" >TODAY'S TOTAL REVENUE</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">LOGIN</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link" >REGISTER</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/logout" className="nav-link" tabIndex="-1" aria-disabled="true">LOGOUT</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}