import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChangePassScrenn from './auth/ChangePassScreen';
import Intro from './auth/Intro';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import Wellcome from './auth/Wellcome';
import Detail from './components/product/Detail';
import CartScreen from './Screen/CartScreen';
import MessageScreen from './Screen/MessageScreen';
import NotificationScreen from './Screen/NotificationScreen';
import PaymentScreen from './Screen/PaymentScreen';
import PaymentSuccess from './Screen/PaymentSucces';
import SearchScreen from './Screen/SearchScreen';
import SecurityScreen from './Screen/SecurityScreen';
import SettingScreen from './Screen/SettingScreen';
import Tabs from './Screen/Tabs';

const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer independent={true} >
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Intro" component={Intro} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="Wellcome" component={Wellcome} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="Tabs" component={Tabs} />
                    <Stack.Screen name="SearchScreen" component={SearchScreen} />
                    <Stack.Screen name="Detail" component={Detail} />
                    <Stack.Screen name="CartScreen" component={CartScreen} />
                    <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                    <Stack.Screen name="MessageScreen" component={MessageScreen} />
                    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                    <Stack.Screen name="SettingScreen" component={SettingScreen} />
                    <Stack.Screen name="ChangePassScreen" component={ChangePassScrenn} />
                    <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccess} />
                    <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};
export default App;