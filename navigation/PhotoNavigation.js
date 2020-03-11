import 'react-native-gesture-handler';
import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import {stackStyles} from "./config";

const Tabs = createMaterialTopTabNavigator();

const PhotoTabs = () => {
    return (
        <Tabs.Navigator headerMode="none" tabBarPosition="bottom">
            <Tabs.Screen name="SelectPhoto" component={SelectPhoto} />
            <Tabs.Screen name="TakePhoto" component={TakePhoto} />
        </Tabs.Navigator>
    );
};

const StackTabs = createStackNavigator();

export default () => {
    return (
        <StackTabs.Navigator>
            <StackTabs.Screen
                options={{
                    title: '',
                    headerStyle: {...stackStyles}
                }}
                name="PhotoTabs" component={PhotoTabs} />
            <StackTabs.Screen
                name="UploadPhoto"
                component={UploadPhoto}
                options={{
                    headerStyle: {...stackStyles}
                }}
            />
        </StackTabs.Navigator>
    );
}