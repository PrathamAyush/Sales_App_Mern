import React, { useState } from "react";

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
                        throw new Error("User Not Found")
                    } else {
                        return response.json();
                    }

                }).then((found) => {

                    console.log(found)
                    alert("Login Success")
                    setloading(false)
                    window.location.href = "/"

                }).catch((err) => {
                    if (err.message === "User Not Found") {
                        alert("User Not Found!")
                    } else {
                        alert("Server not responding=>X<=Connection not Esteblised !")
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
            <div className='container border' style={{ fontFamily: "'Ubuntu', sans-serif" }}>
                <form className='d-flex flex-column justify-content-start' onSubmit={handleLogin}>

                    <label htmlFor="email" className='mt-3 text-muted'>Email</label>
                    <input type="email" name='email' className='mt-2' placeholder='example@email.com' required
                        value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} />

                    <label htmlFor="password" className='mt-3 text-muted'>Password</label>
                    <input type="password" name='password' className='mt-2' placeholder='password' required
                        value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />

                    {/* <input type="submit" value="LOGIN" className='btn btn-primary mt-3 mb-3' /> */}

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

        </>
    )
}
