import React, { useState, useEffect, useContext} from 'react'
import { collection, addDoc, onSnapshot, query, where, orderBy} from "firebase/firestore"; 

import "../styles/Notes.css"
import {auth, db} from "../config/Firebase"
import Note from "./Note"
import {currentUserContext} from "../App.jsx"

export default function Notes() {
    const currentUser = useContext(currentUserContext)
    const [newNoteData, setNewNoteData] = useState({body : ""})
    const [allNotes, setAllNotes] = useState([])
    const [loadingNotes, setLoadingNotes] = useState(true);
    const notesCollection = collection(db, "notes")

    function handleChange(event) {
        const {name, value} = event.target
        setNewNoteData({[name] : value})
    }

    async function addNote() {
        if (newNoteData.body){
            try {
                const docRef = await addDoc(notesCollection, {
                    ...newNoteData, 
                    uid : currentUser.uid,
                    created : new Date(),
                    updated : new Date()
                });
                // CLEAR NOTE BODY
                setNewNoteData({body : ""})
              } catch (error) {
                console.error("Error adding document: ", error);
              }
        }
    }
    useEffect(() => {
        const q = query(notesCollection, 
            where("uid", "==", currentUser.uid),
            orderBy("updated", "desc"))
        const unsubscribe = onSnapshot(q, (docs) => {
            const array = []
            docs.forEach(doc => {
                array.push({...doc.data(),
                            id: doc.id})
            })
            setAllNotes(array)
            setLoadingNotes(false)
        });
        return () => unsubscribe()
    }, [])
    return(
        <>
            <section id='note-body'>
                <input type="text" 
                    className='input'
                    id='input-body'
                    placeholder='Note Body...'
                    name='body'
                    value={newNoteData.body}
                    autoComplete='off'
                    onChange={(event) => {handleChange(event)}}
                />
                <button onClick={addNote} id='btn-add'>Add Note</button>
            </section>
            {loadingNotes ? (
                <div id='loading-container'></div>
            ) : (
                <>
                    {allNotes.map((note) => (
                        <div key={note.id} className='note'>
                            <Note note={note}/>
                        </div>
                    ))}  
                </>
            )}
        </>
    )
}