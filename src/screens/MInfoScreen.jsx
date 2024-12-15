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

const masterMenu = [
  {
    label: 'Info Saldo',
    type: 'menu',
  },
  {
    label: 'Mutasi Rekening',
    type: 'menu',
  },
  {
    label: 'Rekening Deposito',
    type: 'menu',
  },
  {
    label: 'Info Reward BCA',
    type: 'menu',
  },
  {
    label: 'Info Reksadana',
    type: 'section',
    submenus: [
      {
        label: 'NAB Reksadana',
      },
      {
        label: 'Saldo Reksadana',
      },
    ],
  },
  {
    label: 'Info Kurs',
    type: 'menu',
  },
  {
    label: 'Info RDN',
    type: 'section',
    submenus: [
      {
        label: 'Info Saldo',
      },
      {
        label: 'Mutasi Rekening',
      },
    ],
  },
  {
    label: 'Info KPR',
    type: 'section',
    submenus: [
      {
        label: 'Inquiry Pinjaman',
      },
    ],
  },
  {
    label: 'Info Kartu Kredit',
    type: 'section',
    submenus: [
      {
        label: 'Saldo',
      },
    ],
  },
];

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
              overflow: 'hidden',
              borderRadius: 6,
            }}>
            <ScrollView
              contentContainerStyle={styles.menuContainer}
              overScrollMode='never'
              stickyHeaderIndices={[0]}>
              <View style={styles.header}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../assets/minfo/m-info.png')}
                    style={styles.headerImage}
                  />
                  <Text style={styles.headerText}>m-Info</Text>
                </View>
              </View>
              {masterMenu.map(item => {
                const sectionStyle = {
                  container: {
                    backgroundColor: '#555555',
                    minHeight: 24,
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                  },
                  font: {
                    color: 'white',
                    fontSize: 12,
                  },
                };

                return (
                  <>
                    <TouchableOpacity
                      key={item.label}
                      style={[
                        styles.menuItem,
                        item.type === 'section' && sectionStyle.container,
                      ]}
                      onPress={() => item.label === 'Info Saldo' && openModal}
                      activeOpacity={0.7}>
                      <Text
                        style={{
                          ...styles.menuText,
                          ...(item.type === 'section' ? sectionStyle.font : {}),
                        }}>
                        {item.label}
                      </Text>
                      {item.type === 'menu' && (
                        <Image
                          source={require('../assets/icons/next-blue.png')}
                          style={styles.iconNext}
                        />
                      )}
                    </TouchableOpacity>
                    {item.type === 'section' &&
                      Array.isArray(item?.submenus) && (
                        <View style={styles.subMenuContainer}>
                          {item.submenus.map(submenu => (
                            <TouchableOpacity
                              key={submenu.label}
                              style={styles.subMenuItem}>
                              <Text style={styles.subMenuText}>
                                {submenu.label}
                              </Text>
                              <Image
                                source={require('../assets/icons/next-blue.png')}
                                style={styles.iconNext}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                  </>
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
                <Text>m-Info:</Text>
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
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
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
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    // paddingVertical: 12,
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
    height: 30,
    // paddingVertical: 8,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  subMenuText: {
    fontSize: 14,
    color: '#005BAC',
  },
  iconNext: {
    width: 12,
    height: 12,
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
