import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const categories = [
    { title: "New Arrivals", count: "208 Products", image: require('../../../assets/images/C1.jpg') },
    { title: "Clothes", count: "358 Products", image: require('../../../assets/images/C2.jpg') },
    { title: "Bags", count: "160 Products", image: require('../../../assets/images/C3.jpg') },
    { title: "Shoes", count: "230 Products", image: require('../../../assets/images/C4.jpg') },
    { title: "Electronics", count: "129 Products", image: require('../../../assets/images/C5.jpg') }
];

const { width } = Dimensions.get('window');
export default function CategoryTab() {
    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.count}>{item.count}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F3F4F6',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 5,
        width: width - 32,
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 16,
        backgroundColor: '#F3F4F6',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    count: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
});
