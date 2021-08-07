import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image } from 'react-native';
import firebase from 'firebase';
import { Video } from 'expo-av';

// functions
import { pickMedia } from '../lib/media-picker';
import { createIdeaRef, uploadMedia } from '../lib/firebase';
import { getExtension } from '../utils/file';

// components
import { Loading } from '../components/Loading';

export const PostScreen = () => {
    const [mediaUri, setMediaUri] = useState('');
    const [mediaType, setMediaType] = useState('image');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
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
            // user: {
            //     name: user.name,
            //     id: user.id,
            // },
            title: title,
            description: description,
            main_category: tags,
            other_categories: [tags],
            open_roles: [openRoles],
            images: [donwloadUrl],
            created_at: firebase.firestore.Timestamp.now(),
        };
        // Behind the scenes, .add(...) and .doc().set(...) are completely equivalent, so you can use whichever is more convenient.
        await ideaDocRef.set(idea);
        setLoading(false);
    };

    return (
        <ScrollView style={styles.container}>
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
            <Text style={styles.sectionTitle}>Add Tags</Text>
            <TextInput
                style={styles.tagInput}
                value={tags}
                onChangeText={(input) => setTags(input)}
            />
            <Text style={styles.sectionTitle}>Add Open Roles</Text>
            <TextInput
                style={styles.roleInput}
                value={openRoles}
                onChangeText={(input) => setOpenRoles(input)}
            />
            <Text style={styles.sectionTitle}>Add Media</Text>
            <Button title="Upload" onPress={onPickMedia} />
            {mediaType == 'image'
                ? !!mediaUri && <Image source={{ uri: mediaUri }} style={styles.media} />
                : !!mediaUri && <Video source={{ uri: mediaUri }} style={styles.media} />}
            <Button title="Post My Idea!" onPress={onSubmit} />
            <Loading visible={loading} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
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
    tagInput: {
        height: 22,
        borderColor: '#999',
        borderWidth: 0.5,
        marginBottom: 32,
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
