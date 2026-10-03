import { createContext,useState,useEffect } from "react";
import { login as apiLogin, register as apiRegister, getMe } from "../api/auth";

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
            localStorage.removeItem("refreshToken");
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
                    localStorage.removeItem("refreshToken");
                    setUser(null);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    },[]);

    const saveSession = (user, token, refreshToken = null) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        }
    };

    const signIn = async (email, password) => {
        const res = await apiLogin(email, password);
        if (res.ok) {
            setUser(res.data.user);
            saveSession(res.data.user, res.data.token, res.data.refreshToken);
        }
        return res;
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    };

    const register = async (userData) => {
        const res = await apiRegister(userData);
        if (res.ok) {
            setUser(res.data.user);
            saveSession(res.data.user, res.data.token, res.data.refreshToken);
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