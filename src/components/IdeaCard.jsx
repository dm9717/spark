import React from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export const IdeaCard = ({ idea, onPress }) => {
    const { description, images, main_category, open_roles, other_categories, title } = idea;
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.mainCategory}>{main_category}</Text>
            <View style={styles.mainView}>
                <View style={styles.subView1}>
                    {images.map((image, index) => (
                        <Image style={styles.image} source={{ uri: image }} key={index} />
                    ))}
                </View>
                <View style={styles.subView2}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.otherCategories}>
                        {other_categories.map((category, index) => (
                            <Text style={styles.otherCategory} key={index}>
                                {category}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.openRoles}>
                        {open_roles.map((role, index) => (
                            <Text style={styles.openRole} key={index}>
                                {role}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D3DE16',
        borderRadius: 30,
        marginTop: 16,
        marginHorizontal: 16,
        padding: 16,
        width: width - 32,
    },
    mainView: {
        flexDirection: 'row',
        // backgroundColor: 'red',
    },
    subView1: {
        marginTop: 8,
        // backgroundColor: 'pink',
    },
    image: {
        width: (width - 32) * 0.35,
        height: (width - 32) * 0.35,
    },
    subView2: {
        marginTop: 8,
        marginLeft: 8,
        // backgroundColor: 'pink',
        flex: 1,
    },
    mainCategory: {
        fontFamily: 'Helvetica',
        fontSize: 28,
        textTransform: 'capitalize',
        color: '#000',
        fontWeight: 'bold',
    },
    title: {
        fontFamily: 'Helvetica',
        fontSize: 18,
        color: '#000',
        marginBottom: 8,
    },
    description: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        color: '#000',
        marginBottom: 8,
    },
    otherCategories: {
        flexDirection: 'row',
        marginBottom: 8,
        flexWrap: 'wrap',
        // backgroundColor: 'lightblue',
    },
    otherCategory: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        color: '#000',
        marginRight: 8,
    },
    openRoles: {
        flexDirection: 'row',
        // backgroundColor: 'lightblue',
    },
    openRole: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        color: '#000',
        marginRight: 8,
    },
});
