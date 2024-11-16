import AntDesign from '@expo/vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Favourite from '../Tabs/Favourite';
import Home from '../Tabs/Home';
import MyOrder from '../Tabs/MyOrder';
import MyProfile from '../Tabs/MyProfile';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#3333FF',
        tabBarInactiveTintColor: '#C0C0C0',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          paddingBottom: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          headerShown: false,
          tabBarLabel: 'Favourite',
          tabBarIcon: ({ color }) => (
            <AntDesign name="hearto" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyOrder"
        component={MyOrder}
        options={{
          headerShown: false,
          tabBarLabel: 'My Order',
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerShown: false,
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
