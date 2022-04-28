import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,updateProfile,getIdToken} from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseInstalling from "../pages/login/firebase/firebase.init";
firebaseInstalling();
        const useFirebase = () =>{
            const [user,setUser] = useState({});
            const [err,setErr] = useState('');
            const [isLoading,setIsLoading] = useState(true);
            const auth = getAuth();
            const [idToken,setIdToken] = useState('');
            const [admin,setAdmin] = useState();
            const googleProvider = new GoogleAuthProvider()
            // signInWithGoogle
            const signInWithGoogle = (histoy,location)=>{
                setIsLoading(true)
                signInWithPopup(auth, googleProvider)
                    .then((result) => {
                        const user = result.user;
                        const redirect = location?.state?.from || '/'
                        histoy.replace(redirect);
                        saveUser(user.displayName,user.email,'PUT')
                    }).catch((error) => {
                        const errorMessage = error.message;
                        setErr(errorMessage);
                    }).finally(()=>setIsLoading(false));}
        //   manage user
        useEffect(()=>{
           const unsubscribed =  onAuthStateChanged(auth, (user) => {
            if (user) {
             setUser(user);
             getIdToken(user).then(function(idToken) {
                setIdToken(idToken)
               }).catch(function(error) {
                 // Handle error
               });
            } else {

            }
            setIsLoading(false);
          });
          return () => unsubscribed;
        },[auth]);
        // register a user
        const registerUser = (email,password,name,histoy)=>{
            setIsLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: name
                      }).then(() => {
                          saveUser(name,email,'POST')
                      }).catch((error) => {

                      });
                      histoy.replace('/')
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setErr(errorMessage);
                }).finally(()=> setIsLoading(false));
        }
        // login a user
        const loginUser = (email,password,histoy,location) =>{
            setIsLoading(true)
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const redirect = location?.state?.from || '/'
                    histoy.replace(redirect);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setErr(errorMessage)
                }).finally(()=> setIsLoading(false));
        }
        // logout
        const logOut = () =>{
            setIsLoading(true)
            signOut(auth).then(() => {
                setUser({});
              }).catch((error) => {
                
              }).finally((()=>setIsLoading(false)));
        }
        // save user
        const saveUser = (name,email,method)=>{
            const user = {name,email}
            fetch('http://localhost:5000/user',{
                method: method,
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:JSON.stringify(user)
            }).then(res =>res.json())
            .then(data => {})
        }
        // admin
        useEffect(()=>{
            const url = `http://localhost:5000/user/${user.email}`
            fetch(url)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
        },[user.email])
    return{
        admin,
        idToken,
        user,
        signInWithGoogle,
        registerUser,
        loginUser,
        logOut,
        err,
        isLoading
    }
}
export default useFirebase;