import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API from '../../API';
const { width, height } = Dimensions.get('window');

export default function Detail({ route }:{ route:any }) {
    const navigation = useNavigation();
    const handleBack = ()=>{
        navigation.goBack();
    }
    const handleCart = () =>{
        navigation.navigate('CartScreen');
    }

    const handleAddtoCart = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${API}/cart`, {
                product_id: route.params.id,
                quantity: 1,
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status === 201) {
                Alert.alert('Success', 'Product added to cart successfully!');
            }
        }
        catch (error) {
            console.error("Error response:", error.response);
            Alert.alert('Error', 'Failed to add product to cart.');
        }
    }
    
    
    const { imageUri, name, description, price } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: imageUri}} style={styles.productImage} />
                <TouchableOpacity style={styles.backIcon} onPress={handleBack}>
                    <FontAwesome name="chevron-left" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartIcon} onPress={handleCart}>
                    <FontAwesome name="shopping-cart" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.productTitle}>{name}</Text>
                <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={16} color="yellow" />
                    <Text style={styles.ratingText}>4.8</Text>
                    <Text style={styles.reviewText}>(320 Review)</Text>
                </View>
                <View style={styles.colorQuantityContainer}>
                    <View style={styles.colorContainer}>
                        <Text style={styles.colorLabel}>Color</Text>
                        <View style={styles.colorOptions}>
                            <View style={[styles.colorCircle, { backgroundColor: 'brown' }]} />
                            <View style={[styles.colorCircle, { backgroundColor: 'black' }]} />
                            <View style={[styles.colorCircle, { backgroundColor: 'cyan' }]} />
                            <View style={[styles.colorCircle, { backgroundColor: 'green' }]} />
                        </View>
                    </View>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.quantityButton}>
                            <Text>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>1</Text>
                        <TouchableOpacity style={styles.quantityButton}>
                            <Text>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.stockText}>Available in stock</Text>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.descriptionText}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
                    <Text style={styles.readMoreText}>Read More</Text>
                </Text>
                <View style={styles.priceCartContainer}>
                    <Text style={styles.priceText}>{price}</Text>
                    <TouchableOpacity style={styles.addToCartButton} onPress={handleAddtoCart}>
                        <FontAwesome name="shopping-cart" size={20} color="white" />
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#fff',
    },
    imageContainer: {
        position: 'relative',
        width: width*1.1,
        height: height * 0.4,
    },
    productImage: {
        width: '100%',
        height: 320,
        marginBottom:50,
    },
    backIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    backText: {
        fontSize: 24,
        color: 'gray',
    },
    cartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    infoContainer: {
        backgroundColor:'white',
        padding: 16,
        marginTop:-20,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        marginTop:20
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#666',
    },
    reviewText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#999',
    },
    colorQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    colorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorLabel: {
        fontSize: 16,
        color: '#666',
    },
    colorOptions: {
        flexDirection: 'row',
        marginLeft: 12,
    },
    colorCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius:50,
    },
    quantityText: {
        marginHorizontal: 12,
        fontSize: 16,
        color: '#333',
    },
    stockText: {
        marginVertical: 16,
        fontSize: 16,
        color: 'green',
    },
    descriptionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#666',
    },
    descriptionText: {
        marginTop: 8,
        color: '#666',
    },
    readMoreText: {
        color: 'blue',
    },
    priceCartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
        marginTop:75,
    },
    priceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginLeft:35
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#3333FF',
        borderRadius: 5,
    },
    addToCartText: {
        color: '#fff',
        marginLeft: 8,
    },
});
