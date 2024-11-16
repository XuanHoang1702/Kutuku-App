import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Alert, SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingScreen = () => {
    const navigation = useNavigation();
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            Alert.alert("Logout", "You have been logged out successfully.");
            navigation.navigate('Wellcome');
        } catch (error) {
            console.log("Error logging out: ", error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="chevron-left" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
                <Icon name="ellipsis-v" size={24} color="gray" />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>General</Text>
                {generalSettings.map((setting, index) => (
                    <TouchableOpacity
                    key={index}
                    style={styles.item}
                    onPress={() => setting.onPress && navigation.navigate(setting.onPress)}
                >
                    <View style={styles.itemContent}>
                        <Icon name={setting.icon} size={20} color="#333" />
                        <Text style={styles.itemText}>{setting.label}</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
                
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferences</Text>
                {preferenceSettings.map((setting, index) => (
                    <TouchableOpacity key={index} style={styles.item}>
                        <View style={styles.itemContent}>
                            <Icon name={setting.icon} size={20} color={setting.color || "#333"} />
                            <Text style={[styles.itemText, setting.label === 'Logout' && styles.logoutText]}>{setting.label}</Text>
                        </View>
                        {setting.label !== 'Logout' && <Icon name="chevron-right" size={20} color="#999" />}
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

const generalSettings = [
    { icon: 'user', label: 'Edit Profile' },
    { icon: 'lock', label: 'Change Password', onPress: 'ChangePassScreen' },
    { icon: 'shield', label: 'Security', onPress: 'SecurityScreen' },
    { icon: 'globe', label: 'Language', extra: 'English' },
];

const preferenceSettings = [
    { icon: 'file', label: 'Legal and Policies' },
    { icon: 'question-circle', label: 'Help & Support' },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: 'gray',
    },
    section: {
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        marginLeft: 12,
        color: '#333',
    },
    logoutText: {
        color: 'red',
    },
});

export default SettingScreen;
