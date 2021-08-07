import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';

// functions
import { getIdeas } from '../lib/firebase';

// components
import { IdeaCard } from '../components/IdeaCard';

export const FeedByDefaultScreen = () => {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        getIdeasFromFirebase();
    }, [ideas]);

    const getIdeasFromFirebase = async () => {
        const ideas = await getIdeas();
        setIdeas(ideas);
    };

    const onPressIdea = (idea) => {};

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={ideas}
                // renderItem is a function
                renderItem={({ item }) => {
                    return <IdeaCard idea={item} onPress={() => onPressIdea(item)} />;
                }}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
