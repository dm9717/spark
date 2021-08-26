import React, { useEffect } from 'react';
import { Text } from 'react-native';

export const IdeaDetailScreen = ({ navigation, route }) => {
    const { idea } = route.params;
    useEffect(() => {
        navigation.setOptions({ title: idea.title });
    }, []);
    return <Text>IdeaDetailScreen</Text>;
};
