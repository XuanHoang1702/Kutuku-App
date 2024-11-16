import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API from '../API';


const MyProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
      const fetchUser = async () => {
          const userData = await AsyncStorage.getItem('user');
          if (userData) {
              const user = JSON.parse(userData);
              setUser(user);
              const imageUrl = `${API}/user/${user.id}/profile`;
              if (user.image) {
                  setImageUri(imageUrl);
              } else {
                  setImageUri(require('../../assets/images/Default.jpg'));
              }
          }
      };
      fetchUser();
  }, []);  


  const handleChangePass = () => {
    navigation.navigate('ChangePassScreen');
  };

  const handleCart = () => {
    navigation.navigate('CartScreen');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      Alert.alert("Logout", "You have been logged out successfully.");
      navigation.navigate('Wellcome');
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.avatarContainer}>
      <Image
        source={imageUri ? { uri: imageUri } : require('../../assets/images/Default.jpg')}
        style={styles.avatar}
      />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <Text style={styles.userPhone}>+{user?.phone}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleCart}>
          <Text style={styles.optionText}>My Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}onPress={handleLogout}>
          <Text style={styles.optionTextLogout}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 E-Commerce App</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
  userPhone: {
    fontSize: 14,
    color: 'gray',
  },
  changePasswordButton: {
    backgroundColor: '#3333FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  changePasswordText: {
    color: 'white',
    fontWeight: 'bold',
  },
  optionsContainer: {
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  optionText: {
    color: 'black',
  },
  optionTextLogout:{
    color:'red',
  },
  logoutButton: {
    backgroundColor: '#FF3333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    padding: 10,
  },
  footerText: {
    color: 'gray',
    fontSize: 12,
  },
});

export default MyProfile;
