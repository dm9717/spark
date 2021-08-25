import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, Button, TouchableOpacity } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { Ionicons, FontAwesome5, FontAwesome, Fontisto } from '@expo/vector-icons';

// functions
import { saveIdea, likeIdea } from '../lib/firebase';

export const IdeaCard = ({ idea, toIdeaDetail, toPosterProfile, user }) => {
    const { description, media, mainCategory, openRoles, otherCategories, title, poster, likedBy } =
        idea;
    const [numlikes, setNumLikes] = useState(likedBy.length);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const sendEmail = async () => {
        const status = MailComposer.composeAsync({
            recipients: [poster.username],
            subject: 'Interest in your idea on Spark',
            body:
                'Hi ' +
                poster.name +
                ',\n\n' +
                'Your idea is awesome. I would love to collaborate.',
        });
        console.log(status);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={toIdeaDetail}>
            <Text style={styles.mainCategory}>{mainCategory}</Text>
            <TouchableOpacity style={styles.posterButton} onPress={() => toPosterProfile(poster)}>
                <Text style={styles.posterButtonText}>{poster.username}</Text>
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
                    <TouchableOpacity
                        onPress={async () => {
                            if ((await saveIdea(idea.id, user.id)) === 'saved') {
                                setSaved(true);
                            } else {
                                setSaved(false);
                            }
                        }}
                    >
                        {saved ? (
                            <Fontisto name="bookmark-alt" size={24} color="black" />
                        ) : (
                            <Fontisto name="bookmark" size={24} color="black" />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            if ((await likeIdea(idea.id, user.id)) === 'liked') {
                                setLiked(true);
                                setNumLikes(numlikes + 1);
                            } else {
                                setLiked(false);
                                setNumLikes(numlikes - 1);
                            }
                        }}
                    >
                        {liked ? (
                            <FontAwesome name="heart" size={24} color="red" />
                        ) : (
                            <FontAwesome name="heart-o" size={24} color="black" />
                        )}
                    </TouchableOpacity>
                    <Text>{numlikes}</Text>
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
    posterButton: {},
    posterButtonText: {
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
