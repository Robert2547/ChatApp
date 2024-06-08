import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}
s
// Use the localStorage to store the user data
export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user") || null));

    return <AuthContext.Provider value={{authUser, setAuthUser}}>{children}</AuthContext.Provider>;
};