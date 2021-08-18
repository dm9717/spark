import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { FeedByDefaultScreen } from '../screens/FeedByDefaultScreen';
import { IdeaDetailScreen } from '../screens/IdeaDetailScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';

const Stack = createStackNavigator();

export const FeedStackNavigator = ({ myNewIdeaPosted }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed">
                {() => <FeedByDefaultScreen myNewIdeaPosted={myNewIdeaPosted} />}
            </Stack.Screen>
            <Stack.Screen name="Idea Detail" component={IdeaDetailScreen} />
            <Stack.Screen name="User Profile" component={UserProfileScreen} />
        </Stack.Navigator>
    );
};
