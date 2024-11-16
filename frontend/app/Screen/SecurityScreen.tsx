import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const SecurityScreen = () => {
    const navigation = useNavigation();
    const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
    const [isRememberPasswordEnabled, setIsRememberPasswordEnabled] = useState(false);
    const [isTouchIDEnabled, setIsTouchIDEnabled] = useState(false);

    useEffect(() => {
        const loadTouchIDSetting = async () => {
            try {    
                const touchIDEnabled = await AsyncStorage.getItem('isTouchIDEnabled');
                if (touchIDEnabled) setIsTouchIDEnabled(JSON.parse(touchIDEnabled));
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };
        loadTouchIDSetting();
    }, []);
    

    const toggleTouchID = async () => {
        const newValue = !isTouchIDEnabled;
        setIsTouchIDEnabled(newValue);
        await AsyncStorage.setItem('isTouchIDEnabled', JSON.stringify(newValue));
        if(newValue){
            const user = await AsyncStorage.getItem('user');
            const userData = JSON.parse(user);
            const pass_word = await AsyncStorage.getItem('pass_word');
            if(user && pass_word){
                await AsyncStorage.setItem('touchIDEmail', userData.email);
                await AsyncStorage.setItem('touchIDPassword', pass_word);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="chevron-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Security</Text>
                <TouchableOpacity>
                    <FontAwesome name="ellipsis-v" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.settingsContainer}>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Face ID</Text>
                    <Switch
                        value={isFaceIDEnabled}
                        onValueChange={() => setIsFaceIDEnabled(!isFaceIDEnabled)}
                        thumbColor={isFaceIDEnabled ? '#3333FF' : '#f4f3f4'}
                        trackColor={{ false: '#767577', true: '#3333FF' }}
                    />
                </View>

                <View style={styles.separator} />

                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Remember Password</Text>
                    <Switch
                        value={isRememberPasswordEnabled}
                        onValueChange={() => setIsRememberPasswordEnabled(!isRememberPasswordEnabled)}
                        thumbColor={isRememberPasswordEnabled ? '#3333FF' : '#f4f3f4'}
                        trackColor={{ false: '#767577', true: '#3333FF' }}
                    />
                </View>

                <View style={styles.separator} />

                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Touch ID</Text>
                    <Switch
                        value={isTouchIDEnabled}
                        onValueChange={toggleTouchID}
                        thumbColor={isTouchIDEnabled ? '#3333FF' : '#f4f3f4'}
                        trackColor={{ false: '#767577', true: '#3333FF' }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    settingsContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    settingText: {
        fontSize: 16,
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 8,
    },
});

export default SecurityScreen;
