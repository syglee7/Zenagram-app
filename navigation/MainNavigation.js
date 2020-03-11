import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import MessagesLink from "../Components/MessagesLink";
import NavIcon from "../Components/NavIcon";
import {stackStyles} from "./config";

const MainNavigation = createStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <MainNavigation.Navigator initialRouteName="TabNavigation" headerMode="none" mode="modal">
                <MainNavigation.Screen
                    name="TabNavigation"
                    component={TabNavigation}
                    options={{
                        headerStyle: {...stackStyles}
                    }}
                />
                <MainNavigation.Screen
                    name="PhotoNavigation"
                    component={PhotoNavigation}
                    options={{
                        headerStyle: {...stackStyles}
                    }}
                />
                <MainNavigation.Screen
                    name="MessageNavigation"
                    component={MessageNavigation}
                    options={{
                        headerStyle: {...stackStyles}
                    }}
                />
            </MainNavigation.Navigator>
        </NavigationContainer>
    )
};