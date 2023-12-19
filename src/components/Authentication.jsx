import React, { useState, useEffect} from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from "../config/Firebase"
import googleLogo from "../assets/googleLogo.png"
import "../styles/Authentication.css"

function Authentication() {
    const provider = new GoogleAuthProvider()
    const [typeOfForm, setTypeOfForm] = useState("Sign Up")
    const [signInError, setSignInError] = useState(false)
    const [signInErrorContent, setSignInErrorContent] = useState("")

    const [formData, setFormData] = useState({emailField: "", 
                                              passwordField : ""})
    function handleChange(event) {
        const {name, value} = event.target
        setFormData((oldData) => ({...oldData, [name] : value}))
    }
    // SIGN UP
    function handleSignUp(event) {
        event.preventDefault()
        const email = formData.emailField 
        const password = formData.passwordField
        createUserWithEmailAndPassword(auth, email, password)
        .catch((err) => {
            // ERROR HANDLING
            if (err.message === "Firebase: Error (auth/invalid-email)."){
                setSignInError(true)
                setSignInErrorContent("Invalid Email Address.")
            }else if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
                setSignInError(true)
                setSignInErrorContent("Password too short or weak.")
            }else{
                setSignInError(true)
                setSignInErrorContent("Email is already in use.")
            }
            
        })
    }

    // SIGN IN
    function handleSignIn(event) {
        event.preventDefault()
        const email = formData.emailField 
        const password = formData.passwordField
        signInWithEmailAndPassword(auth, email, password)
        .then(console.log(auth))
        .catch((err) => {
            setSignInError(true)
            setSignInErrorContent("Invalid Email or Password.")
        })
    }
    // GOOGLE SIGN IN
    function authSignInWithGoogle() {
        signInWithPopup(auth, provider)
    }
    return(
        <section id='user-auth'>
            <h1>{typeOfForm === "Sign Up" ? "Sign Up Page" : "Sign In Page"}</h1>
            {signInError && <p className='error-msg'>{signInErrorContent}</p>}
            <input type="email" 
                placeholder='Email'
                name='emailField'
                autoComplete='off'
                onChange={handleChange}
                value={formData.emailField}
                className='input'
                required/>
            <br />

            <input type="password" 
                placeholder='Password'
                name='passwordField'
                autoComplete='off'
                onChange={handleChange}
                value={formData.passwordField}
                className='input'
                required/>
            <br />
            <button onClick={authSignInWithGoogle} id='btn-googleauth' title='Sign In Via Google'>
                <img src={googleLogo} alt="Google Logo" id='img-google'/>
                Continue With Google
            </button>

            {typeOfForm === "Sign Up" ? (
                <>
                    <button onClick={(event) => {handleSignUp(event)}} className='btn-authcta'>Sign Up</button>
                    <p className='formated-txt lightgray-txt'>Have an account already, <button onClick={() => setTypeOfForm("Log In")} className='unstyled-btn toggle-type-form'>Sign In</button></p>
                </>
            ) : (
                <>
                    <button onClick={(event) => {handleSignIn(event)}} className='btn-authcta'>Sign In</button>
                    <p className='formated-txt lightgray-txt'>Dont have an account already, <button onClick={() => setTypeOfForm("Sign Up")} className='unstyled-btn toggle-type-form'>Sign Up</button></p>
                </>
            )}
        </section>
    )
}
export default Authentication