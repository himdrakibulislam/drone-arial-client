import { useContext } from "react"
import { contextProvider } from "../context/AuthContext"

const useAuth = ()=>{
    return useContext(contextProvider)
}
export default useAuth;