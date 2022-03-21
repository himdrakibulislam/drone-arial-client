import firebaseInstall from '../firebase/firebaseInit'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
firebaseInstall()
const useFirebase = () =>{
    const [user,setUser] = useState({})
    const [err,setErr] = useState();
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider();
    const SignInUsingGoogle = () =>{
        signInWithPopup(auth,googleProvider)
    .then(result =>{

    })
    .catch(err=>{
       setErr(err.message)
    })
    }
    const signUpUsingEmailPassword = (email,password) =>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            setUser(result.user)
        })
        .catch(err=>{
           setErr(err.message)
        })
    }
    const signInUsingEmailPassword = (email,password) =>{
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            setUser(result.user)
        })
        .catch(err=>{
            setErr(err.message)
        })
    }
    const profileDetails = (name) =>{
        updateProfile(auth.currentUser,{
            displayName: name
        }).then(()=>{

        }).catch(err=>{
            setErr(err.message)
        })
    }
    const logOut = () =>{
        signOut(auth)
        .then(()=>{
            setUser({})
        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
            setUser(user)
            } else {
            
            }
          });
    },[])
    return{
        user,
        SignInUsingGoogle,
        signUpUsingEmailPassword,
        signInUsingEmailPassword,
        profileDetails,
        logOut,
        err
    }
}
export default useFirebase;