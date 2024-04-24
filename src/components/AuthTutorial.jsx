import React, { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

function AuthTutorial() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.photoURL)

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.error(err)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err)
        }
    }

  return (
    <div>
        <input 
        placeholder="Email..."
        onChange={(e)=> setEmail(e.target.value)}
        />
        <input 
        placeholder="Password..."
        type='password'
        onChange={(e)=> setPassword(e.target.value)}
        />
        <button onClick={signIn}> Sign In </button>

        <button onClick={signInWithGoogle}> Sign In with Google </button>

        <button onClick={logout}> Logout </button>
    </div>
  )
}

export default AuthTutorial
