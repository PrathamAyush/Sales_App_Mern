import { NavLink } from "react-router-dom"
import React from "react"

export const Header = ({ isLoggedIn }) => {

    // gating user info to show the Name when user logged in
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">

                    <span className="navbar-brand fw-bolder">SALES APP</span>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">

                        <span className="navbar-toggler-icon"></span>

                    </button>


                    <div className="collapse navbar-collapse" id="navbarNav">

                        <ul className="navbar-nav">

                            {isLoggedIn ? (
                                <>
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
                                        <NavLink to="/salesByDate" className="nav-link" >SALES HISTORY</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/logout" className="nav-link" >LOGOUT</NavLink>
                                    </li>

                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link">LOGIN</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link" >REGISTER</NavLink>
                                    </li>
                                </>
                            )}

                        </ul>


                    </div>
                </div>

                {/* Show Relevent Use-Name that the Data Belongs to */}
                <div>
                    <input type="text"
                        style={{
                            border: "none", textAlign: "center",
                            backgroundColor: "transparent", color: "white", width: "150px",
                            marginRight: "5%"
                        }} readOnly value={user ? user.fullName : ""} />
                </div>
            </nav>
        </>
    )
}