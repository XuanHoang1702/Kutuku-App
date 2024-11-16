import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OrderCard = ({ imageUri, name, detail,  qty, price }:{ imageUri:any, name:any, detail:any,  qty:any, price:any }) =>
{
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Detail', {
            imageUri,
            name,
            price
        });
    };

    const status = 'On Progress';

    return (
        <View style={styles.card}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{status}</Text>
                </View>
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.text}>Quantity: {qty}</Text>
                <Text style={styles.text}>Detail: {detail}</Text>
                <Text style={styles.price}>${price}</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.detailButton} onPress={handlePress}>
                        <Text style={styles.buttonTextD}>Detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.trackingButton}>
                        <Text style={styles.buttonText}>Tracking</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    imageWrapper: {
        position: 'relative',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 12,
    },
    statusBadge: {
        position: 'absolute',
        top: 5,
        left: 220,
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderColor: '#3333FF',
        borderWidth: 1,
    },
    statusText: {
        color: '#3333FF',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    details: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    text: {
        color: '#555',
        fontSize: 12,
        marginTop: 2,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 4,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    detailButton: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 50,
        marginLeft:-95,
        backgroundColor: '#f9f9f9',
    },
    trackingButton: {
        backgroundColor: '#3333FF',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 40,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    buttonTextD:{
        color:'black',
        textAlign: 'center',
    },
});

export default OrderCard;
