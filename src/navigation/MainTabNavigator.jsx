import React from 'react';
import { Feather } from '@expo/vector-icons';

// Navigators
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedTopTabNavigator } from './FeedTopNavigator';

// Screens
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ activeTintColor: '#900', inactiveTintColor: '#999' }}>
            <Tab.Screen
                name="Feed"
                component={FeedTopTabNavigator}
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color, size }) => {
                        <Feather name="home" color={color} size={size} />;
                    },
                }}
            />
            <Tab.Screen
                name="Post"
                component={PostScreen}
                options={{
                    tabBarLabel: 'Post',
                    tabBarIcon: ({ color, size }) => {
                        <Feather name="home" color={color} size={size} />;
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => {
                        <Feather name="home" color={color} size={size} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
};
