import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import { FeedByDefaultScreen } from '../screens/FeedByDefaultScreen';
import { FeedByCategoryScreen } from '../screens/FeedByCategoryScreen';
import { FeedByRoleScreen } from '../screens/FeedByRoleScreen';

const Tab = createMaterialTopTabNavigator();

export const FeedTopTabNavigator = ({ myNewIdeaPosted }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Fresh Ideas">
                {() => <FeedByDefaultScreen myNewIdeaPosted={myNewIdeaPosted} />}
            </Tab.Screen>
            <Tab.Screen name="Category">
                {() => <FeedByCategoryScreen myNewIdeaPosted={myNewIdeaPosted} />}
            </Tab.Screen>
            <Tab.Screen name="Role">
                {() => <FeedByRoleScreen myNewIdeaPosted={myNewIdeaPosted} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};
