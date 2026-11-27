import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {useIndicator} from './IndicatorContext';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-root-toast';
import {View, Text} from 'react-native';

// AuthContext
export const AuthContext = createContext();

// LockContext
export const LockContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [saldo, setSaldo] = useState(10000000);
  const [userName, setUserName] = useState('Fulan');
  const [userPin, setUserPin] = useState('pokermember');
  const [noRekening, setNoRekening] = useState();
  const [loading, setLoading] = useState(true);

  const [isLocked, setIsLocked] = useState(false);
  const [limitDate, setLimitDate] = useState();

  const {setColor} = useIndicator();

  // Load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      setColor('#1D64E1');
      const loginStatus = await AsyncStorage.getItem('isLogin');
      const storedSaldo = await AsyncStorage.getItem('saldo');
      const storedUserPin = await AsyncStorage.getItem('userPin');
      const storedUserName = await AsyncStorage.getItem('userName');
      const storedNoRekening = await AsyncStorage.getItem('noRekening');
      if (loginStatus !== null) setIsLogin(loginStatus === 'true');
      if (storedSaldo !== null) setSaldo(parseFloat(storedSaldo));
      if (storedUserName !== null) setUserName(storedUserName);
      if (storedUserPin !== null) setUserPin(storedUserPin);
      if (storedNoRekening !== null) setNoRekening(storedNoRekening);
    } catch (error) {
      console.error('Error loading data from AsyncStorage', error);
    } finally {
      setLoading(false);
    }
  };

  // Save user data to AsyncStorage
  const saveUserData = async (
    newSaldo,
    newUserName,
    newUserPin,
    newNoRekening,
  ) => {
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
  const login = async pin => {
    if (isLocked) {
      try {
        const doc = await firestore()
          .collection('mandiri')
          .doc(noRekening)
          .get();
        if (doc.exists) {
          const data = doc.data();
          const today = moment();
          const limit = moment(data.limit);
          if (today.isAfter(limit)) {
            alert('Akun terkunci. Anda tidak dapat login');
            return false;
          } else {
            setIsLocked(today.isAfter(limit));
            setLimitDate(limit.format('YYYY-MM-DD'));
          }
        } else {
          alert('Akun terkunci. Anda tidak dapat login');
          return false;
        }
      } catch (error) {
        alert('Akun terkunci. Anda tidak dapat login');
        return false;
      }
    }

    if (userPin === pin) {
      await AsyncStorage.setItem('isLogin', 'true');
      setIsLogin(true);
      return true;
    } else {
      alert('Pin salah. Coba lagi.');
      return false;
    }
  };

  // Logout the user
  const logout = async () => {
    await AsyncStorage.setItem('isLogin', 'false');
    setIsLogin(false);
    setColor('#1D64E1');
  };

  // Update saldo
  const updateSaldo = newSaldo => {
    setSaldo(newSaldo);
    saveUserData(newSaldo, userName, userPin, noRekening);
  };

  // Update user information
  const updateUserName = newName => {
    setUserName(newName);
    saveUserData(saldo, newName, userPin, noRekening);
  };

  const updateUserPin = newPin => {
    if (!isLocked) {
      setUserPin(newPin);
      saveUserData(saldo, userName, newPin, noRekening);
    }
  };

  const updateNoRekening = async newNoRekening => {
    setNoRekening(newNoRekening);
    if (!newNoRekening || newNoRekening.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Nomor rekening tidak valid',
      });
      return;
    }

    try {
      const besok = new Date();
      besok.setDate(besok.getDate() + 1);

      const limit = besok.toISOString().split('T')[0];
      setNoRekening(newNoRekening); // pastikan ini dipanggil setelah validasi
      await firestore().collection('mandiri').doc(newNoRekening).set({
        noRekening: newNoRekening,
        saldo: 0,
        saldoTertahan: 0,
        limit: limit,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Toast.show(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>
            Nomor rekening berhasil ditambahkan.
          </Text>
        </View>,
      );
    } catch (error) {
      Toast.show(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>
            Nomor rekening gagal ditambahkan.
          </Text>
        </View>,
      );
    }
    saveUserData(saldo, userName, userPin, newNoRekening);
  };

  // Format saldo
  const formatSaldo = saldo => {
    return `${new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(saldo)}`;
  };

  // Lock status logic
  const checkLockStatus = () => {
    const today = moment();
    const limit = moment(limitDate);
    setIsLocked(today.isAfter(limit));
  };

  useEffect(() => {
    if (!noRekening) return;
    console.log('Noreg', noRekening);
    const subscriber = firestore()
      .collection('mandiri')
      .doc(noRekening)
      .onSnapshot(querySnapshot => {
        console.log('CEK querySnapshot', querySnapshot.limit);
        setLimitDate(querySnapshot.limit);
      });
    return () => subscriber(); // Unsubscribe on cleanup
  }, [noRekening]);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    checkLockStatus();
  }, [limitDate, noRekening]);

  useEffect(() => {
    if (isLocked) {
      logout();
    }
  }, [isLocked]);

  const setLockDate = async date => {
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
      }}>
      <LockContext.Provider
        value={{
          isLocked,
          limitDate,
          setLockDate,
        }}>
        {children}
      </LockContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useLock = () => useContext(LockContext);
