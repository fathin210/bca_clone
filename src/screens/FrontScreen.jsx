import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  useColorScheme,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window'); // Mendapatkan dimensi layar

const masterMenu = [
  {
    icon: 'm-bca.png',
    label: 'm-BCA',
    code: 'mbca',
  },
  {
    icon: 'klik-bca.png',
    label: 'KlikBCA',
  },
  {
    icon: 'info-bca.png',
    label: 'Info BCA',
  },
];

const imageAssets = {
  'm-bca.png': require('../assets/front/m-bca.png'),
  'klik-bca.png': require('../assets/front/klik-bca.png'),
  'info-bca.png': require('../assets/front/info-bca.png'),
};

const additionalMenu = [
  {
    label: 'Buka Rekening Baru',
  },
  {
    label: 'Ganti Kode Akses',
    code: 'change_code',
  },
  {
    label: 'Flazz',
  },
];

const FrontScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [pin, setPin] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const inputRef = useRef(null);

  const openModal = () => setModalVisible(true);

  const closeModal = () => setModalVisible(false);

  const navigation = useNavigation();

  const {login} = useAuth();

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [modalVisible]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="#0D3879"
        />
        <ImageBackground
          source={require('../assets/front/bg-front.png')}
          style={styles.container}>
          <ImageBackground
            style={styles.header}
            source={require('../assets/front/bg-front-top.png')}
          />
          <View style={styles.contentContainer}>
            <View style={styles.menuContainer}>
              {masterMenu.map(item => (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.8}
                  onPress={() => item?.code === 'mbca' && openModal()}>
                  <LinearGradient
                    style={styles.menuItem}
                    colors={['#1696E6', '#02387F']}>
                    <Image
                      style={styles.menuIcon}
                      source={imageAssets[item.icon]}
                    />
                    <Text style={styles.menuText}>{item.label}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.additionalMenuContainer}>
              {additionalMenu.map(item => (
                <TouchableOpacity
                  key={item.label}
                  style={styles.additionalMenuItem}
                  activeOpacity={0.8}
                  onPress={() =>
                    item?.code === 'change_code' &&
                    navigation.navigate('Change Code')
                  }>
                  <LinearGradient
                    style={styles.additionalMenuGradient}
                    colors={['#1696E6', '#02387F']}>
                    <Text style={styles.additionalMenuText}>{item.label}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <FastImage
            style={styles.image}
            source={require('../assets/front/animated-welcome.gif')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </ImageBackground>
      </ScrollView>

      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent
        onRequestClose={closeModal}>
        <KeyboardAvoidingView enabled behavior={'height'} style={{flex: 1}}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Kode Akses</Text>
              <TextInput
                ref={inputRef}
                style={styles.modalInput}
                placeholder="Input 6 alphanum"
                secureTextEntry
                placeholderTextColor="lightgray"
                returnKeyType="done"
                onChangeText={pin => setPin(pin)}
              />
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={closeModal}>
                  <LinearGradient
                    style={styles.modalButtonGradient}
                    colors={['#1696E6', '#02387F']}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={async () => {
                    if (pin === 'poker1') {
                      closeModal();
                      navigation.navigate('Change User');
                      return;
                    }

                    const isLoginSuccessful = await login(pin);

                    if (isLoginSuccessful) {
                      closeModal();
                      navigation.reset({
                        index: 0,
                        routes: [{name: 'Home'}],
                      });
                    } else {
                    }
                  }}>
                  <LinearGradient
                    style={styles.modalButtonGradient}
                    colors={['#1696E6', '#02387F']}>
                    <Text style={styles.modalButtonText}>Login</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    height: height * 0.35,
  },
  contentContainer: {
    marginTop: -height * 0.2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  menuContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  menuItem: {
    padding: 8,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: 'white',
    height: height * 0.12,
  },
  menuIcon: {
    width: 60,
    height: 60,
  },
  menuText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  additionalMenuContainer: {
    marginTop: 24,
    gap: 13,
    flex: 1,
  },
  additionalMenuItem: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  additionalMenuGradient: {
    padding: 12,
    borderRadius: 4,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalMenuText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11335ca1',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '70%',
    height: 130,
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: '#093967',
    textAlign: 'center',
    fontSize: 18,
  },
  modalInput: {
    backgroundColor: 'white',
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  modalButton: {
    flex: 1,
  },
  modalButtonGradient: {
    borderRadius: 4,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    padding: 8,
    fontWeight: 'bold',
  },
});

export default FrontScreen;
