import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Animated,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {useAuth} from '../../contexts/AuthContext';
import firestore from '@react-native-firebase/firestore';


const KlikBCA = () => {
  const [url, setUrl] = useState('');
  const [detail, setDetail] = useState(false);
  const [inputUserId, setInputUserId] = useState('');
  const [inputPin, setInputPin] = useState('');
  const [loading, setLoading] = useState(true);
  const [saldoNew, setSaldoNew] = useState('');

  const [progress, setProgress] = useState(0); // Optional: To show percentage
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const subscriber = firestore()
      .collection('items')
      .doc('singleItem') // Access the fixed document
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const dataa = documentSnapshot.data();
          setSaldoNew(dataa.name);
        } else {
          console.log('Document does not exist');
          setSaldoNew([]); // Clear data if document doesn't exist
        }
      });

    return () => subscriber(); // Unsubscribe on cleanup
  }, []);

  useEffect(() => {
    // Start the animation
    Animated.timing(animatedWidth, {
      toValue: 100, // Animates to 100% width
      duration: 2000, // 2 seconds
      useNativeDriver: false, // Width animation requires `false`
    }).start();

    // Update progress state for optional percentage display
    const interval = setInterval(() => {
      animatedWidth.addListener(({value}) => setProgress(Math.round(value)));
    }, 50);

    return () => clearInterval(interval); // Clean up listener
  }, [animatedWidth]);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Tanggal
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Bulan (0-11, +1 untuk bulan yang benar)
    const year = today.getFullYear(); // Tahun
    return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
  };

  useEffect(() => {
    const urlTimeout = setTimeout(() => {
      setUrl('login.jsp');
    }, 1000);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(urlTimeout);
      clearTimeout(timeout);
    };
  }, []);

  const handleInformasi = () => {
    setUrl('informasi');
  };
  const {saldo, noRekening, formatSaldo} = useAuth();

  const [popUpConfirm, setPopUpConfirm] = useState(false);
  const [informasiConfirm, setInformasiConfirm] = useState('');

  const onPressBtnLogin = () => {
    if (inputPin.length == 0 && inputUserId.length == 0) {
      setPopUpConfirm();
      setInformasiConfirm(
        'Silahkan mengisi User ID anda/Please input your User ID',
      );
    } else if (inputUserId.length === 0) {
      setPopUpConfirm();
      setInformasiConfirm(
        'Silahkan mengisi User ID anda/Please input your User ID',
      );
    } else if (inputPin.length === 0) {
      setPopUpConfirm();
      setInformasiConfirm('Silahkan mengisi PIN anda/Please input your PIN');
    }else if (!Boolean(Number(inputPin))){
        setPopUpConfirm();
        setInformasiConfirm('PIN Harus angka');
    } else if (inputPin.length < 6) {
        setPopUpConfirm();
        setInformasiConfirm('PIN Kurang dari 6');
    }else{
        setUrl('autthentication');
    }
  };

  const changeSaldo = saldo => {
    const newSaldo = saldo.toString().replace(/\./g, ',');
    return `${newSaldo}.00`;
  };

  const onPressLogout = () => {
    setDetail(false)
    setUrl('login.jsp')
    setInputUserId('')
    setInputPin('')
  }
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          backgroundColor: '#FFF',
          display: 'flex',
          flexDirection: 'row',
          height: 60,
          padding: 10,
        }}>
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{height: 20, width: 20}}
            source={require('../../assets/icons/icon_home.png')}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#cacaca',
            width: '60%',
            paddingHorizontal: 10,
            borderRadius: 50,
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{height: 20, width: 20}}
            source={require('../../assets/icons/icon_browserr.png')}
          />
          <Text style={{marginLeft: 10}}>m.klikbca.com/{url}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '30%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Image
            resizeMode="contain"
            style={{height: 20, width: 20}}
            source={require('../../assets/icons/icon_plus.png')}
          />
          <Image
            resizeMode="contain"
            style={{height: 20, width: 20}}
            source={require('../../assets/icons/icon_bowser_jumlah.png')}
          />
          <Image
            resizeMode="contain"
            style={{height: 20, width: 20}}
            source={require('../../assets/icons/icon_tiga.png')}
          />
        </View>
      </View>
      {loading ? (
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      ) : (
        <View style={{height: 1, marginBottom: 10, backgroundColor: '#cacaca'}}>
          <Text />
        </View>
      )}

      {!loading && (
        <>
          <ImageBackground
            source={require('../../assets/icons/icon_bg_header.png')}
            style={{
              width: '100vw',
              height: 50,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Image
              resizeMode="contain"
              style={{height: 70, width: 70, marginTop: -15}}
              source={require('../../assets/icons/icon_klik_bca.png')}
            />
            <View style={{justifyContent: 'center', paddingLeft: 10}}>
              {url !== '' && url !== 'login.jsp' && (
                <Text style={{color: '#FFF', marginTop: 10}}>
                  Tanggal : {getCurrentDate()}{' '}
                </Text>
              )}
            </View>
          </ImageBackground>
          <View
            style={{height: 5, marginVertical: 1, backgroundColor: '#DEC642'}}>
            <Text />
          </View>
          {url === 'login.jsp' && (
            <>
              <View style={[styles.formContainer, {paddingHorizontal: 10}]}>
                <Text style={[styles.label, {marginTop: 10}]}>
                  Silakan masukkan USER ID Anda
                </Text>
                <Text style={styles.subLabel}>Please enter your USER ID</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setInputUserId(text)}
                />
                <Text style={[styles.label, {marginTop: 10}]}>
                  Silakan masukkan PIN Internet Banking Anda
                </Text>
                <Text style={styles.subLabel}>
                  Please enter your Internet Banking PIN
                </Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={text => setInputPin(text)}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={onPressBtnLogin}>
                    <Text style={styles.loginText}>LOGIN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{display: 'flex', alignSelf: 'flex-end'}}>
                    <Text style={styles.footerText}>Full Site</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  marginVertical: 10,
                  backgroundColor: '#cacaca',
                }}>
                <Text />
              </View>
              <View style={styles.footer}>
                <Image
                  resizeMode="contain"
                  style={{height: 120}}
                  source={require('../../assets/icons/image_bottom.png')}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#4F53B6',
                  height: 40,
                  marginTop: 10,
                }}></View>
            </>
          )}
          {url === 'autthentication' && (
            <>
              <View style={styles.formContainer}>
                <View
                  style={{
                    justifyContent: 'center',
                    height: 30,
                    backgroundColor: '#4F53B6',
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      paddingLeft: 10,
                      fontWeight: 'bold',
                    }}>
                    MENU UTAMA
                  </Text>
                </View>
                <View style={{paddingHorizontal: 20, gap: 5, marginTop: 5}}>
                  <View
                    style={{
                      borderBottomColor: '#4F53B6',
                      borderBottomWidth: 2,
                    }}>
                    <TouchableOpacity style={{marginBottom: 5}}>
                      <Text style={{color: '#4F53B6', fontWeight: '700'}}>
                        Pembelian
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#4F53B6',
                      borderBottomWidth: 2,
                    }}>
                    <TouchableOpacity style={{marginBottom: 5}}>
                      <Text style={{color: '#4F53B6', fontWeight: '700'}}>
                        Pembayaran
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#4F53B6',
                      borderBottomWidth: 2,
                    }}>
                    <TouchableOpacity style={{marginBottom: 5}}>
                      <Text style={{color: '#4F53B6', fontWeight: '700'}}>
                        Pembayaran e-Commerce
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#4F53B6',
                      borderBottomWidth: 2,
                    }}>
                    <TouchableOpacity style={{marginBottom: 5}}>
                      <Text style={{color: '#4F53B6', fontWeight: '700'}}>
                        Transfer Dana
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#4F53B6',
                      borderBottomWidth: 2,
                    }}>
                    <TouchableOpacity
                      style={{marginBottom: 5}}
                      onPress={handleInformasi}>
                      <Text style={{color: '#4F53B6', fontWeight: '700'}}>
                        Informasi Rekening
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{}}>
                    <TouchableOpacity style={{marginBottom: 5}}>
                      <Text style={{color: '#4F53B6', fontWeight: '700'}}>
                        Administrasi
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  height: 30,
                  backgroundColor: '#4F53B6',
                  marginTop: 10,
                }}>
                <TouchableOpacity onPress={onPressLogout}>
                  <Text style={{color: '#FFF', paddingLeft: 10}}>LOGOUT</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {url === 'informasi' && (
            <>
              <View style={styles.formContainer}>
                <View
                  style={{
                    justifyContent: 'center',
                    height: 30,
                    backgroundColor: '#4F53B6',
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      paddingLeft: 10,
                      fontWeight: 'bold',
                    }}>
                    INFORMASI REKENING
                  </Text>
                </View>
                <View style={{paddingHorizontal: 20, gap: 5, marginTop: 5}}>
                  <View
                    style={{
                      borderBottomColor: '#4F53B6',
                      borderBottomWidth: 2,
                    }}>
                    <TouchableOpacity
                      style={{marginBottom: 5}}
                      onPress={() => setUrl('saldo')}>
                      <Text style={{color: '#4F53B6', fontWeight: '700'}}>
                        Informasi Saldo
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#4F53B6',
                      borderBottomWidth: 2,
                    }}>
                    <TouchableOpacity style={{marginBottom: 5}}>
                      <Text style={{color: '#4F53B6', fontWeight: '700'}}>
                        Mutasi Rekaning
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#4F53B6',
                      borderBottomWidth: 2,
                    }}>
                    <TouchableOpacity
                      style={{marginBottom: 5}}
                      onPress={() => setDetail(!detail)}>
                      <Text style={{color: '#4F53B6', fontWeight: '700'}}>
                        Rekening Dana Nasabah (RDN)
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{}}>
                    <View
                      style={{
                        borderBottomColor: '#4F53B6',
                        borderBottomWidth: 2,
                      }}>
                      <TouchableOpacity style={{marginBottom: 5}}>
                        <Text
                          style={{
                            color: '#4F53B6',
                            fontWeight: '700',
                            marginLeft: 20,
                          }}>
                          Infromasi Saldo RDN
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderBottomColor: '#4F53B6',
                        borderBottomWidth: 2,
                      }}>
                      <TouchableOpacity style={{marginBottom: 5}}>
                        <Text
                          style={{
                            color: '#4F53B6',
                            fontWeight: '700',
                            marginLeft: 20,
                          }}>
                          Mutasi RDN
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 30,
                  backgroundColor: '#4F53B6',
                  marginTop: 10,
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: 150,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setUrl('autthentication');
                  }}>
                  <Text style={{color: '#FFF', paddingLeft: 10}}>
                    MENU UTAMA
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                  onPress={onPressLogout}>
                  <Text style={{color: '#FFF', paddingLeft: 10}}>LOGOUT</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {url === 'saldo' && (
            <>
              <View style={styles.formContainer}>
                <View
                  style={{
                    justifyContent: 'center',
                    height: 30,
                    backgroundColor: '#4F53B6',
                  }}>
                  <Text style={{color: '#FFF', paddingLeft: 10}}>
                    INFORMASI REKENING- INFORMASI SALDO
                  </Text>
                </View>
                <View style={{paddingHorizontal: 20, gap: 5, marginTop: 5}}>
                  <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                    <View
                      style={{flex: 1, backgroundColor: '#eaeaea', padding: 4}}>
                      <Text style={{color: '#4F53B6', fontWeight: '700'}}>
                        REKENING
                      </Text>
                    </View>
                    <View
                      style={{flex: 1, backgroundColor: '#eaeaea', padding: 4}}>
                      <Text style={{color: '#4F53B6', fontWeight: '700'}}>
                        SALDO EFEKTIF
                      </Text>
                    </View>
                  </View>
                  <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          color: '#4F53B6',
                          fontWeight: '700',
                          fontSize: 12,
                        }}>
                        {noRekening}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            color: '#4F53B6',
                            fontWeight: '700',
                            fontSize: 12,
                          }}>
                          IDR
                        </Text>
                      </View>
                      <View style={{flex: 2}}>
                        <Text
                          style={{
                            color: '#4F53B6',
                            fontWeight: '700',
                            fontSize: 12,
                          }}>
                          {saldoNew ? changeSaldo(formatSaldo(saldoNew)) : saldo ? changeSaldo(formatSaldo(saldo)) : 'Rp. 0,00'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 30,
                  backgroundColor: '#4F53B6',
                  marginTop: 10,
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: 150,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setUrl('autthentication');
                  }}>
                  <Text style={{color: '#FFF', paddingLeft: 10}}>
                    MENU UTAMA
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                  onPress={onPressLogout}>
                  <Text style={{color: '#FFF', paddingLeft: 10}}>LOGOUT</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}
      <Modal
        animationType="fade"
        visible={popUpConfirm}
        transparent
        onRequestClose={() => setPopUpConfirm(false)}>
        <KeyboardAvoidingView enabled behavior={'height'} style={{flex: 1}}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={{display:'flex', gap:20}}>
                <Text style={styles.modalTitle}>m.klikbca.com menyatakan</Text>
                <Text style={{fontSize:12}}>{informasiConfirm}</Text>
              </View>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setPopUpConfirm(false)}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#0033A0',
    padding: 10,
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11335ca1',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: 200,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: '#093967',
    // textAlign: 'center',
    fontSize: 18,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  formContainer: {
    // padding: 5,
  },
  label: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#393B4D',
    textDecorationLine: 'underline',
  },
  subLabel: {
    fontSize: 12,
    color: '#D69735',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    width: '65%',
    backgroundColor: '#ffffff',
    paddingVertical: 2,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#cccccc',
    padding: 4,
    width: 100,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  loginText: {
    fontSize: 12,
  },
  banner: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#dddddd',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannerSubText: {
    fontSize: 12,
    color: '#808080',
    marginVertical: 5,
  },
  learnMore: {
    color: '#0033A0',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    // padding: 10,
  },
  footerText: {
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  loadingBar: {
    height: 4,
    width: 100,
    backgroundColor: '#cacaca',
  },
  modalButton: {
    alignSelf: 'flex-end', // Posisikan tombol di bagian kanan
    paddingVertical: 10,
    paddingHorizontal: 20,
    // backgroundColor: '#2a2a2a',
    borderRadius: 5,
  },
  modalButtonText: {
    // color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default KlikBCA;
