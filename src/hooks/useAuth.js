import { useContext } from "react"
import { getContext } from "../components/context/ContextProvider"

const useAuth = () =>{
    return useContext(getContext)
}
export default useAuth;