import React, { useContext, useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// contexts
import { UserContext } from '../contexts/userContext';
// functions
import { getUsersIdeas, getSavedIdeas } from '../lib/firebase';
import { signOutWithGoogle } from '../lib/firebase';
// components
import { Loading } from '../components/Loading';
// navigators
import { ProfileTabNavigator } from '../navigation/ProfileTabNavigator';

export const ProfileScreen = ({ myNewIdeaPosted }) => {
    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);
    const [myIdeas, setMyIdeas] = useState([]);
    const [savedIdeas, setSavedIdeas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMyIdeasFromFirebase();
    }, [myNewIdeaPosted]);

    useEffect(() => {
        getSavedIdeasFromFirebase();
    });

    const getMyIdeasFromFirebase = async () => {
        const ideas = await getUsersIdeas(user.id);
        setMyIdeas(ideas);
    };

    const getSavedIdeasFromFirebase = async () => {
        const ideas = await getSavedIdeas(user.id);
        setSavedIdeas(ideas);
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

    const toIdeaDetail = (idea, fromWhere = null) => {
        navigation.navigate('Idea Detail', { idea, fromWhere });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.image} source={{ uri: user.photoURL }} />
                <Text style={styles.name}>{user.name}</Text>
                <Button title="Sign out" onPress={signOut} />
            </View>
            <ProfileTabNavigator
                myIdeas={myIdeas}
                savedIdeas={savedIdeas}
                toIdeaDetail={toIdeaDetail}
            />
            <Loading visible={loading} />
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
});
