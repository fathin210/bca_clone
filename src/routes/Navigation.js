import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FrontScreen from '../screens/FrontScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import MInfoScreen from '../screens/MInfoScreen';
import ChangeCodeScreen from '../screens/ChangeCodeScreen';
import ChangeUserScreen from '../screens/ChangeUserScreen';
import ChangeSaldoScreen from '../screens/ChangeSaldoScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {

  const { isLogin, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogin ? "Home" : "Front"}>
        <Stack.Screen
          name="Front"
          component={FrontScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="M-Info"
          component={MInfoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Change Code"
          component={ChangeCodeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Change User"
          component={ChangeUserScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Change Saldo"
          component={ChangeSaldoScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
