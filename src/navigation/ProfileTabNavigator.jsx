import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// components
import { UserIdeas } from '../components/UserIdeas';
import { SavedIdeas } from '../components/SavedIdeas';

const Tab = createMaterialTopTabNavigator();

export const ProfileTabNavigator = ({ myIdeas, savedIdeas, toIdeaDetail }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="My Ideas">
                {() => <UserIdeas myIdeas={myIdeas} toIdeaDetail={toIdeaDetail} />}
            </Tab.Screen>
            <Tab.Screen name="Saved">
                {() => <SavedIdeas savedIdeas={savedIdeas} toIdeaDetail={toIdeaDetail} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};
