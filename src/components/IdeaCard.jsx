import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
    Button,
    TouchableOpacity,
    Touchable,
} from 'react-native';
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

    const onSave = async () => {
        if ((await saveIdea(idea.id, user.id)) === 'saved') {
            setSaved(true);
        } else {
            setSaved(false);
        }
    };

    const onLike = async () => {
        if ((await likeIdea(idea.id, user.id)) === 'liked') {
            setLiked(true);
            setNumLikes(numlikes + 1);
        } else {
            setLiked(false);
            setNumLikes(numlikes - 1);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={toIdeaDetail}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.mainView}>
                <View style={styles.topSubView}>
                    <View style={styles.subView1}>
                        <View style={styles.posterView}>
                            <TouchableOpacity onPress={() => toPosterProfile(poster)}>
                                <Image
                                    style={styles.posterIcon}
                                    source={{ uri: poster.photoURL }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.posterName}
                                onPress={() => toPosterProfile(poster)}
                            >
                                <Text style={styles.posterNameText}>{poster.name}</Text>
                            </TouchableOpacity>
                        </View>
                        {media.map((image, index) => (
                            <Image style={styles.image} source={{ uri: image }} key={index} />
                        ))}
                    </View>
                    <View style={styles.subView2}>
                        <Text style={styles.description}>{description}</Text>
                        <View style={styles.otherCategories}>
                            {otherCategories.map((category, index) => (
                                <View style={styles.otherCategoryView}>
                                    <Text style={styles.otherCategoryText} key={index}>
                                        {category}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        {/* <View style={styles.openRoles}>
                            {openRoles.map((role, index) => (
                                <Text style={styles.openRole} key={index}>
                                    {role}
                                </Text>
                            ))}
                        </View> */}
                    </View>
                </View>
                <View style={styles.bottomSubView}>
                    <TouchableOpacity style={styles.collaborataButton}>
                        <Text style={styles.collaborataButtonText}>Collaborate</Text>
                    </TouchableOpacity>
                    <View style={styles.iconButtonsView}>
                        <TouchableOpacity style={styles.mailButton} onPress={sendEmail}>
                            <FontAwesome name="envelope-o" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={styles.likeView}>
                            <TouchableOpacity style={styles.likeButton} onPress={onLike}>
                                {liked ? (
                                    <FontAwesome name="heart" size={24} color="red" />
                                ) : (
                                    <FontAwesome name="heart-o" size={24} color="black" />
                                )}
                            </TouchableOpacity>
                            <Text style={styles.likeCount}>{numlikes}</Text>
                        </View>
                        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                            {saved ? (
                                <Fontisto name="bookmark-alt" size={24} color="black" />
                            ) : (
                                <Fontisto name="bookmark" size={24} color="black" />
                            )}
                        </TouchableOpacity>
                    </View>
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
    title: {
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
        marginBottom: 12,
        // backgroundColor: 'pink',
    },
    mainView: {
        // backgroundColor: 'red',
    },
    topSubView: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    subView1: {
        // backgroundColor: 'pink',
        flex: 0.4,
    },
    // mainCategory: {
    //     fontFamily: 'Helvetica',
    //     fontSize: 28,
    //     textTransform: 'capitalize',
    //     color: '#000',
    //     fontWeight: 'bold',
    // },
    posterView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    posterName: {
        flexShrink: 1,
        marginLeft: 4,
    },
    posterNameText: {
        fontFamily: 'Helvetica',
        fontSize: 12,
    },
    posterIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 12,
    },
    subView2: {
        marginLeft: 8,
        // backgroundColor: 'pink',
        flex: 0.6,
    },
    description: {
        fontFamily: 'Helvetica',
        fontSize: 15,
        color: '#000',
        marginBottom: 12,
    },
    otherCategories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'lightblue',
    },
    otherCategoryView: {
        backgroundColor: '#E0E0E0',
        borderRadius: 16,
        marginRight: 4,
        paddingTop: 2,
        paddingBottom: 3,
        paddingHorizontal: 4,
    },
    otherCategoryText: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: '#000',
    },
    // openRoles: {
    //     flexDirection: 'row',
    //     backgroundColor: 'lightblue',
    // },
    // openRole: {
    //     fontFamily: 'Helvetica',
    //     fontSize: 14,
    //     color: '#000',
    //     marginRight: 8,
    // },
    bottomSubView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
    },
    collaborataButton: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: '#F9D80D',
    },
    collaborataButtonText: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        fontWeight: 'bold',
    },
    iconButtonsView: {
        flexDirection: 'row',
        flex: 0.4,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        // backgroundColor: 'pink',
    },
    // mailButton: { backgroundColor: 'red' },
    likeView: { alignItems: 'center', marginHorizontal: 8 },
    // likeButton: { backgroundColor: 'red' },
    likeCount: { fontFamily: 'Helvetica', fontSize: 11 },
    saveButton: {},
});
