import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import FeedByDefaultScreen from '../screens/FeedByDefaultScreen';
import FeedByCategoryScreen from '../screens/FeedByCategoryScreen';
import FeedByRoleScreen from '../screens/FeedByRoleScreen';

const Tab = createMaterialTopTabNavigator();

export const FeedTopTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="FeedByDefault" component={FeedByDefaultScreen} />
            <Tab.Screen name="FeedByCategory" component={FeedByCategoryScreen} />
            <Tab.Screen name="FeedByRole" component={FeedByRoleScreen} />
        </Tab.Navigator>
    );
};
