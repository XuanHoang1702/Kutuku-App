import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API from '../API';
import CartItem from '../components/cart/CartItem';

const CartScreen = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchCartItems = async () => {
                try {
                    const token = await AsyncStorage.getItem('token');
                    const response = await axios.get(`${API}/cart`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const cartItems = response.data.data.map((item) => ({
                        id: item.id,
                        product_id: `${item.product_id}`,
                        title: `${item.product_name}`,
                        image: `${API}/product/${item.product_id}/image`,
                        price: `${item.product_price}`,
                        detail: `${item.product_detail}`,
                        quantity: item.quantity,
                        isChecked: false,
                    }));
                    setItems(cartItems);
                } catch (error) {
                    console.error('Failed to fetch cart items:', error);
                }
            };
            fetchCartItems();
        }, [])
    );

    const handleBack = () => {
        navigation.goBack();
    };

    const handleToggleCheckbox = (id) => {
        setItems((prevItems) =>
            prevItems.map(item =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
    };

    const handleQuantityChange = async (id, action) => {
        const updatedItems = items.map(item =>
            item.id === id
                ? {
                      ...item,
                      quantity: action === 'increment' ? item.quantity + 1 : item.quantity - 1,
                  }
                : item
        );
        
        setItems(updatedItems);

        try {
            const token = await AsyncStorage.getItem('token');
            const itemToUpdate = updatedItems.find(item => item.id === id);

            // Cập nhật số lượng lên server
            await axios.put(`${API}/cart/${id}`, 
                { quantity: itemToUpdate.quantity }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const handlePayment = () => {
        const selectedItems = items.filter(item => item.isChecked);
        navigation.navigate('PaymentScreen', { products: selectedItems });
    };

    const totalPrice = items.reduce(
        (acc, item) => (item.isChecked ? acc + parseFloat(item.price) * item.quantity : acc),
        0
    ).toFixed(2);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <FontAwesome name="chevron-left" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Cart</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        color={item.detail}
                        price={item.price}
                        quantity={item.quantity}
                        onToggle={() => handleToggleCheckbox(item.id)}
                        isChecked={item.isChecked}
                        onIncrement={() => handleQuantityChange(item.id, 'increment')}
                        onDecrement={() => handleQuantityChange(item.id, 'decrement')}
                    />
                ))}
            </ScrollView>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${totalPrice}</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={handlePayment}>
                    <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 120,
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    totalContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 16,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#3333FF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CartScreen;
