import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image } from 'react-native';
import { Video } from 'expo-av';

// functions
import { pickMedia } from '../lib/media-picker';

export const PostScreen = () => {
    const [mediaUri, setMediaUri] = useState('');
    const [mediaType, setMediaType] = useState('image');

    const onPickMedia = async () => {
        const result = await pickMedia();
        setMediaUri(result.uri);
        setMediaType(result.type);
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Project Title</Text>
            <TextInput style={styles.titleInput} />
            <Text style={styles.sectionTitle}>Description</Text>
            <TextInput style={styles.descriptionInput} multiline={true} />
            <Text style={styles.sectionTitle}>Add Tags</Text>
            <TextInput style={styles.tagInput} />
            <Text style={styles.sectionTitle}>Add Open Roles</Text>
            <TextInput style={styles.roleInput} />
            <Text style={styles.sectionTitle}>Add Media</Text>
            <Button title="Upload" onPress={onPickMedia} />
            {mediaType == 'image'
                ? !!mediaUri && <Image source={{ uri: mediaUri }} style={styles.media} />
                : !!mediaUri && <Video source={{ uri: mediaUri }} style={styles.media} />}
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
