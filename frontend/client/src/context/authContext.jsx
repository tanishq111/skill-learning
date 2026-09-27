import { createContext,useContext,useState } from "react";


const authContext = createContext(null);


const AuthProvider = ( {children}) => {
     const [user, setUser] = useState(null);
    // dummy backend call to set user
    const signIn = ()=> {
        console.log("Signing in...");
        setUser("dummyUser");
    };

    const signOut = () => {
        setUser(null);
    };

    const register = () => {
        console.log("Registering user...");
        setUser("dummyUser");
    };
    
    return (
        <authContext.Provider value={{ user, signIn, signOut, register }}>
            {children}
        </authContext.Provider>
    );
}

export { AuthProvider, authContext };