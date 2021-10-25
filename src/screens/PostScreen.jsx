import React, { useState, useContext, useRef } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Button,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';
import { Video } from 'expo-av';

// functions
import { pickMedia } from '../lib/media-picker';
import { createIdeaRef, uploadMedia } from '../lib/firebase';
import { getExtension } from '../utils/file';
// components
import { Loading } from '../components/Loading';
// contexts
import { UserContext } from '../contexts/userContext';

export const PostScreen = ({ myNewIdeaPosted, setMyNewIdeaPosted }) => {
    const { user } = useContext(UserContext);
    const [mediaUri, setMediaUri] = useState('');
    const [mediaType, setMediaType] = useState('image');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [mainCategory, setMainCategory] = useState('');
    const [otherCategory1, setOtherCategory1] = useState('');
    const [otherCategory2, setOtherCategory2] = useState('');
    const [otherCategory3, setOtherCategory3] = useState('');
    const [description, setDescription] = useState('');
    const [openRoles, setOpenRoles] = useState('');
    const [mainCategorySelection, setMainCategorySelection] = useState([
        false,
        false,
        false,
        false,
        false,
    ]);

    const descriptionTextInput = useRef(null);
    const mainCategoryTextInput = useRef(null);
    const otherCategory1TextInput = useRef(null);
    const otherCategory2TextInput = useRef(null);
    const otherCategory3TextInput = useRef(null);
    const numMainCategories = 5;

    const onPickMedia = async () => {
        const result = await pickMedia();
        setMediaUri(result.uri);
        setMediaType(result.type);
    };

    const onSubmit = async () => {
        setLoading(true);

        // Upload media to Cloud Storage
        // Add a new document
        const ideaDocRef = await createIdeaRef();
        // Set the path of the media on Cloud Storage
        const ext = getExtension(mediaUri);
        const storagePath = `ideas/${ideaDocRef.id}.${ext}`;
        // Upload the image to Cloud Storage
        const donwloadUrl = await uploadMedia(mediaUri, storagePath);
        // Make a Review document

        // Upload an idea to Firestore
        const idea = {
            id: ideaDocRef.id,
            poster: {
                id: user.id,
                name: user.name,
                username: user.username,
                photoURL: user.photoURL,
            },
            title,
            description,
            mainCategory,
            otherCategories: [otherCategory1, otherCategory2, otherCategory3],
            openRoles: [openRoles],
            media: [donwloadUrl],
            likedBy: [],
            createdAt: firebase.firestore.Timestamp.now(),
            updatedAt: firebase.firestore.Timestamp.now(),
        };
        // Behind the scenes, .add(...) and .doc().set(...) are completely equivalent, so you can use whichever is more convenient.
        await ideaDocRef.set(idea);
        setLoading(false);
        setMyNewIdeaPosted(!myNewIdeaPosted);
    };

    const onSelectMainCategory = (categoryIndex) => {
        let newMainCategorySelection = [...mainCategorySelection];
        for (let i = 0; i < numMainCategories; i++) {
            if (mainCategorySelection[i] === true) {
                newMainCategorySelection[i] = false;
            }
        }
        newMainCategorySelection[categoryIndex] = true;
        setMainCategorySelection([...newMainCategorySelection]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                    keyboardVerticalOffset={0}
                > */}
                    <View style={styles.mainView}>
                        <Text style={styles.sectionTitle}>Idea Title</Text>
                        <TextInput
                            style={styles.titleInput}
                            value={title}
                            onChangeText={(input) => setTitle(input)}
                            autoFocus={true}
                            returnKeyType="next"
                            onSubmitEditing={() => descriptionTextInput.current.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.sectionTitle}>Description</Text>
                        <TextInput
                            style={styles.descriptionInput}
                            value={description}
                            onChangeText={(input) => setDescription(input)}
                            multiline={true}
                            ref={descriptionTextInput}
                            returnKeyType="next"
                            onSubmitEditing={() => mainCategoryTextInput.current.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.sectionTitle}>Category</Text>
                        <View style={styles.mainCategoryView}>
                            <TouchableOpacity
                                style={
                                    mainCategorySelection[0]
                                        ? {
                                              ...styles.mainCategoryButton,
                                              backgroundColor: '#FF6F62',
                                          }
                                        : {
                                              ...styles.mainCategoryButton,
                                              backgroundColor: '#ff6f6233',
                                          }
                                }
                                onPress={() => onSelectMainCategory(0)}
                            >
                                <Text
                                    style={
                                        mainCategorySelection[0]
                                            ? { ...styles.mainCategoryButtonText, color: 'black' }
                                            : {
                                                  ...styles.mainCategoryButtonText,
                                                  color: '#00000033',
                                              }
                                    }
                                >
                                    Just Idea
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    mainCategorySelection[1]
                                        ? {
                                              ...styles.mainCategoryButton,
                                              backgroundColor: '#97DDDD',
                                          }
                                        : {
                                              ...styles.mainCategoryButton,
                                              backgroundColor: '#97dddd33',
                                          }
                                }
                                onPress={() => onSelectMainCategory(1)}
                            >
                                <Text
                                    style={
                                        mainCategorySelection[1]
                                            ? { ...styles.mainCategoryButtonText, color: 'black' }
                                            : {
                                                  ...styles.mainCategoryButtonText,
                                                  color: '#00000033',
                                              }
                                    }
                                >
                                    For Fun
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    mainCategorySelection[2]
                                        ? {
                                              ...styles.mainCategoryButton,
                                              backgroundColor: '#F9AB12',
                                          }
                                        : {
                                              ...styles.mainCategoryButton,
                                              backgroundColor: '#f9ab1233',
                                          }
                                }
                                onPress={() => onSelectMainCategory(2)}
                            >
                                <Text
                                    style={
                                        mainCategorySelection[2]
                                            ? { ...styles.mainCategoryButtonText, color: 'black' }
                                            : {
                                                  ...styles.mainCategoryButtonText,
                                                  color: '#00000033',
                                              }
                                    }
                                >
                                    Personal
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    mainCategorySelection[3]
                                        ? {
                                              ...styles.mainCategoryButton,
                                              backgroundColor: '#D3DE16',
                                          }
                                        : {
                                              ...styles.mainCategoryButton,
                                              backgroundColor: '#d3de1633',
                                          }
                                }
                                onPress={() => onSelectMainCategory(3)}
                            >
                                <Text
                                    style={
                                        mainCategorySelection[3]
                                            ? { ...styles.mainCategoryButtonText, color: 'black' }
                                            : {
                                                  ...styles.mainCategoryButtonText,
                                                  color: '#00000033',
                                              }
                                    }
                                >
                                    Academic
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    mainCategorySelection[4]
                                        ? {
                                              ...styles.mainCategoryButton,
                                              backgroundColor: '#C286FF',
                                          }
                                        : {
                                              ...styles.mainCategoryButton,
                                              backgroundColor: '#c286ff33',
                                          }
                                }
                                onPress={() => onSelectMainCategory(4)}
                            >
                                <Text
                                    style={
                                        mainCategorySelection[4]
                                            ? { ...styles.mainCategoryButtonText, color: 'black' }
                                            : {
                                                  ...styles.mainCategoryButtonText,
                                                  color: '#00000033',
                                              }
                                    }
                                >
                                    Projects
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.mainCategoryInput}
                            value={mainCategory}
                            onChangeText={(input) => setMainCategory(input)}
                            ref={mainCategoryTextInput}
                            returnKeyType="next"
                            onSubmitEditing={() => otherCategory1TextInput.current.focus()}
                            blurOnSubmit={false}
                        />
                        {/* <TextInput
                            style={styles.mainCategoryInput}
                            value={mainCategory}
                            onChangeText={(input) => setMainCategory(input)}
                            ref={mainCategoryTextInput}
                            returnKeyType="next"
                            onSubmitEditing={() => otherCategory1TextInput.current.focus()}
                            blurOnSubmit={false}
                        /> */}
                        <Text style={styles.sectionTitle}>Tag</Text>
                        <TextInput
                            style={styles.otherCategoryInput}
                            value={otherCategory1}
                            onChangeText={(input) => setOtherCategory1(input)}
                            ref={otherCategory1TextInput}
                            returnKeyType="next"
                            onSubmitEditing={() => otherCategory2TextInput.current.focus()}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={styles.otherCategoryInput}
                            value={otherCategory2}
                            onChangeText={(input) => setOtherCategory2(input)}
                            ref={otherCategory2TextInput}
                            returnKeyType="next"
                            onSubmitEditing={() => otherCategory3TextInput.current.focus()}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={styles.mainCategoryInput}
                            value={otherCategory3}
                            onChangeText={(input) => setOtherCategory3(input)}
                            ref={otherCategory3TextInput}
                            returnKeyType="done"
                        />
                        {/* <Text style={styles.sectionTitle}>Roles Needed</Text>
                <TextInput
                    style={styles.roleInput}
                    value={openRoles}
                    onChangeText={(input) => setOpenRoles(input)}
                /> */}
                        {/* <Text style={styles.sectionTitle}>Media</Text>
                <Button title="Upload" onPress={onPickMedia} />
                {mediaType == 'image'
                    ? !!mediaUri && <Image source={{ uri: mediaUri }} style={styles.media} />
                    : !!mediaUri && <Video source={{ uri: mediaUri }} style={styles.media} />} */}
                        <TouchableOpacity style={styles.postButton} onPress={onSubmit}>
                            <Text style={styles.postButtonText}>Post My Idea!</Text>
                        </TouchableOpacity>
                    </View>
                    {/* </KeyboardAvoidingView> */}
                </TouchableWithoutFeedback>
                <Loading visible={loading} />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        // padding: 16,
    },
    mainView: {
        margin: 16,
        justifyContent: 'flex-start',
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 8,
    },
    titleInput: {
        fontSize: 16,
        height: 36,
        borderColor: '#999',
        borderWidth: 0.5,
        borderRadius: 10,
        marginBottom: 32,
        paddingHorizontal: 10,
    },
    descriptionInput: {
        fontSize: 16,
        height: 108,
        borderColor: '#999',
        borderWidth: 0.5,
        borderRadius: 10,
        marginBottom: 32,
        paddingHorizontal: 10,
    },
    mainCategoryView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    mainCategoryButton: {
        height: width * 0.1,
        width: width * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.1,
        marginBottom: 8,
        marginRight: 8,
    },
    mainCategoryButtonText: {
        fontSize: 16,
    },
    mainCategoryInput: {
        fontSize: 16,
        height: 36,
        borderColor: '#999',
        borderWidth: 0.5,
        borderRadius: 10,
        marginBottom: 32,
        paddingHorizontal: 10,
    },
    otherCategoryInput: {
        fontSize: 16,
        height: 36,
        borderColor: '#999',
        borderWidth: 0.5,
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    roleInput: {
        height: 22,
        borderColor: '#999',
        borderWidth: 0.5,
        marginBottom: 32,
    },
    media: {
        width: 100,
        height: 100,
        margin: 8,
    },
    postButton: {
        height: width * 0.12,
        width: width * 0.6,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.12,
        backgroundColor: '#F9D80D',
        marginBottom: 8,
    },
    postButtonText: {
        fontFamily: 'Helvetica',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
