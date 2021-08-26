import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
    Text,
    Button,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

// functions
import { getUsersIdeas } from '../lib/firebase';

export const PosterProfileScreen = ({ navigation, route }) => {
    const { poster } = route.params;
    const [postersIdeas, setPostersIdeas] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: poster.username });
        getMyIdeasFromFirebase();
    }, []);

    const getMyIdeasFromFirebase = async () => {
        const ideas = await getUsersIdeas(poster.id);
        setPostersIdeas(ideas);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.image} source={{ uri: poster.photoURL }} />
                <Text style={styles.name}>{poster.name}</Text>
            </View>
            <ScrollView>
                <View style={styles.ideaView}>
                    {postersIdeas.map((item, index) => (
                        <TouchableOpacity style={styles.idea} key={index}>
                            <Text style={styles.ideaTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile: {
        flexDirection: 'row',
        margin: 32,
    },
    image: {
        width: (width - 32) * 0.25,
        height: (width - 32) * 0.25,
        borderRadius: ((width - 32) * 0.25) / 2,
    },
    name: {
        fontFamily: 'HelveticaNeue',
        marginTop: 16,
        marginLeft: 16,
    },
    ideaView: {
        margin: 24,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    idea: {
        backgroundColor: '#FF6F62',
        borderRadius: 30,
        width: (width - 96) / 3,
        height: (width - 96) / 3,
        margin: 8,
    },
    ideaTitle: {
        fontFamily: 'Helvetica',
        margin: 12,
    },
});
