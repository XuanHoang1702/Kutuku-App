import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API from '../API';
import AddressCard from '../components/Address';
import PaymentSuccess from './PaymentSucces';

const PaymentScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    const { products } = route.params || {};
    const items = products || [];
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleCheckout = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        
        const totalQuantity = items.reduce((total, item) => total + parseInt(item.quantity), 0);
        const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    
        const orderData = {
            status: 'pending',
            total_price: parseFloat(totalPrice),
            total_quantity: parseInt(totalQuantity),
        };
        
        try {
            const responseOrder = await axios.post(`${API}/order`, orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const Order_id = responseOrder.data.order.id;
            const OrderDetail = items.map(item=>({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price*item.quantity,
            }))
            const payload = {
                order_id: Order_id,
                order_details: OrderDetail
            };
            const responseOrderDetail = await axios.post(`${API}/order_detail`,payload);
            console.log("Payload", payload)
            if (responseOrderDetail.status === 201)
            {
                console.log("Order_id",responseOrder.data.order.id);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            } else {
                console.log("Failed to place order");
            }
        } catch (error) {
            console.log("Error during checkout:", error);
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <FontAwesome name="chevron-left" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.title}>Payment</Text>
            </View>
            <AddressCard />
            <ScrollView style={styles.scrollView}>
                {items.length > 0 ? (
                    items.map((item: { id: React.Key | null | undefined; image: any; title: string; color: string; price: string | number; quantity: number }) => (
                        <View key={item.id} style={styles.item}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemPrice}>Price: ${item.price}</Text>
                                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyMessage}>No items in cart.</Text>
                )}
            </ScrollView>
            <View style={styles.checkoutContainer}>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutButtonText}>Checkout Now</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={showSuccess}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <PaymentSuccess navigation={navigation} />
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#Fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 100,
        color: '#000',
    },
    scrollView: {
        marginBottom: 70,
    },
    item: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    itemColor: {
        fontSize: 16,
        color: '#555',
    },
    itemPrice: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 4,
        color: '#ff',
    },
    itemQuantity: {
        fontSize: 16,
        color: '#888',
        marginTop: 2,
    },
    emptyMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#4F46E5',
    },
    checkoutContainer: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
    },
    checkoutButton: {
        backgroundColor: '#4F46E5',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    checkoutButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default PaymentScreen;
