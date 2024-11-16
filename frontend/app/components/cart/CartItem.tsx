import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Checkbox from '../Checkbox';

const CartItem = ({
    image,
    title,
    color,
    price,
    quantity,
    onToggle,
    isChecked,
    onIncrement,
    onDecrement,
}: {
    image: any;
    title: any;
    color: any;
    price: any;
    quantity: any;
    onToggle: any;
    isChecked: any;
    onIncrement: () => void;
    onDecrement: () => void;
}) => {
    return (
        <View style={styles.cartItem}>
            <Checkbox 
                checked={isChecked}
                onToggle={onToggle}
                color="blue"
            />
            <View style={styles.itemInfo}>
                <TouchableOpacity>
                    <Image source={{ uri: image }} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{title}</Text>
                    <Text style={styles.itemColor}>Detail: {color}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.quantityButton} onPress={onDecrement}>
                            <Text>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity style={styles.quantityButton} onPress={onIncrement}>
                            <Text>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>${price}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginLeft: 10,
    },
    itemDetails: {
        marginLeft: 16,
        flex: 1,
    },
    itemTitle: {
        fontWeight: 'bold',
    },
    itemColor: {
        color: '#777',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    quantityButton: {
        padding: 8,
        borderRadius: 10,
        marginHorizontal: 4,
        backgroundColor: '#fff',
        color: '#fff',
    },
    quantityText: {
        marginHorizontal: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
});

export default CartItem;
