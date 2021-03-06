import React, { useState } from 'react';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

// Navigators
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedStackNavigator } from './FeedStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';

// Screens
import { PostScreen } from '../screens/PostScreen';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
    // When an user posts an idea, myNewIdeaPosted's value will be flipped, and useEffect in ProfileScreen.jsx will be called. Basically, if a user posts an idea on PostScreen, the value of myNewIdeaPosted will be flipeed by setMyNewIdeaPosted(!myNewIdeaPosted). This change will be shared with ProfileScreen, and the useEffect will be called.
    const [myNewIdeaPosted, setMyNewIdeaPosted] = useState(false);

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="FeedStackNavigator"
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color, size }) => {
                        return <AntDesign name="home" size={size} color={color} />;
                    },
                    headerShown: false,
                }}
            >
                {() => <FeedStackNavigator myNewIdeaPosted={myNewIdeaPosted} />}
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
                name="ProfileStackNavigator"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome5 name="user-circle" size={size} color={color} />;
                    },
                    headerShown: false,
                }}
            >
                {() => <ProfileStackNavigator myNewIdeaPosted={myNewIdeaPosted} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};
