import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChangeSaldoScreen from '../screens/ChangeSaldoScreen';
import MInfoScreen from '../screens/MInfoScreen/MInfoScreen';

const DisabledScreen = () => <ScreenComponent title="Disabled" />;

const ScreenComponent = ({title}) => (
  <View style={styles.screen}>
    <Text style={{fontSize: 20}}>{title}</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: 'gray',
      }}>
      {/* Home Screen */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/home.png')
                  : require('../assets/icons/home-disable.png')
              }
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="M-Info"
        component={MInfoScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {display: 'none'},
        }}
      />

      {/* Transaksi Screen */}
      <Tab.Screen
        name="Transaksi"
        component={ChangeSaldoScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/transaction.png')
                  : require('../assets/icons/transaction-disable.png')
              }
              style={styles.icon}
            />
          ),
        }}
      />

      {/* QRIS Disabled */}
      <Tab.Screen
        name="QRIS"
        component={DisabledScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: _ => (
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                marginBottom: 12,
              }}>
              <Image
                source={require('../assets/icons/qris.png')}
                style={{
                  height: 65,
                  width: 65,
                  marginTop: 4,
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
          tabBarButton: props => (
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.disabledTab}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />

      {/* Notifikasi Disabled */}
      <Tab.Screen
        name="Notifikasi"
        component={DisabledScreen}
        options={{
          headerShown: false,
          tabBarIcon: _ => (
            <Image
              source={require('../assets/icons/notification.png')}
              style={styles.icon}
            />
          ),
          tabBarButton: props => (
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.disabledTab}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />

      {/* Akun Saya Disabled */}
      <Tab.Screen
        name="Akun Saya"
        component={DisabledScreen}
        options={{
          headerShown: false,
          tabBarIcon: _ => (
            <Image
              source={require('../assets/icons/account.png')}
              style={styles.icon}
            />
          ),
          tabBarButton: props => (
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.disabledTab}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  tabBarStyle: {
    backgroundColor: '#fff',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  disabledTab: {
    // opacity: 0.5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
