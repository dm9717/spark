import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabNavigator } from './MainTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

// contexts
import { UserContext } from '../contexts/userContext';
// screens
import { AuthScreen } from '../screens/AuthScreen';

export const AppNavigator = () => {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const jsonUser = await AsyncStorage.getItem('user');
            userRetrieved = jsonUser != null ? JSON.parse(jsonUser) : null;
            setUser(userRetrieved);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <NavigationContainer>
            {user == null ? <AuthScreen /> : <MainTabNavigator />}
        </NavigationContainer>
    );
};
