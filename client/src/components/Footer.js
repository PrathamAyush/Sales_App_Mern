import React from 'react'

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer className='mt-5'>
                <hr></hr>
                <p className='d-flex fw-bolder justify-content-center text-muted'>
                    All Rights Reserved By The H3RMIT &copy; {currentYear} 
                    </p>
            </footer>
        </>
    )
}
