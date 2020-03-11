import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Message from "../screens/Message/Message";
import Messages from "../screens/Message/Messages";
import {stackStyles} from "./config";

const MessageStackNav = createStackNavigator();

export default () => {
    return (
        <MessageStackNav.Navigator initialRouteName="Messages" mode="modal">
            <MessageStackNav.Screen
                name="Messages"
                component={Messages}
                options={{
                    headerStyle: {...stackStyles}
                }}
            />
            <MessageStackNav.Screen
                name="Message"
                component={Message}
                options={{
                    headerStyle: {...stackStyles}
                }}
            />
        </MessageStackNav.Navigator>
    );
}