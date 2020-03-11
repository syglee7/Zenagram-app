import React, {createContext, useContext, useState} from 'react';
import { AsyncStorage } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: LoggedInProps , children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(LoggedInProps);
    const logUserIn = async (token) => {
        try {
            await AsyncStorage.setItem("isLoggedIn", "true");
            await AsyncStorage.setItem("jwt", token);
            setIsLoggedIn(true);
        } catch(e) {
            console.error(e);
        }
    };

    const logUserOut = async () => {
        try {
            await AsyncStorage.setItem("isLoggedIn", "false");
            setIsLoggedIn(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, logUserIn, logUserOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useIsLoggedIn = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
    const {logUserIn} = useContext(AuthContext);
    return logUserIn;
};

export const useLogOut = () => {
    const {logUserOut} = useContext(AuthContext);
    return logUserOut;
};