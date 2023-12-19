import React from 'react'
import {signOut} from "firebase/auth"

import "../styles/Nav.css"
import {auth } from "../config/Firebase"
import Greeting from "./Greeting"

export default function Nav(props) {
    function logout() {
        signOut(auth)
    }
    return(
        <nav>
          <Greeting />
          <button onClick={logout} id='btn-logout' className='unstyled-btn'><i className="fa-solid fa-right-from-bracket"></i> Sign Out</button>
        </nav>
    )
}