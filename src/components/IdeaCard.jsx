import React from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export const IdeaCard = ({ idea, onPress }) => {
    const { description, images, main_category, open_roles, other_categories, title } = idea;
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.mainCategory}>{main_category}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            {other_categories.map((category, index) => (
                <Text style={styles.otherCategory} key={index}>
                    {category}
                </Text>
            ))}
            {images.map((image, index) => (
                <Image style={styles.image} source={{ uri: image }} key={index} />
            ))}
            {open_roles.map((role, index) => (
                <Text style={styles.openRole} key={index}>
                    {role}
                </Text>
            ))}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        margin: 16,
        padding: 16,
    },
    mainCategory: {
        fontSize: 28,
        color: '#000',
        marginTop: 8,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        color: '#000',
        marginTop: 8,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#000',
        marginTop: 8,
    },
    otherCategory: {
        fontSize: 14,
        color: '#000',
        marginTop: 8,
    },
    image: {
        width: (width - 32) * 0.8,
        height: (width - 32) * 0.8 * 0.8,
    },
    openRole: {
        fontSize: 14,
        color: '#000',
        marginTop: 8,
    },
});
