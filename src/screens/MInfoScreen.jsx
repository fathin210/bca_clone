import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../contexts/AuthContext';
import moment from 'moment';
import InsetShadowBox from '../components/InsetShadowBox';
import {useIndicator} from '../contexts/IndicatorContext';

const {width, height} = Dimensions.get('window');

const MInfoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const {saldo, noRekening, formatSaldo} = useAuth();

  const {color} = useIndicator();

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View
          style={{
            padding: 16,
            backgroundColor: '#F9F9F9',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...styles.headerText,
                fontSize: 20,
                textAlign: 'center',
                width: '50%',
              }}>
              m-Info
            </Text>
            <InsetShadowBox color={color} />
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.menuWrapper}>
          <View
            style={{
              backgroundColor: 'red',
              overflow: 'hidden',
              borderRadius: 6,
            }}>
            <View style={styles.header}>
              <Image
                source={require('../assets/minfo/m-info.png')}
                style={styles.headerImage}
              />
              <Text style={styles.headerText}>m-Info</Text>
            </View>
            <ScrollView contentContainerStyle={styles.menuContainer}>
              {/* Main Menus */}
              {[
                'Info Saldo',
                'Mutasi Rekening',
                'Rekening Deposito',
                'Info Reward BCA',
                'Info Reksadana',
              ].map((item, index) => {
                const backgroundColor =
                  item === 'Info Reksadana' ? '#EBEBEB' : 'white';

                const isDisabled = item !== 'Info Saldo';

                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.menuItem, {backgroundColor}]}
                    onPress={openModal}
                    activeOpacity={0.7}
                    disabled={isDisabled}>
                    <Text style={styles.menuText}>{item}</Text>
                    {item !== 'Info Reksadana' && item !== 'Info RDN' && (
                      <Image
                        source={require('../assets/icons/next-blue.png')}
                        style={styles.iconNext}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}

              {/* Sub-menus under "Info Reksadana" */}
              <View style={styles.subMenuContainer}>
                {['NAB Reksadana', 'Saldo Reksadana'].map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.subMenuItem}
                    onPress={() => handlePress(item)}>
                    <Text style={styles.subMenuText}>{item}</Text>
                    <Image
                      source={require('../assets/icons/next-blue.png')}
                      style={styles.iconNext}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Additional Menus */}
              {['Info Kurs', 'Info RDN'].map((item, index) => {
                const backgroundColor =
                  item === 'Info RDN' ? '#EBEBEB' : 'white';

                const isDisabled = item === 'Info RDN';

                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.menuItem, {backgroundColor}]}
                    onPress={() => handlePress(item)}
                    activeOpacity={0.7}
                    disabled={isDisabled}>
                    <Text style={styles.menuText}>{item}</Text>
                    {item !== 'Info Reksadana' && item !== 'Info RDN' && (
                      <Image
                        source={require('../assets/icons/next-blue.png')}
                        style={styles.iconNext}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Footer */}
        <View style={{flex: 1, width: '100%', backgroundColor: '#F1F1F1'}}>
          <ImageBackground
            style={{flex: 1}}
            resizeMode="cover"
            source={require('../assets/home/bottom-menu.png')}
          />
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{height: 50}}>
              <Text
                style={{
                  ...styles.headerText,
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                m-Info
              </Text>
            </View>
            <View style={{flex: 1}}>
              <View style={{marginBottom: 24}}>
                <Text>m-info:</Text>
                <Text>{moment(Date.now()).format('DD/MM/YYYY HH:mm:ss')}</Text>
              </View>
              <Text>{`${noRekening ? noRekening : 'REKENING TIDAK DITEMUKAN'} ${
                saldo ? formatSaldo(saldo) : 'Rp. 0,00'
              }`}</Text>
            </View>

            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <LinearGradient
                style={styles.modalButtonGradient}
                colors={['#1696E6', '#02387F']}>
                <Text style={styles.modalButtonText}>OK</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002344',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    height: height * 0.1,
    paddingHorizontal: 16,
  },
  headerImage: {
    width: 65,
    height: 65,
    marginRight: 8,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#005BAC',
  },
  menuWrapper: {
    flex: 6,
    padding: 16,
  },
  menuContainer: {
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    color: '#005BAC',
  },
  subMenuContainer: {
    backgroundColor: '#f9f9f9',
    paddingLeft: 32,
  },
  subMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  subMenuText: {
    fontSize: 14,
    color: '#005BAC',
  },
  iconNext: {
    width: 20,
    height: 20,
    tintColor: '#005BAC',
    resizeMode: 'contain',
  },
  footer: {
    height: 93,
  },
  footerImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: width * 0.8,
    height: height * 0.5,
    justifyContent: 'space-between',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#005BAC',
    borderRadius: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
  modalButton: {
    width: '100%',
  },
  modalButtonGradient: {
    borderRadius: 4,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    padding: 16,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default MInfoScreen;
