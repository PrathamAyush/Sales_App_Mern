import React from 'react'
import loadingGif from "../components/Double Ring-3s-204px.gif"
import "./Logout.css"

export const Logout = () => {
  return (
    <>
      <div className=' body' >
        <img src={loadingGif} alt='Loading...' className='logoutImg'/>
        <div className='text-center'>
          <h4>Logout Page Is Not Working Currently this is a Front-End Page.</h4>
          <p>It's will work Later when Back-End Created!</p>
        </div>
      </div>
    </>
  )
}
