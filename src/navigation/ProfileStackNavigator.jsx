import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { ProfileScreen } from '../screens/ProfileScreen';
import { IdeaDetailScreen } from '../screens/IdeaDetailScreen';

const Stack = createStackNavigator();

export const ProfileStackNavigator = ({ myNewIdeaPosted }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="My Profile">
                {() => <ProfileScreen myNewIdeaPosted={myNewIdeaPosted} />}
            </Stack.Screen>
            <Stack.Screen name="Idea Detail" component={IdeaDetailScreen} />
        </Stack.Navigator>
    );
};
