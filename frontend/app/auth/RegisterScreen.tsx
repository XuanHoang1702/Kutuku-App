import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../API';
const RegisterScreen = ({ navigation }:{navigation:any}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const handleRegister = async () => {
        try {
            const response = await axios.post(`${API}/register`, {
                name,
                email,
                phone,
                password,
            });

            if (response.status === 201) {
                Alert.alert('Success', 'Registration successful!', [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('LoginScreen'), 
                    },
                ]);
            }
        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message || 'Registration failed!');
            } else {
                Alert.alert('Error', 'An unexpected error occurred.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start learning with create your account</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.inputWrapper}>
                    <Icon name="user" style={styles.icon} />
                    <TextInput 
                        placeholder="Create your username" 
                        style={styles.input} 
                        value={name}
                        onChangeText={setName}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                    <Icon name="envelope" style={styles.icon} />
                    <TextInput 
                        placeholder="Enter your email" 
                        style={styles.input} 
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone</Text>
                <View style={styles.inputWrapper}>
                    <Icon name="phone" style={styles.icon} />
                    <TextInput 
                        placeholder="Enter your phone" 
                        style={styles.input} 
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                    <Icon name="lock" style={styles.icon} />
                    <TextInput 
                        placeholder="Create your password" 
                        secureTextEntry 
                        style={styles.input} 
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Icon name="eye" style={styles.icon} />
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or using other method</Text>

            <TouchableOpacity style={styles.socialButton}>
                <Image 
                    source={{ uri: 'https://placehold.co/20x20' }} 
                    style={styles.socialIcon} 
                />
                <Text style={styles.socialButtonText}>Sign Up with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
                <Image 
                    source={{ uri: 'https://placehold.co/20x20' }} 
                    style={styles.socialIcon} 
                />
                <Text style={styles.socialButtonText}>Sign Up with Facebook</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
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
        fontSize: 16,
        color: '#9CA3AF',
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        backgroundColor: 'transparent',
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
        fontWeight: '600',
        fontSize: 16,
    },
    orText: {
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
        width: 20,
        height: 20,
        marginRight: 10,
    },
    socialButtonText: {
        fontSize: 14,
        color: '#111827',
    },
});

export default RegisterScreen;
