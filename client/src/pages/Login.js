import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Alerter from "sweetalert2";

const defaultLogin = { email: "", password: "" };

export const Login = () => {

    const [login, setLogin] = useState(defaultLogin)
    const [loading, setloading] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault();

        const { email, password } = login;
        setloading(true)

        try {
            fetch("http://localhost:3200/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })

            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Invalid Credential")
                    } else {
                        return response.json();
                    }

                }).then((found) => {

                    localStorage.setItem("token", found.result.token)
                    localStorage.setItem("user", JSON.stringify(found.result.user))

                    Alerter.fire({
                        title: 'Success!',
                        text: 'Your login was successful.',
                        icon: 'success',
                        confirmButtonText: 'OK',

                    }).then((result) => {
                        if (result.isConfirmed) {
                            setloading(false);
                            window.location.href = "/";
                        }
                    });

                }).catch((err) => {
                    if (err.message === "Invalid Credential") {
                        Alerter.fire({
                            title: 'error!',
                            text: 'Invalid Credential.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Alerter.fire({
                            title: 'error!',
                            text: 'Server Not Responding/Connection Error.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                    setloading(false)
                    setLogin(defaultLogin)
                })

        } catch (error) {
            console.log(error)
        }

    }
    return (

        <>
            <h2 className='text-center fw-bold' style={{ fontFamily: "'Ubuntu', sans-serif", marginTop: "3vh" }}>LOGIN FORM</h2>

            <div className='container border mb-3' style={{ fontFamily: "'Ubuntu', sans-serif" }}>

                <form className='d-flex flex-column justify-content-start' onSubmit={handleLogin}>

                    <label htmlFor="email" className='mt-3 text-muted'>Email</label>

                    <input type="email" name='email' className='mt-2' placeholder='example@email.com' required
                        value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} />

                    <label htmlFor="password" className='mt-3 text-muted'>Password</label>

                    <input type="password" name='password' className='mt-2' placeholder='password' required
                        value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />


                    {loading ? (
                        <button className="btn btn-primary mt-3 mb-3" type="submit" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <input type="submit" value="Submit" className="btn btn-primary mt-3 mb-3" />
                    )}
                </form>

            </div>
            <div className="container d-flex justify-content-center">
                <span className="text-muted">Don't Have An Account? <NavLink to="/register" className="text-decoration-none">Create Account</NavLink></span>
            </div>
        </>
    )
}
