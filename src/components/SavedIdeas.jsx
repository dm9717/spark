import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';

export const SavedIdeas = ({ savedIdeas }) => {
    return (
        <ScrollView>
            <View style={styles.ideaView}>
                {savedIdeas.map((item, index) => (
                    <TouchableOpacity style={styles.idea} key={index}>
                        <Text style={styles.ideaTitle}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {},
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
