import React, { useEffect } from 'react';
import { Text } from 'react-native';

export const UserProfileScreen = ({ navigation, route }) => {
    const { user } = route.params;
    useEffect(() => {
        navigation.setOptions({ title: user.username });
    }, []);
    return <Text>UserProfileScreen</Text>;
};
