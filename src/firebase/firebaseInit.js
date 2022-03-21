import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
const firebaseInstall = ()=>{
    initializeApp(firebaseConfig);
}
export default firebaseInstall;