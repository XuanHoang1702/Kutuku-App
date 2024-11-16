import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API from '../API';

export default function Header({ navigation }) {
    const [user, setUser] = useState(null);
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                setUser(user);
                const imageUrl = `${API}/user/${user.id}/profile`;
                if (user.image) {
                    setImageUri(imageUrl);
                } else {
                    setImageUri(require('../../assets/images/Default.jpg'));
                }
            }
        };
        fetchUser();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={imageUri ? { uri: imageUri } : require('../../assets/images/Default.jpg')}
                    style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.greeting}>Hi, {user?.name}</Text>
                    <Text style={styles.subtitle}>Let's go shopping</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <FontAwesome name="search" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bellContainer} onPress={() => navigation.navigate('NotificationScreen')}>
                    <FontAwesome name="bell" size={24} color="gray" />
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        marginLeft: 12,
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bellContainer: {
        position: 'relative',
        marginLeft: 20,
    },
    notificationDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 8,
        height: 8,
        backgroundColor: 'red',
        borderRadius: 4,
    },
});
