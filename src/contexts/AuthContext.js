import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [userName, setUserName] = useState('');
  const [userPin, setUserPin] = useState(null);
  const [noRekening, setNoRekening] = useState('');
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('isLogin');
      setIsLogin(loginStatus === 'true');

      if (loginStatus === 'true') {
        const storedSaldo = await AsyncStorage.getItem('saldo');
        const storedUserName = await AsyncStorage.getItem('userName');
        const storedUserPin = await AsyncStorage.getItem('userPin');
        const storedNoRekening = await AsyncStorage.getItem('noRekening');

        if (storedSaldo !== null) setSaldo(parseFloat(storedSaldo));
        if (storedUserName !== null) setUserName(storedUserName);
        if (storedUserPin !== null) setUserPin(storedUserPin);
        if (storedNoRekening !== null) setNoRekening(storedNoRekening);
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserData = async (newSaldo, newUserName, newUserPin, newNoRekening) => {
    try {
      await AsyncStorage.setItem('saldo', newSaldo.toString());
      await AsyncStorage.setItem('userName', newUserName);
      await AsyncStorage.setItem('userPin', newUserPin);
      await AsyncStorage.setItem('noRekening', newNoRekening);
    } catch (error) {
      console.error('Error saving data to AsyncStorage', error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const login = async (pin) => {
    if (userPin === pin) {
      await AsyncStorage.setItem('isLogin', 'true');
      setIsLogin(true);
      return true
    } else {
      console.log('Pin salah');
      alert('Pin salah. Coba lagi.');
      return false
    }
  };

  const logout = async () => {
    await AsyncStorage.setItem('isLogin', 'false');
    setIsLogin(false);
  };

  const updateSaldo = (newSaldo) => {
    setSaldo(newSaldo);
    saveUserData(newSaldo, userName, userPin, noRekening);
  };

  const updateUserName = (newName) => {
    setUserName(newName);
    saveUserData(saldo, newName, userPin, noRekening);
  };

  const updateUserPin = (newPin) => {
    setUserPin(newPin);
    saveUserData(saldo, userName, newPin, noRekening);
  };

  const updateNoRekening = (newNoRekening) => {
    setNoRekening(newNoRekening);
    saveUserData(saldo, userName, userPin, newNoRekening);
  };

  const formatSaldo = (saldo) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(saldo);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        saldo,
        userName,
        userPin,
        noRekening,
        login,
        logout,
        updateSaldo,
        updateUserName,
        updateUserPin,
        updateNoRekening,
        loading,
        formatSaldo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
