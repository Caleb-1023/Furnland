import { createContext,  useState } from "react"
import { User,Themecontext } from "./Types";

type usecontext={
    user: User | null,
    setuser:React.Dispatch<React.SetStateAction<User | null>>
}
type loginnn ={
    loggedin: boolean,
    setloggedin : React.Dispatch<React.SetStateAction<boolean>>
}
export const loginContext=createContext<loginnn>({} as loginnn)
export const userContext =createContext<usecontext | null>(null);

export const ThemeContext=({children}:Themecontext)=>{
    const [user,setuser]=useState<User | null >(null);
    
    console.log(user)

    
    //  useEffect(()=>{
            // user && window.localStorage.setItem("Data", JSON.stringify(user))
        //    },[user])

   
   
   
    return (
       
            <userContext.Provider value={{user,setuser}}>
            {children}
        </userContext.Provider>
        
    )
}