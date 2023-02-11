import React from 'react'

export const Revenue = () => {
    return (
        <>
        <h2 
        style={{ textAlign: "center", marginTop: "3vh", fontFamily: "'Ubuntu', sans-serif",fontWeight:"bolder" }}>
            TODAY'S REVENUE IS: 175000
            </h2>
            <div className='d-flex justify-content-center'>
             <input type="number" value={175000} readOnly className='fw-bolder text-center' />
            </div>
        </>
    )
}

