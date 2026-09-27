import { createContext,useContext,useState } from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";

const authContext = createContext(null);


const AuthProvider = ( {children}) => {
     const [user, setUser] = useState(null);
    // dummy backend call to set user
    const signIn = async (email, password) => {
        console.log("Signing in...");
        const user = await apiLogin(email, password);
        setUser(user);
    };

    const signOut = () => {
        setUser(null);
    };

    const register = async (userData) => {
        const user = await apiRegister(userData);
        setUser(user);
    };
    
    return (
        <authContext.Provider value={{ user, signIn, signOut, register }}>
            {children}
        </authContext.Provider>
    );
}

export { AuthProvider, authContext };