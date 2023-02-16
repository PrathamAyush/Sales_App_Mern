import React, { useState } from 'react'
import loadingGif from "../components/Double Ring-3s-204px.gif"
import "./Logout.css"
import Alerter from "sweetalert2"


export const Logout = () => {
  const [loading, setLoading] = useState(false)

  const logout = () => {
    Alerter.fire({
      title: 'Are you sure?',
      text: "Want To Logout To This Page!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        fetch("http://localhost:3200/logout", { method: "POST" })
          .then(() => {
            localStorage.clear("token");
            window.location.href = "/";
          })
          .catch((error) => {
            window.alert(error);
          });
      }
    });
  }

  return (
    loading ? (<div className=' body' >
      <img src={loadingGif} alt='Loading...' className='logoutImg' />
    </div >
    ) : (
      <div className="text-center">
        <h3>Are you sure you want to log out?</h3>
        <button className="btn btn-danger" onClick={logout}>Yes, Log Out</button>
      </div>
    )
  )
}


// import React from 'react'
// import loadingGif from "../components/Double Ring-3s-204px.gif"
// import "./Logout.css"

// export const Logout = () => {
//   return (
//     <>
//       <div className=' body' >
//         <img src={loadingGif} alt='Loading...' className='logoutImg'/>
//         <div className='text-center'>
//           <h4>Logout Page Is Not Working Currently this is a Front-End Page.</h4>
//           <p>It's will work Later when Back-End Created!</p>
//         </div>
//       </div>
//     </>
//   )
// }
