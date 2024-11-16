import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API from '../../API';

const ProductCard = ({ id, imageUri, name, description, price }:{id:any, imageUri:any, name:any, description:any, price:any}) => {
    const navigation = useNavigation();
    const [liked, setLiked] = useState(false);

    const handlePress = () => {
        navigation.navigate('Detail', {
            id,
            imageUri,
            name,
            description,
            price
        });
    };

    const handleLike = async () => {
        const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${API}/liked`,
                {product_id: id}, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                },
            );
            if (response.status === 201) {
                setLiked(true);
                Alert.alert('Success', 'Product has been liked!');
            }
            if (response.status === 409) {
                Alert.alert('Product already liked.');
                setLiked(false);
            }
    };
    

    return (
        <View style={styles.productCard}>
            <TouchableOpacity onPress={handlePress}>
                <Image
                    source={{uri:imageUri}}
                    style={styles.productImage}
                />
                <View style={styles.productInfo}>
                    <View style={styles.textContainer}>
                        <Text style={styles.productName}>{name}</Text>
                        <Text style={styles.productDescription}>{description}</Text>
                        <Text style={styles.productPrice}>{price}</Text>
                    </View>
                    <TouchableOpacity onPress={handleLike}>
                        <Ionicons name={liked ? "heart" : "heart-outline"} size={24} color="red" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    productCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '48%',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        padding: 16,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    productInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
    },
    productDescription: {
        color: '#6B7280',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ProductCard;
