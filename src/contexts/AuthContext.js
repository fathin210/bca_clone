import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useIndicator } from './IndicatorContext';

// AuthContext
export const AuthContext = createContext();

// LockContext
export const LockContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [saldo, setSaldo] = useState(10000000);
  const [userName, setUserName] = useState('Fulan');
  const [userPin, setUserPin] = useState('pokermember');
  const [noRekening, setNoRekening] = useState('1234567');
  const [loading, setLoading] = useState(true);

  const [isLocked, setIsLocked] = useState(false);
  const [limitDate, setLimitDate] = useState(new Date());

  const { setColor } = useIndicator()

  // Load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      setColor("#1D64E1")
      const loginStatus = await AsyncStorage.getItem('isLogin');
      const storedSaldo = await AsyncStorage.getItem('saldo');
      const storedUserName = await AsyncStorage.getItem('userName');
      const storedUserPin = await AsyncStorage.getItem('userPin');
      const storedNoRekening = await AsyncStorage.getItem('noRekening');
      const storedLimitDate = await AsyncStorage.getItem('limitDate');

      if (loginStatus !== null) setIsLogin(loginStatus === 'true');
      if (storedSaldo !== null) setSaldo(parseFloat(storedSaldo));
      if (storedUserName !== null) setUserName(storedUserName);
      if (storedUserPin !== null) setUserPin(storedUserPin);
      if (storedNoRekening !== null) setNoRekening(storedNoRekening);
      if (storedLimitDate !== null) setLimitDate(new Date(storedLimitDate));
    } catch (error) {
      console.error('Error loading data from AsyncStorage', error);
    } finally {
      setLoading(false);
    }
  };

  // Save user data to AsyncStorage
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

  // Check if the user is logged in
  const login = async (pin) => {
    if (isLocked) {
      alert('Akun terkunci. Anda tidak dapat login.');
      return false;
    }

    if (userPin === pin) {
      await AsyncStorage.setItem('isLogin', 'true');
      setIsLogin(true);
      return true;
    } else {
      console.log('Pin salah');
      alert('Pin salah. Coba lagi.');
      return false;
    }
  };

  // Logout the user
  const logout = async () => {
    await AsyncStorage.setItem('isLogin', 'false');
    setIsLogin(false);
    setColor("#1D64E1")
  };

  // Update saldo
  const updateSaldo = (newSaldo) => {
    setSaldo(newSaldo);
    saveUserData(newSaldo, userName, userPin, noRekening);
  };

  // Update user information
  const updateUserName = (newName) => {
    setUserName(newName);
    saveUserData(saldo, newName, userPin, noRekening);
  };

  const updateUserPin = (newPin) => {
    if (!isLocked) {
      setUserPin(newPin);
      saveUserData(saldo, userName, newPin, noRekening);
    }
  };

  const updateNoRekening = (newNoRekening) => {
    setNoRekening(newNoRekening);
    saveUserData(saldo, userName, userPin, newNoRekening);
  };

  // Format saldo
  const formatSaldo = (saldo) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(saldo);
  };

  // Lock status logic
  const checkLockStatus = () => {
    const today = moment();
    const limit = moment(limitDate);
    setIsLocked(today.isAfter(limit));
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    checkLockStatus();
  }, [limitDate]);

  useEffect(() => {
    if (isLocked) {
      logout();
    }
  }, [isLocked]);

  const setLockDate = async (date) => {
    setLimitDate(date);
    try {
      await AsyncStorage.setItem('limitDate', date.toISOString());
    } catch (error) {
      console.error('Error saving limitDate to AsyncStorage', error);
    }
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
      <LockContext.Provider
        value={{
          isLocked,
          limitDate,
          setLockDate,
        }}
      >
        {children}
      </LockContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useLock = () => useContext(LockContext);
