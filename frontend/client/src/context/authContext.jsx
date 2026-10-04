import { createContext,useState,useEffect } from "react";
import { login as apiLogin, register as apiRegister, getMe, logout as apiLogout } from "../api/auth";

const authContext = createContext(null);


const AuthProvider = ( {children}) => {
    const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        // No token means there is nothing to verify. Calling /me here would 401,
        // and the interceptor's redirect would remount this provider in a loop.
        if (!storedUser || !storedToken) {
            setLoading(false);
            return;
        }

        try {
            setUser(JSON.parse(storedUser)); // optimistic, until the server confirms
        } catch {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setLoading(false);
            return;
        }

        getMe()
            .then((res) => {
                if (res.ok) {
                    setUser(res.data.user);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                } else {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setUser(null);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    },[]);

    const saveSession = (user, token) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const signIn = async (email, password) => {
        const res = await apiLogin(email, password);
        if (res.ok) {
            setUser(res.data.user);
            saveSession(res.data.user, res.data.token);
        }
        return res;
    };

    const signOut = async () => {
        await apiLogout(); // clears the httpOnly refresh cookie
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const register = async (userData) => {
        const res = await apiRegister(userData);
        if (res.ok) {
            setUser(res.data.user);
            saveSession(res.data.user, res.data.token);
        }
        return res;
    };
    
    return (
        <authContext.Provider value={{ user, signIn, signOut, register, loading }}>
            {children}
        </authContext.Provider>
    );
}

export { AuthProvider, authContext };