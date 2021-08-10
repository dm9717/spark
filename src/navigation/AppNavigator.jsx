import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabNavigator } from './MainTabNavigator';

// contexts
import { UserContext } from '../contexts/userContext';

// screens
import { AuthScreen } from '../screens/AuthScreen';

export const AppNavigator = () => {
    const { user } = useContext(UserContext);
    return (
        <NavigationContainer>
            {user == null ? <AuthScreen /> : <MainTabNavigator />}
        </NavigationContainer>
    );
};
