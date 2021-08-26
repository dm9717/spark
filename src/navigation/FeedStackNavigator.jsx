import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { FeedByDefaultScreen } from '../screens/FeedByDefaultScreen';
import { IdeaDetailScreen } from '../screens/IdeaDetailScreen';
import { PosterProfileScreen } from '../screens/PosterProfileScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export const FeedStackNavigator = ({ myNewIdeaPosted }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed">
                {() => <FeedByDefaultScreen myNewIdeaPosted={myNewIdeaPosted} />}
            </Stack.Screen>
            <Stack.Screen name="Idea Detail" component={IdeaDetailScreen} />
            <Stack.Screen name="Poster Profile" component={PosterProfileScreen} />
            <Stack.Screen name="My Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
};
