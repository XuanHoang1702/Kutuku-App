import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import API from '../../API';
import HistoryCard from './HistoryCard';

const HistoryTab = () => {
    const [histories, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fecthHistory = async () =>{
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${API}/order_history`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setHistory(response.data.order_details);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while fetching history.');
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fecthHistory();
        }, [])
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {histories.map((history) => (
                <HistoryCard 
                    key={history.id}
                    imageUri={`${API}/product/${history.product_id}/image` }
                    name={history.product_name}
                    detail={history.product_detail}
                    qty={history.quantity}
                    price={history.price}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
        padding: 20,
    },
});

export default HistoryTab;
