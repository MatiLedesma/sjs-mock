import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home, Product, SignIn } from '../screens';

export default function StackNavigator() {
    const StackNavigator = createNativeStackNavigator();
    return (
        <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
            {/* <StackNavigator.Screen name='SignIn' component={SignIn} /> */}
            <StackNavigator.Screen name='Home' component={Home} />
            <StackNavigator.Screen name='Product' component={Product} options={{animation: 'slide_from_right'}} />
        </StackNavigator.Navigator>
    );
}