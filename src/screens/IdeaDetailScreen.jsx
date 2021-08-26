import React, { useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

// functions
import { deleteMyIdea, unsaveIdea } from '../lib/firebase';
// contexts
import { UserContext } from '../contexts/userContext';

export const IdeaDetailScreen = ({ navigation, route }) => {
    const { idea, fromWhere } = route.params;
    const { user } = useContext(UserContext);
    const ifUsersPost = idea.poster.id == user.id;
    useEffect(() => {
        navigation.setOptions({ title: idea.title });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text>IdeaDetailScreen</Text>
            {ifUsersPost ? (
                <TouchableOpacity
                    onPress={async () => {
                        await deleteMyIdea(idea.id);
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.deleteButtonText}>Delete this idea</Text>
                </TouchableOpacity>
            ) : null}
            {fromWhere === 'savedIdeas' ? (
                <TouchableOpacity
                    onPress={async () => {
                        await unsaveIdea(idea.id, user.id);
                    }}
                >
                    <Text style={styles.unsaveButtonText}>Unsave this idea</Text>
                </TouchableOpacity>
            ) : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    deleteButtonText: {
        color: 'red',
    },
    unsaveButtonText: {
        color: 'blue',
    },
});
