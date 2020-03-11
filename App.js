import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from 'expo-font'
import {Asset} from 'expo-asset'
import { AsyncStorage } from 'react-native';
import { InMemoryCache } from "apollo-cache-inmemory";
import {persistCache} from "apollo-cache-persist";
import ApolloClient from 'apollo-boost';
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";
import options from "./apollo";
import styles from "./styles";
import NavController from "./Components/NavController";
import { AuthProvider } from "./AuthContext";

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [client, setClient] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const preLoad = async () => {
        try {
            await Font.loadAsync({
                ...Ionicons.font
            });
            await Asset.loadAsync([require('./assets/logo.svg')]);

            const cache = new InMemoryCache();
            await persistCache({
                cache,
                storage: AsyncStorage
            });

            const client = new ApolloClient({
                cache,
                ...options
            });
            const LoggedIn = await AsyncStorage.getItem("isLoggedIn");

            if (!LoggedIn || LoggedIn === "false") {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }

            setLoaded(true);
            setClient(client);
        } catch (e) {
            console.error(e);
        }

    };

    useEffect(() => {
        preLoad();
    },[]);


    return loaded && client && isLoggedIn !== null ? (
        <ApolloProvider client={client}>
            <ThemeProvider theme={styles}>
                <AuthProvider isLoggedIn={isLoggedIn}>
                    <NavController/>
                </AuthProvider>
            </ThemeProvider>
        </ApolloProvider>
    ) : (
        <AppLoading/>
    )
}