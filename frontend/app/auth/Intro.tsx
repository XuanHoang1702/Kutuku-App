import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const Intro = ({ navigation }:{navigation:any}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Wellcome');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kutuku</Text>
            <Text style={styles.subtitle}>Any shopping just from home</Text>
            <Text style={styles.version}>Version 0.0.1</Text>
        </View>
    );
};
export default Intro;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3333FF',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
    },
    version: {
        position: 'absolute',
        bottom: 20,
        color: 'white',
    },
});
