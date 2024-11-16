import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationScreen = () => {
    const navigation = useNavigation();

    const handleSetting = () => {
        navigation.navigate('SettingScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="chevron-left" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.title}>Notification</Text>
                <TouchableOpacity onPress={handleSetting} >
                    <Icon name="cog" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <Text style={styles.subHeader}>Recent</Text>
            <View style={styles.notificationContainer}>
                {notifications.map((notification, index) => (
                    <View key={index} style={styles.notification}>
                        <View style={styles.iconContainer}>
                            {notification.icon ? (
                                <Icon name={notification.icon} size={32} style={styles.icon} />
                            ) : (
                                <Image source={{ uri: notification.image }} style={styles.image} />
                            )}
                        </View>
                        <View style={styles.content}>
                            <View style={styles.headerRow}>
                                <Text style={styles.notificationTitle}>{notification.title}</Text>
                                <Text style={styles.notificationTime}>{notification.time}</Text>
                            </View>
                            <Text style={styles.notificationText}>{notification.text}</Text>
                            {notification.reply && <Text style={styles.replyLink}>Reply the message</Text>}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const notifications = [
    {
        icon: 'shopping-cart',
        title: 'Purchase Completed!',
        time: '2 m ago',
        text: 'Your order for 334 headphones is confirmed. Thanks for shopping with us! 🎉',
    },
    {
        image: 'https://placehold.co/40x40',
        title: 'Jerremy Send You a Message',
        time: '2 m ago',
        text: 'Hi! Your package is almost there. Are you available to receive it?',
        reply: true,
    },
    {
        icon: 'bolt',
        title: 'Flash Sale!',
        time: '2 m ago',
        text: 'Get 20% off on your first transaction this month! 😍',
    },
    {
        icon: 'truck',
        title: 'Package Sent',
        time: '10 m ago',
        text: 'Your package has been shipped from New York.',
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: 'gray',
    },
    subHeader: {
        fontSize: 18,
        fontWeight: '500',
        color: '#555',
        marginBottom: 12,
    },
    notificationContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    notification: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    iconContainer: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        backgroundColor: '#f3f4f6',
    },
    icon: {
        color: '#6b7280',
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notificationTitle: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
    },
    notificationTime: {
        fontSize: 12,
        color: '#999',
    },
    notificationText: {
        marginTop: 4,
        color: '#666',
        fontSize: 14,
    },
    replyLink: {
        color: '#1d4ed8',
        marginTop: 6,
        fontSize: 14,
    },
});

export default NotificationScreen;
