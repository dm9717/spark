import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Button,
    Image,
    SafeAreaView,
} from 'react-native';
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.sectionTitle}>Project Title</Text>
                <TextInput
                    style={styles.titleInput}
                    value={title}
                    onChangeText={(input) => setTitle(input)}
                />
                <Text style={styles.sectionTitle}>Description</Text>
                <TextInput
                    style={styles.descriptionInput}
                    value={description}
                    onChangeText={(input) => setDescription(input)}
                    multiline={true}
                />
                <Text style={styles.sectionTitle}>Main Category</Text>
                <TextInput
                    style={styles.mainCategoryInput}
                    value={mainCategory}
                    onChangeText={(input) => setMainCategory(input)}
                />
                <Text style={styles.sectionTitle}>Other Categories</Text>
                <TextInput
                    style={styles.otherCategoryInput}
                    value={otherCategory1}
                    onChangeText={(input) => setOtherCategory1(input)}
                />
                <TextInput
                    style={styles.otherCategoryInput}
                    value={otherCategory2}
                    onChangeText={(input) => setOtherCategory2(input)}
                />
                <TextInput
                    style={styles.mainCategoryInput}
                    value={otherCategory3}
                    onChangeText={(input) => setOtherCategory3(input)}
                />
                <Text style={styles.sectionTitle}>Roles Needed</Text>
                <TextInput
                    style={styles.roleInput}
                    value={openRoles}
                    onChangeText={(input) => setOpenRoles(input)}
                />
                <Text style={styles.sectionTitle}>Media</Text>
                <Button title="Upload" onPress={onPickMedia} />
                {mediaType == 'image'
                    ? !!mediaUri && <Image source={{ uri: mediaUri }} style={styles.media} />
                    : !!mediaUri && <Video source={{ uri: mediaUri }} style={styles.media} />}
                <Button title="Post My Idea!" onPress={onSubmit} />
                <Loading visible={loading} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        // padding: 16,
    },
    sectionTitle: {
        fontSize: 22,
        marginBottom: 8,
    },
    titleInput: {
        height: 22,
        borderColor: '#999',
        borderWidth: 0.5,
        marginBottom: 32,
    },
    descriptionInput: {
        height: 66,
        borderColor: '#999',
        borderWidth: 0.5,
        marginBottom: 32,
    },
    mainCategoryInput: {
        height: 22,
        borderColor: '#999',
        borderWidth: 0.5,
        marginBottom: 32,
    },
    otherCategoryInput: {
        height: 22,
        borderColor: '#999',
        borderWidth: 0.5,
        marginBottom: 8,
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
});
