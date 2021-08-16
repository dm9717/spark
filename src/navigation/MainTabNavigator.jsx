import React, { useState } from 'react';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

// Navigators
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedTopTabNavigator } from './FeedTopNavigator';

// Screens
import { PostScreen } from '../screens/PostScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
    // When an user posts an idea, myNewIdeaPosted's value will be flipped, and useEffect in ProfileScreen.jsx will be called. Basically, if a user posts an idea on PostScreen, the value of myNewIdeaPosted will be flipeed by setMyNewIdeaPosted(!myNewIdeaPosted). This change will be shared with ProfileScreen, and the useEffect will be called.

    const [myNewIdeaPosted, setMyNewIdeaPosted] = useState(false);
    return (
        <Tab.Navigator screenOptions={{ activeTintColor: '#900', inactiveTintColor: '#999' }}>
            <Tab.Screen
                name="Feed"
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color, size }) => {
                        return <AntDesign name="home" size={size} color={color} />;
                    },
                }}
            >
                {() => <FeedTopTabNavigator myNewIdeaPosted={myNewIdeaPosted} />}
            </Tab.Screen>
            <Tab.Screen
                name="Post"
                options={{
                    tabBarLabel: 'Post',
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome5 name="lightbulb" size={size} color={color} />;
                    },
                }}
            >
                {() => (
                    <PostScreen
                        myNewIdeaPosted={myNewIdeaPosted}
                        setMyNewIdeaPosted={setMyNewIdeaPosted}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Profile"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome5 name="user-circle" size={size} color={color} />;
                    },
                }}
            >
                {() => <ProfileScreen myNewIdeaPosted={myNewIdeaPosted} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};
