import React from 'react';
import { View, StyleSheet, Text, Dimensions, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';
import { Ionicons } from '@expo/vector-icons';

export const IdeaCard = ({ idea, toIdeaDetail, toUserProfile }) => {
    const { description, media, mainCategory, openRoles, otherCategories, title, user } = idea;

    const sendEmail = async () => {
        const status = MailComposer.composeAsync({
            recipients: [user.username],
            subject: 'Interest in your idea on Spark',
            body:
                'Hi ' + user.name + ',\n\n' + 'Your idea is awesome. I would love to collaborate.',
        });

        console.log(status);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={toIdeaDetail}>
            <Text style={styles.mainCategory}>{mainCategory}</Text>
            <TouchableOpacity style={styles.userButton} onPress={() => toUserProfile(user)}>
                <Text style={styles.userButtonText}>{user.username}</Text>
            </TouchableOpacity>
            <View style={styles.mainView}>
                <View style={styles.subView1}>
                    {media.map((image, index) => (
                        <Image style={styles.image} source={{ uri: image }} key={index} />
                    ))}
                </View>
                <View style={styles.subView2}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.otherCategories}>
                        {otherCategories.map((category, index) => (
                            <Text style={styles.otherCategory} key={index}>
                                {category}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.openRoles}>
                        {openRoles.map((role, index) => (
                            <Text style={styles.openRole} key={index}>
                                {role}
                            </Text>
                        ))}
                    </View>
                    <TouchableOpacity onPress={sendEmail}>
                        <Ionicons name="ios-mail-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D3DE16',
        borderRadius: 30,
        marginTop: 16,
        marginHorizontal: 16,
        padding: 16,
        width: width - 32,
    },
    mainCategory: {
        fontFamily: 'Helvetica',
        fontSize: 28,
        textTransform: 'capitalize',
        color: '#000',
        fontWeight: 'bold',
    },
    userButton: {},
    userButtonText: {
        fontFamily: 'Helvetica',
        color: 'blue',
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
