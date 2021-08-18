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
import { getMyIdeas } from '../lib/firebase';

export const UserProfileScreen = ({ navigation, route }) => {
    const { user } = route.params;
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: user.username });
        getMyIdeasFromFirebase();
    }, []);

    const getMyIdeasFromFirebase = async () => {
        const ideas = await getMyIdeas(user.id);
        setIdeas(ideas);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.image} source={{ uri: user.photoURL }} />
                <Text style={styles.name}>{user.name}</Text>
            </View>
            <ScrollView>
                <View style={styles.ideaView}>
                    {ideas.map((item, index) => (
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
