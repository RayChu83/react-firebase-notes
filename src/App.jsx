import React, { useEffect, useState, useContext, createContext} from 'react'
import {onAuthStateChanged} from "firebase/auth"
import './styles/App.css'

import Authentication from './components/Authentication'
import Nav from './components/Nav'
import Greeting from './components/Greeting'
import Notes from './components/Notes'
import {auth } from "./config/Firebase"

export const currentUserContext = createContext()

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
        setCurrentUser(user)
      } else {
        setIsLoggedIn(false)
      }
    });
    return () => unsubscribe()
  }, [

  ])
  console.log(currentUser)
  return (
    <>
      {
      !isLoggedIn ? 
        <Authentication/> 
      : 
        <currentUserContext.Provider value={currentUser}>
          <div id='main-container'>
            <Nav/>
            <Notes />
          </div>
        </currentUserContext.Provider>
      }
    </>
  )
}

export default App
