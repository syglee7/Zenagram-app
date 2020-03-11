import 'react-native-gesture-handler';
import * as React from 'react';
import { View } from "react-native";
import { Platform} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screens/Tabs/Home";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import PhotoNavigation from  "./PhotoNavigation";
import MessagesLink from "../Components/MessagesLink";
import NavIcon from "../Components/NavIcon";
import {stackStyles} from "./config";

const StackNavigation = createStackNavigator();

const HomeStackScreen = () => {
    return (
        <StackNavigation.Navigator >
            <StackNavigation.Screen
                name="Home"
                component={Home}
                options={{
                    headerRight: () => (
                        <MessagesLink />
                    ),
                    headerTitle: (
                        <NavIcon name="logo-instagram" size={36} />
                    ),
                    headerTitleAlign: "center",
                    headerStyle: {...stackStyles}
                }}
            />
        </StackNavigation.Navigator>
    )
};

const ProfileStackScreen = () => {
    return (
        <StackNavigation.Navigator>
            <StackNavigation.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerRight: () => (
                        <MessagesLink />
                    ),
                    headerTitle: (
                        <NavIcon name="logo-instagram" size={36} />
                    ),
                    headerTitleAlign: "center",
                    headerStyle: {backgroundColor : "#FAFAFA"}
                }}
            />
        </StackNavigation.Navigator>
    )
};

const SearchStackScreen = () => {
    return (
        <StackNavigation.Navigator>
            <StackNavigation.Screen
                name="Search"
                component={Search}
                options={{
                    headerRight: () => (
                        <MessagesLink />
                    ),
                    headerTitle: (
                        <NavIcon name="logo-instagram" size={36} />
                    ),
                    headerTitleAlign: "center",
                    headerStyle: {backgroundColor : "#FAFAFA"}
                }}
            />
        </StackNavigation.Navigator>
    )
};

const NotificationStackScreen = () => {
    return (
        <StackNavigation.Navigator>
            <StackNavigation.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerRight: () =>(
                        <MessagesLink />
                    ),
                    headerTitle: (
                        <NavIcon name="logo-instagram" size={36} />
                    ),
                    headerTitleAlign: "center",
                    headerStyle: {backgroundColor : "#FAFAFA"}
                }}
            />
        </StackNavigation.Navigator>
    )
};

const TabNavigation = createBottomTabNavigator();

export default ({ navigation }) => {
    return (
        <TabNavigation.Navigator tabBarOptions={{showLabel: false, style: {backgroundColor: "#FAFAFA"}}}>
            <TabNavigation.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavIcon
                            focused={focused}
                            name={Platform.OS === "ios" ? "ios-home" : "md-home"} size={25} />
                    ),
                }}
            />
            <TabNavigation.Screen
                name="Search"
                component={SearchStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavIcon
                            focused={focused}
                            name={Platform.OS === "ios" ? "ios-search" : "md-search"} size={25} />
                    ),
                }}
            />
            <TabNavigation.Screen
                name="Add"
                component={View}
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        navigation.navigate("PhotoNavigation")
                    },
                }}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavIcon
                            focused={focused}
                            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
                            size={25}
                        />
                    ),
                }}
            />
            <TabNavigation.Screen
                name="Notifications"
                component={NotificationStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavIcon
                            focused={focused}
                            name={
                            Platform.OS === "ios"
                                ? focused
                                ? "ios-heart"
                                : "ios-heart-empty"
                                : focused
                                ? "md-heart"
                                : "md-heart-empty"
                            }
                             size={25}
                        />
                    ),
                }}
            />
            <TabNavigation.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavIcon
                            focused={focused}
                            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
                            size={25}
                        />
                    ),
                }}
            />
        </TabNavigation.Navigator>

    );
}