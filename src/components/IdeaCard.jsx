import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const CONTAINER_WIDTH = width * 0.95;
const PADDING = 16;
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2;

export const IdeaCard = ({ idea, onPress }) => {
    const { description, images, main_category, open_roles, other_categories, title } = idea;
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.nameText}>{description}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        margin: 16,
        padding: 16,
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_WIDTH * 0.7,
    },
    nameText: {
        fontSize: 16,
        color: '#000',
        marginTop: 8,
        fontWeight: 'bold',
    },
    placeText: {
        fontSize: 12,
        color: '#888',
        marginTop: 8,
    },
});
