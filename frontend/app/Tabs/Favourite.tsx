import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../API';
import Header from '../components/Header';

const Favourite = () => {
    const navigation = useNavigation();
    const [likedProducts, setLikedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLikedProducts = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${API}/liked`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setLikedProducts(response.data.data);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while fetching liked products.');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchLikedProducts();
        }, [])
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.productCard} 
            onPress={() => navigation.navigate('Detail', {
                id: item.product_id,
                imageUri: `${API}/product/${item.product_id}/image`,
                name: item.product_name,
                description: item.product_detail,
                price: item.product_price
            })}
        >
            <Image 
                source={{ uri: `${API}/product/${item.product_id}/image` }} 
                style={styles.productImage} 
            />
            <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.product_name}</Text>
                <Text style={styles.productDescription}>{item.product_detail}</Text>
                <Text style={styles.productPrice}>${item.product_price}</Text>
            </View>
            <Icon name="heart" size={20} style={styles.favoriteIcon} />
        </TouchableOpacity>
    );
    

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={likedProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.product_id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Header navigation={navigation} style={styles.header} />}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%'
    },
    header: {
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    productRow: {
        justifyContent: 'space-between',
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        marginTop: 16,
        padding: 10,
        flex: 1,
        marginHorizontal: 4,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
        color: 'red',
    },
    productDetails: {
        marginBottom: 8,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    productDescription: {
        color: '#666',
        fontSize: 14,
        marginVertical: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
        color: '#333',
    },
});

export default Favourite;
