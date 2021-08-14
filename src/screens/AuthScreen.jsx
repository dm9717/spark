import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// functions
import { signInWithGoogle } from '../lib/firebase';
// contexts
import { UserContext } from '../contexts/userContext';
// components
import { Loading } from '../components/Loading';

export const AuthScreen = () => {
    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        setLoading(true);
        const user = await signInWithGoogle();
        setUser(user);
        storeUserData(user);
    };

    const storeUserData = async (user) => {
        try {
            const jsonUser = JSON.stringify(user);
            await AsyncStorage.setItem('user', jsonUser);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoAndLoginText}>
                <Image style={styles.logo} source={require('../../assets/images/logo.png')}></Image>
                <Text style={styles.loginText}>Login</Text>
            </View>
            <TouchableOpacity onPress={signIn}>
                <Image
                    style={styles.googleButton}
                    source={require('../../assets/images/btn_google_signin_dark_normal_web_2x.png')}
                />
            </TouchableOpacity>
            <Loading visible={loading} />
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoAndLoginText: {
        marginTop: 64,
        alignItems: 'center',
    },
    logo: {
        width: width * 0.4,
        marginBottom: 32,
        resizeMode: 'contain',
    },
    loginText: {
        fontFamily: 'Helvetica',
        fontSize: 32,
        color: '#8C8B8B',
    },
    googleButton: {
        width: width * 0.7,
        marginBottom: 64,
        alignItems: 'center',
        resizeMode: 'contain',
    },
});
