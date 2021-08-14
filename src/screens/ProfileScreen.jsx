import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Button,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// contexts
import { UserContext } from '../contexts/userContext';
import { MyIdeaContext } from '../contexts/myIdeaContext';
// functions
import { getIdeas } from '../lib/firebase';
import { signOutWithGoogle } from '../lib/firebase';
// components
import { Loading } from '../components/Loading';

export const ProfileScreen = () => {
    const { user, setUser } = useContext(UserContext);
    const { myIdeas, setMyIdeas } = useContext(MyIdeaContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getIdeasFromFirebase();
    }, []);

    const getIdeasFromFirebase = async () => {
        const ideas = await getIdeas();
        setMyIdeas(ideas);
    };

    const signOut = async () => {
        setLoading(true);
        await signOutWithGoogle(user.accessToken);
        removeUserData();
        setLoading(false);
        setUser(null);
    };

    const removeUserData = async () => {
        try {
            await AsyncStorage.removeItem('user');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.profile}>
                <Image style={styles.image} source={{ uri: user.photoURL }} />
                <Text style={styles.name}>{user.name}</Text>
                <Button title="Sign out" onPress={signOut} />
            </View>
            <View style={styles.ideaView}>
                {myIdeas.map((item, index) => (
                    <TouchableOpacity style={styles.idea} key={index}>
                        <Text style={styles.ideaTitle}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Loading visible={loading} />
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
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
