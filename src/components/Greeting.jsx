import React, { useContext } from 'react'
import {currentUserContext} from "../App"

export default function Greeting(props) {
    const userName = useContext(currentUserContext).displayName
    return(
        <>
            <h1>Welcome {userName ? userName.split(" ")[0] : "Anonymous"}</h1>
        </>
    )
}