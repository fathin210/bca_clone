import {
  View,
  Text,
  StatusBar,
  useColorScheme,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import InsetShadowBox from '../components/InsetShadowBox';
import {useIndicator} from '../contexts/IndicatorContext';
import SharpCornerRoundedSideBox from '../components/SharpCornerRoundedSideBox';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const navigation = useNavigation();

  const {logout, userName} = useAuth();

  const {color} = useIndicator();

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(false)
    logout();
    navigation.reset({
      index: 0,
      routes: [{name: 'Front'}],
    });
  };

  return (
    <>
      <View style={{flex: 1}}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="white"
        />
        <View style={styles.headerContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require('../assets/icons/bca-mobile.png')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <InsetShadowBox
              style={{
                marginHorizontal: 8,
              }}
              color={color}
            />
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Image
                style={styles.logoutIcon}
                source={require('../assets/icons/logout.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#002344',
          }}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Selamat datang,</Text>
            <Text style={styles.greetingName}>{userName ? userName : '-'}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}>
            <Image
              style={{flex: 1, width: '100%', height: '100%'}}
              resizeMode="contain"
              source={require('../assets/home/event.png')}
            />
          </TouchableOpacity>
          <View style={{flex: 4, paddingHorizontal: 16}}>
            <View style={styles.row}>
              <MenuItem
                label="m-Info"
                onPress={() => navigation.navigate('M-Info')}
                imageUri={require('../assets/home/m-info.png')}
              />
              <MenuItem
                label="m-Transfer"
                onPress={() => navigation.navigate('Change Saldo')}
                imageUri={require('../assets/home/m-transfer.png')}
              />
              <MenuItem
                label="m-Payment"
                imageUri={require('../assets/home/m-payment.png')}
              />
              <MenuItem
                label="m-Commerce"
                imageUri={require('../assets/home/m-commerce.png')}
              />
            </View>
            <View style={styles.row}>
              <MenuItem
                label="Cardless"
                imageUri={require('../assets/home/cardless.png')}
              />
              <MenuItem
                label="m-Admin"
                imageUri={require('../assets/home/m-admin.png')}
              />
              <MenuItem
                label="BCA Keyboard"
                imageUri={require('../assets/home/bca-keyboard.png')}
              />
              <MenuItem
                label="Flazz"
                imageUri={require('../assets/home/flazz.png')}
              />
            </View>
            <View style={styles.row}>
              <MenuItem
                label="BagiBagi"
                imageUri={require('../assets/home/bagi-bagi.png')}
              />
              <MenuItem
                label="Lifestyle"
                imageUri={require('../assets/home/lifestyle.png')}
              />
              <MenuItem
                label="Lifestyle"
                imageUri={require('../assets/home/lifestyle.png')}
              />
              <MenuItem
                label="Lifestyle"
                imageUri={require('../assets/home/lifestyle.png')}
              />
            </View>
          </View>
          <View style={{flex: 1, width: '100%', backgroundColor: '#F1F1F1'}}>
            <ImageBackground
              style={{flex: 1}}
              resizeMode="cover"
              source={require('../assets/home/bottom-menu.png')}
            />
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View>
              <Text style={styles.modalTitle}>Logout</Text>
              <Text
                style={{
                  color: '#23679A',
                  fontWeight: 'semibold',
                  marginTop: 16,
                }}>
                Anda akan logout dari BCA mobile
              </Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                <LinearGradient
                  style={styles.modalButtonGradient}
                  colors={['#1696E6', '#02387F']}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <LinearGradient
                  style={styles.modalButtonGradient}
                  colors={['#1696E6', '#02387F']}>
                  <Text style={styles.modalButtonText}>Logout</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const MenuItem = ({label = '', imageUri, ...props}) => {
  return (
    <TouchableOpacity style={{flex: 1}} {...props}>
      <View style={{justifyContent: 'center', alignItems: 'center', gap: 8}}>
        <SharpCornerRoundedSideBox
          height={60}
          sideRadius={10}
          fill="#007AFF"
          imageUri={imageUri}
        />
        <Text style={{textAlign: 'center', color: '#BDD7EE', fontSize: 10}}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  logo: {
    width: 120,
    height: 40,
  },
  logoutIcon: {
    width: 30,
    height: 30,
  },
  greetingContainer: {
    flex: 1,
    backgroundColor: '#002344',
    justifyContent: 'center',
    padding: 24,
    marginBottom: '-10%',
  },
  greetingText: {
    fontSize: 18,
    color: '#EAF5FC',
    fontWeight: '300',
  },
  greetingName: {
    fontSize: 24,
    color: '#EAF5FC',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  imageBackground: {
    marginTop: '-15%',
    width: '100%',
  },
  menuContainer: {
    marginTop: '5%',
    marginLeft: '5%',
    flexDirection: 'row',
    gap: 8,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuIcon: {
    height: 100,
    width: 80,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  footerImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    aspectRatio: 5,
    alignSelf: 'center',
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
    height: '40%',
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  modalTitle: {
    color: '#23679A',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
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

export default HomeScreen;
