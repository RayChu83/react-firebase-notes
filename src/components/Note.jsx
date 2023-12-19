import React from 'react'

import "../styles/Notes.css"
import { deleteDoc, setDoc, doc } from "firebase/firestore"; 
import { db} from "../config/Firebase"

export default function Note(props) {
    async function updateNote(note, noteId){
        const newBody = prompt("New Note Body:", note.body)
        // ENSURES THAT newBody CAN NOT BE EMPTY AND HAS TO BE DIFFERENT FROM THE CURRENT NOTES BODY
        if (newBody && note.body !== newBody ){
            await setDoc(doc(db, "notes", noteId), {...note, body: newBody, updated: new Date()})
        }
    }
    async function deleteNote(noteId) {
        await deleteDoc(doc(db, "notes", noteId))
    }
    const noteDate = props.note.updated.toDate()
    const formattedNoteDate = `${noteDate.getMonth() + 1}/${noteDate.getDate()}/${noteDate.getFullYear()} - ${noteDate.getHours()}:${noteDate.getMinutes()}`
    return(
        <>
            <small className='lightgray-txt note-creation'>Last Edited: {formattedNoteDate}</small>
            <p>{props.note.body}</p>
            <button onClick={() => updateNote(props.note, props.note.id)} className='note-action-btn update-note'>Update</button>
            <button onClick={() => deleteNote(props.note.id)} className='note-action-btn delete-note'>Delete</button>
        </>
    )
}
