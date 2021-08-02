import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
    useFonts,
    JosefinSans_400Regular,
    JosefinSans_300Light,
    JosefinSans_200ExtraLight,
} from '@expo-google-fonts/josefin-sans';
import AppLoading from 'expo-app-loading';
import Logo from './assets/images/logo.svg';

export default function App() {
    let [fontsLoaded] = useFonts({
        JosefinSans_400Regular,
        JosefinSans_300Light,
        JosefinSans_200ExtraLight,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <Logo height={213} width={189.42} marginBottom={30} />
                <Text style={styles.logoText}>TeamSpark</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontFamily: 'JosefinSans_200ExtraLight',
        fontSize: 30,
    },
});
