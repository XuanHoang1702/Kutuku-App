import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import API from '../../API';
import OrderCard from './OrderCard';

const MyOrderTab = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${API}/order`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setOrders(response.data.order_details);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while fetching orders.');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchOrders();
        }, [])
    );

    return (
        <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 20 }]} style={{ flex: 1 }}>
            {orders.map((order) => (
                <OrderCard 
                    key={order.id}
                    imageUri={`${API}/product/${order.product_id}/image` }
                    name={order.product_name}
                    detail={order.product_detail}
                    qty={order.quantity}
                    price={order.price}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
    },
});

export default MyOrderTab;
