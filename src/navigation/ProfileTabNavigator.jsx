import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// components
import { UserIdeas } from '../components/UserIdeas';
import { SavedIdeas } from '../components/SavedIdeas';

const Tab = createMaterialTopTabNavigator();

export const ProfileTabNavigator = ({ myIdeas }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="My Ideas">{() => <UserIdeas myIdeas={myIdeas} />}</Tab.Screen>
            <Tab.Screen name="Saved">{() => <SavedIdeas myIdeas={myIdeas} />}</Tab.Screen>
        </Tab.Navigator>
    );
};
