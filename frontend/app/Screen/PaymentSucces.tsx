import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const PaymentSuccess = () => {
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeIn" duration={1500} style={styles.animationContainer}>
                <Text style={styles.successMessage}>🎉 Payment Successful!</Text>
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    animationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F46E5',
        borderRadius: 20,
        padding: 20,
    },
    successMessage: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default PaymentSuccess;
