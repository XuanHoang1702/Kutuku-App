import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API from '../../API';
import ProductCard from '../product/ProductCard';
const HomeTab = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API}/product`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.promoCard}>
                <Image
                    source={require('../../../assets/images/image.png')}
                    style={styles.promoImage}
                />
            </View>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>New Arrivals <Text role="img" aria-label="fire">🔥</Text></Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.productsContainer}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        imageUri={`${API}/product/${product.id}/image` }
                        name={product.name}
                        description={product.detail}
                        price={`$${product.price}`}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    promoCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    promoImage: {
        width: '100%',
        height: 110,
        borderRadius: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    seeAll: {
        color: '#3B82F6',
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default HomeTab;
