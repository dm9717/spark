import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Text,
    Touchable,
} from 'react-native';

export const UserIdeas = ({ myIdeas, toIdeaDetail }) => {
    return (
        <ScrollView>
            <View style={styles.ideaView}>
                {myIdeas.map((idea, index) => (
                    <TouchableOpacity
                        style={styles.idea}
                        key={index}
                        onPress={() => toIdeaDetail(idea)}
                    >
                        <Text style={styles.ideaTitle}>{idea.title}</Text>
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
