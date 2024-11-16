import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AddressCard: React.FC = () => {
    const [address, setAddress] = useState('Ho Chi Minh City, Vietnam');

    const handleEdit = () => {
        console.log("Edit button pressed");
    };

    const shortAddress = address.length > 30 ? `${address.substring(0, 30)}...` : address;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Shipping Address</Text>
                <TouchableOpacity onPress={handleEdit}>
                    <Text style={styles.editLink}>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.addressCard}>
                <Text style={styles.addressText}>{shortAddress}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        marginBottom:15,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    editLink: {
        fontSize: 16,
        color: '#4F46E5',
        fontWeight: '600',
    },
    addressCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    addressText: {
        fontSize: 16,
        color: '#555',
    },
});

export default AddressCard;
