import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MessageScreen = () => {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    };
    const handleNotification=()=>{
        navigation.navigate('NotificationScreen');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <FontAwesome name="chevron-left" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Message</Text>
                <TouchableOpacity onPress={handleNotification}>
                    <Icon name="bell" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <Icon name="search" style={styles.searchIcon} size={20} color="gray" />
                <TextInput
                    placeholder="Search something..."
                    style={styles.searchInput}
                />
            </View>
            <ScrollView>
                <Text style={styles.subHeader}>Activities</Text>
                <View style={styles.activityContainer}>
                    {['Kristine', 'Kay', 'Cheryl', 'Jeen'].map((name, index) => (
                        <View key={index} style={styles.profileContainer}>
                            <Image
                                source={{ uri: 'https://placehold.co/50x50' }}
                                style={styles.profileImage}
                            />
                            <Text style={styles.profileName}>{name}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.subHeader}>Messages</Text>
                {[
                    { name: 'Jhone Endrue', time: '23 min', message: 'Hello hw are you? I am going to market. Do you want shopping?' },
                    { name: 'Jihane Luande', time: '40 min', message: 'We are on the runways at the military hangar, there is a plane in it.' },
                    { name: 'Broman Alexander', time: '1 hr', message: 'I received my new watch that I ordered from Amazon.' },
                    { name: 'Zack Jr', time: '1 hr', message: 'I just arrived in front of the school. I\'m waiting for you hurry up!' }
                ].map((msg, index) => (
                    <View key={index} style={styles.messageContainer}>
                        <Image
                            source={{ uri: 'https://placehold.co/50x50' }}
                            style={styles.profileImage}
                        />
                        <View style={styles.messageContent}>
                            <View style={styles.messageHeader}>
                                <Text style={styles.messageAuthor}>{msg.name}</Text>
                                <Text style={styles.messageTime}>{msg.time}</Text>
                            </View>
                            <Text style={styles.messageText}>{msg.message}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    searchInput: {
        width: '100%',
        padding: 8,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 25,
        borderColor: 'gray',
        borderWidth: 1,
    },
    searchIcon: {
        position: 'absolute',
        marginLeft: 15,
        marginTop: 12,
    },
    activityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileContainer: {
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#4299e1',
        borderWidth: 2,
    },
    profileName: {
        fontSize: 12,
        marginTop: 4,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    messageContent: {
        marginLeft: 16,
        flex: 1,
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    messageAuthor: {
        fontWeight: 'bold',
    },
    messageTime: {
        fontSize: 12,
        color: 'gray',
    },
    messageText: {
        fontSize: 14,
        color: 'black',
    },
});

export default MessageScreen;
