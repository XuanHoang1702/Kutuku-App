import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../API';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isTouchIDEnabled, setIsTouchIDEnabled] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API}/login`, {
                email: email,
                password: password,
            });
            const { user, token } = response.data;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            await AsyncStorage.setItem('pass_word', password);
            await AsyncStorage.setItem('token', token);
            Alert.alert('Success', 'Login successful!', [
                { text: 'OK', onPress: () => navigation.navigate('Tabs') },
            ]);
        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.error || 'Login failed!');
            } else {
                Alert.alert('Error', 'Network error!');
            }
        }
    };

    const handleFingerprintLogin = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!hasHardware || !isEnrolled) {
            Alert.alert('Error', 'Device does not support fingerprint authentication');
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate with fingerprint to log in',
            fallbackLabel: 'Enter password',
            
        });

        if (result.success) {
            try {
                const email = await AsyncStorage.getItem('touchIDEmail');
                const password = await AsyncStorage.getItem('touchIDPassword');
                if(email && password){
                    const response = await axios.post(`${API}/login`, {
                        email: email,
                        password: password,
                    });
                const { user, token } = response.data;
                await AsyncStorage.setItem('user', JSON.stringify(user));
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('password', password);
                Alert.alert('Success', 'Login successful!');
                navigation.navigate('Tabs');
            }else{
                Alert.alert('Error', 'Stored credentials not found. Please log in manually.')
            }
            } catch (error) {
                Alert.alert('Error', 'Could not retrieve token!');
            }
        } else {
            Alert.alert('Failed', 'Authentication failed');
        }
    };

    const handleForgotPass = () => {
        // Functionality for forgot password
    };

    useEffect(() => {
        const loadTouchIDSetting = async () => {
            const touchIDEnabled = await AsyncStorage.getItem('isTouchIDEnabled');
            setIsTouchIDEnabled(JSON.parse(touchIDEnabled));
        };
        loadTouchIDSetting();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Account</Text>
            <Text style={styles.subtitle}>Please login with your registered account</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                    <Icon name="envelope" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                    <Icon name="lock" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry
                        onChangeText={setPassword}
                        value={password}
                    />
                    <Icon name="eye" style={styles.icon} />
                </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPass}>
                <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {
                isTouchIDEnabled && (
                    <TouchableOpacity style={styles.fingerprintButton} onPress={handleFingerprintLogin}>
                        <MaterialCommunityIcons name="fingerprint" size={24} color="black" />
                        <Text style={styles.buttonText}>Sign In with Fingerprint</Text>
                    </TouchableOpacity>
                )
            }

            <Text style={styles.otherMethods}>Or using other methods</Text>

            <TouchableOpacity style={styles.socialButton}>
                <Icon name="google" style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Sign In with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
                <Icon name="facebook" style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Sign In with Facebook</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 10,
    },
    icon: {
        fontSize: 20,
        color: '#9CA3AF',
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    forgotPassword: {
        alignItems: 'flex-end',
    },
    link: {
        fontSize: 14,
        color: '#6366F1',
    },
    button: {
        backgroundColor: '#4F46E5',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    otherMethods: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginVertical: 20,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    socialIcon: {
        fontSize: 20,
        color: '#111827',
        marginRight: 10,
    },
    socialButtonText: {
        fontSize: 14,
        color: '#111827',
    },
    fingerprintButton: {
        backgroundColor: '#4F46E5',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
