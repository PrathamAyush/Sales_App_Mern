import React, { useState } from 'react'
import Alerter from "sweetalert2"

const defaultRegistration = { firstName: "", lastName: "", email: "", password: "" };

export const Register = () => {
    const [regData, setRegData] = useState(defaultRegistration)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password } = regData
        setLoading(true)
        try {
            fetch("http://localhost:3200/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, password })
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Registration failed");
                    }
                })
                .then((newEntry) => {
                    console.log(newEntry);
                    setLoading(false)
                    Alerter.fire({
                        title: 'Success!',
                        text: 'Your Registration is successful.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 1500
                    });
                    window.location.href = "/"
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false)
                    Alerter.fire({
                        title: 'User Already Exist!',
                        text: 'Try Another Email.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });

                })
        } catch (error) {
            console.log(error)
        }
        setRegData(defaultRegistration);
    }
    return (
        <>
            <h2 className='fw-bolder text-center'
                style={{ marginTop: "3vh", fontFamily: "'Ubuntu', sans-serif" }}>
                REGISTRATION FORM
            </h2>
            <div className='container border mt-2'>
                <form className='d-flex flex-column justify-content-start' onSubmit={handleSubmit}>

                    <label htmlFor="firstName" className='mt-3 text-muted'>First Name</label>
                    <input type="text" name='firstName' className='mt-2' placeholder='First Name' required
                        value={regData.firstName} onChange={(e) => setRegData({ ...regData, firstName: e.target.value })} />

                    <label htmlFor="lastName" className='mt-3 text-muted'>Last Name</label>
                    <input type="text" name='lastName' className='mt-2' placeholder='Last Name' required
                        value={regData.lastName} onChange={(e) => setRegData({ ...regData, lastName: e.target.value })} />

                    <label htmlFor="email" className='mt-3 text-muted'>Email</label>
                    <input type="email" name='email' className='mt-2' placeholder='Email' required
                        value={regData.email} onChange={(e) => setRegData({ ...regData, email: e.target.value })} />

                    <label htmlFor="pass" className='mt-3 text-muted'>Password</label>
                    <input type="password" name='pass' className='mt-2' placeholder='Password' required
                        value={regData.password} onChange={(e) => setRegData({ ...regData, password: e.target.value })} />

                    {/* {loading && <button className="btn btn-primary" type="submit" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>}

                 <input type="submit" value="Submit" className='btn btn-primary mt-3 mb-3' />  */}

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

