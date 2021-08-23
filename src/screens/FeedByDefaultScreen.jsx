import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// functions
import { getAllIdeas } from '../lib/firebase';
// components
import { IdeaCard } from '../components/IdeaCard';
// contexts
import { UserContext } from '../contexts/userContext';

export const FeedByDefaultScreen = ({ myNewIdeaPosted }) => {
    const navigation = useNavigation();
    const { user } = useContext(UserContext);
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        getIdeasFromFirebase();
    }, [myNewIdeaPosted]);

    const getIdeasFromFirebase = async () => {
        const ideas = await getAllIdeas();
        setIdeas(ideas);
    };

    const toIdeaDetail = (idea) => {
        navigation.navigate('Idea Detail', { idea });
    };

    const toPosterProfile = (user) => {
        navigation.navigate('User Profile', { user });
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={ideas}
                // renderItem is a function
                renderItem={({ item }) => {
                    return (
                        <IdeaCard
                            idea={item}
                            toIdeaDetail={() => toIdeaDetail(item)}
                            toPosterProfile={toPosterProfile}
                            user={user}
                        />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
            />
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
