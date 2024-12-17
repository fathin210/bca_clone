import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FrontScreen from '../screens/FrontScreen';
import {useAuth, useLock} from '../contexts/AuthContext';
import {ActivityIndicator, View} from 'react-native';
import BottomTabs from '../components/BottomTabs';
import ChangeCodeScreen from '../screens/ChangeCodeScreen';
import ChangeSaldoScreen from '../screens/ChangeSaldoScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {isLogin, loading} = useAuth();
  const {isLocked} = useLock();

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLocked ? 'Front' : isLogin ? 'Home' : 'Front'}>
        <Stack.Screen
          name="Front"
          component={FrontScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={BottomTabs}
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
