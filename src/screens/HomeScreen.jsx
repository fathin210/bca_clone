import {
  View,
  Text,
  StatusBar,
  useColorScheme,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const navigation = useNavigation();

  const {logout, userName} = useAuth();

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{name: 'Front'}],
    });
  };

  return (
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
        <TouchableOpacity onPress={handleLogout}>
          <Image
            style={styles.logoutIcon}
            source={require('../assets/icons/logout.png')}
          />
        </TouchableOpacity>
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
        <View style={{flex: 5, paddingHorizontal: 16}}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('M-Info')}>
              <View style={styles.menuItem}>
                <ImageBackground
                  style={styles.menuIcon}
                  source={require('../assets/home/m-info.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Change Saldo')}>
              <View style={styles.menuItem}>
                <ImageBackground
                  style={styles.menuIcon}
                  source={require('../assets/home/m-transfer.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <ImageBackground
                  style={styles.menuIcon}
                  source={require('../assets/home/m-payment.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <ImageBackground
                  style={styles.menuIcon}
                  source={require('../assets/home/m-commerce.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <ImageBackground
                  style={styles.menuIcon}
                  source={require('../assets/home/cardless.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <ImageBackground
                  style={styles.menuIcon}
                  source={require('../assets/home/m-admin.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <ImageBackground
                  style={styles.menuIcon}
                  source={require('../assets/home/flazz.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <ImageBackground
                  style={styles.menuIcon}
                  source={require('../assets/home/bagi-bagi.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <ImageBackground
                  style={styles.menuIcon}
                  source={require('../assets/home/lifestyle.png')}
                />
              </View>
            </TouchableOpacity>
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
});

export default HomeScreen;