import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import { FeedByDefaultScreen } from '../screens/FeedByDefaultScreen';
import { FeedByCategoryScreen } from '../screens/FeedByCategoryScreen';
import { FeedByRoleScreen } from '../screens/FeedByRoleScreen';

const Tab = createMaterialTopTabNavigator();

export const FeedTopTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Fresh Ideas" component={FeedByDefaultScreen} />
            <Tab.Screen name="Category" component={FeedByCategoryScreen} />
            <Tab.Screen name="Role" component={FeedByRoleScreen} />
        </Tab.Navigator>
    );
};
