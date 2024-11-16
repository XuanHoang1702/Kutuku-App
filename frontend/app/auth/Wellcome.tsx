import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export default function Wellcome({navigation}:{navigation:any}) {
    const images = [
        require('../../assets/images/GoYounjung.jpg'),
        require('../../assets/images/bfae36e8-a0ea-4c70-81aa-eecd1adfb918.jpg'),
        require('../../assets/images/5d5deb04-c44e-4e14-998d-7af4db61f431.jpg'),
        require('../../assets/images/968cb2d0-55a4-4af5-942a-75983db3922f.jpg')
    ];

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Carousel
                    loop
                    width={300}
                    height={450}
                    autoPlay={true}
                    autoPlayInterval={3000}
                    data={images}
                    renderItem={({ item }) => (
                        <Image source={item} style={styles.image} />
                    )}
                />
                <View style={styles.dotContainer}>
                    <View style={styles.dotInactive} />
                    <View style={styles.dotActive} />
                    <View style={styles.dotInactive} />
                </View>
                <Text style={styles.title}>Various Collections Of The Latest Products</Text>
                <Text style={styles.description}>
                    Urna amet, suspendisse ullamcorper ac elit diam facilisis cursus vestibulum.
                </Text>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('RegisterScreen')}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')}>
                    <Text style={styles.link}>Already Have an Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
    },
    card: {
        flex:1,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        maxWidth:1000,
        maxHeight:1000,
        alignItems: 'center',
        textAlign: 'center',
    },
    image: {
        marginTop: 10,
        width: 300,
        height: 400,
        borderRadius: 10,
        marginBottom: 24,
    },
    title: {
        marginTop:10,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        color: '#6b7280',
        marginBottom: 24,
        textAlign: 'center',
    },
    dotContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    dotInactive: {
        height: 8,
        width: 8,
        backgroundColor: '#d1d5db',
        borderRadius: 4,
        marginHorizontal: 4,
    },
    dotActive: {
        height: 8,
        width: 8,
        backgroundColor: '#3b82f6',
        borderRadius: 4,
        marginHorizontal: 4,
    },
    button: {
        marginTop:20,
        backgroundColor: '#3333FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 9999,
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    link: {
        color: '#3333FF',
        marginBottom: 16,
    },
});
