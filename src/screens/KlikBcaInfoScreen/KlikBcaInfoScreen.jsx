import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const KlikBCA = () => {

    const [url, setUrl] = useState("login.jsp")
    const [detail, setDetail] = useState(false);
    const [inputUserId, setInputUserId] = useState('');
    const [inputPin, setInputPin] = useState('');

    const handleInformasi = () => {
        setUrl('informasi');
    };
    const { saldo, noRekening, formatSaldo, userPin } = useAuth();

    const onPressBtnLogin = () => {
        if (inputPin === userPin) {
            setUrl('autthentication')
        }
    }

    const changeSaldo = (saldo) => {
        const newSaldo = saldo.toString().replace(/\./g, ',')
        return `${newSaldo}.00`
    }
    // const onPressRdn = () => {
    //     setDetail(!detail);
    // };
    return (
        <ScrollView style={styles.container}>
            <View style={{ backgroundColor: '#FFF', display: 'flex', flexDirection: 'row', height: 60, padding: 10, }}>
                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        resizeMode="contain"
                        style={{ height: 20, width: 20 }}
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
                    }}
                >
                    <Image
                        resizeMode="contain"
                        style={{ height: 20, width: 20 }}
                        source={require('../../assets/icons/icon_browserr.png')}
                    />
                    <Text style={{ marginLeft: 10 }}>m.klikbca.com/{url}</Text>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '30%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                    }}
                >
                    <Image
                        resizeMode="contain"
                        style={{ height: 20, width: 20 }}
                        source={require('../../assets/icons/icon_plus.png')}
                    />
                    <Image
                        resizeMode="contain"
                        style={{ height: 20, width: 20 }}
                        source={require('../../assets/icons/icon_bowser_jumlah.png')}
                    />
                    <Image
                        resizeMode="contain"
                        style={{ height: 20, width: 20 }}
                        source={require('../../assets/icons/icon_tiga.png')}
                    />
                </View>
            </View>
            <View style={{ height: 1, marginBottom: 10, backgroundColor: '#cacaca' }}>
                <Text />
            </View>
            <ImageBackground
                source={require('../../assets/icons/icon_bg_header.png')}
                style={{ width: '100vw', height: 50 }}
            >
                <Image
                    resizeMode="contain"
                    style={{ height: 70, width: 70, marginTop: -15 }}
                    source={require('../../assets/icons/icon_klik_bca.png')}
                />
            </ImageBackground>
            <View style={{ height: 5, marginVertical: 1, backgroundColor: '#DEC642' }}>
                <Text />
            </View>
            {url === "login.jsp" &&
                <>
                    <View style={[styles.formContainer, { paddingHorizontal: 10 }]}>
                        <Text style={[styles.label, { marginTop: 10 }]}>
                            Silakan masukkan USER ID Anda
                        </Text>
                        <Text style={styles.subLabel}>
                            Please enter your USER ID
                        </Text>
                        <TextInput style={styles.input} onChangeText={(text) => setInputUserId(text)} />
                        <Text style={[styles.label, { marginTop: 10 }]}>
                            Silakan masukkan PIN Internet Banking Anda
                        </Text>
                        <Text style={styles.subLabel}>
                            Please enter your Internet Banking PIN
                        </Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(text) => setInputPin(text)}
                        />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.loginButton} onPress={onPressBtnLogin}>
                                <Text style={styles.loginText}>LOGIN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ display: 'flex', alignSelf: 'flex-end' }}>
                                <Text style={styles.footerText}>Full Site</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 1, marginVertical: 10, backgroundColor: '#cacaca' }}>
                        <Text />
                    </View>
                    <View style={styles.footer}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 120 }}
                            source={require('../../assets/icons/image_bottom.png')}
                        />
                    </View>
                    <View style={{ backgroundColor: '#4F53B6', height: 40, marginTop: 10 }}></View>
                </>
            }
            {url === "autthentication" && (
                <>
                    <View style={styles.formContainer}>
                        <View style={{ justifyContent: 'center', height: 30, backgroundColor: '#4F53B6' }}>
                            <Text style={{ color: '#FFF', paddingLeft: 10 }}>MENU UTAMA</Text>
                        </View>
                        <View style={{ paddingHorizontal: 20, gap: 5, marginTop: 5 }}>
                            <View style={{ borderBottomColor: '#4F53B6', borderBottomWidth: 2 }}>
                                <TouchableOpacity style={{ marginBottom: 5 }}>
                                    <Text style={{ color: '#4F53B6', fontWeight: '700' }}>Pembelian</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderBottomColor: '#4F53B6', borderBottomWidth: 2 }}>
                                <TouchableOpacity style={{ marginBottom: 5 }}>
                                    <Text style={{ color: '#4F53B6', fontWeight: '700' }}>Pembayaran</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderBottomColor: '#4F53B6', borderBottomWidth: 2 }}>
                                <TouchableOpacity style={{ marginBottom: 5 }}>
                                    <Text style={{ color: '#4F53B6', fontWeight: '700' }}>Pembayaran e-Commerce</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderBottomColor: '#4F53B6', borderBottomWidth: 2 }}>
                                <TouchableOpacity style={{ marginBottom: 5 }}>
                                    <Text style={{ color: '#4F53B6', fontWeight: '700' }}>Transfer Dana</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderBottomColor: '#4F53B6', borderBottomWidth: 2 }} >
                                <TouchableOpacity style={{ marginBottom: 5 }} onPress={handleInformasi}>
                                    <Text style={{ color: '#4F53B6', fontWeight: '700' }}>Informasi Rekening</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{}}>
                                <TouchableOpacity style={{ marginBottom: 5 }}>
                                    <Text style={{ color: '#4F53B6', fontWeight: '700' }}>Administrasi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', height: 30, backgroundColor: '#4F53B6', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => setUrl('login.jsp')}>
                            <Text style={{ color: '#FFF', paddingLeft: 10 }}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            {url === "informasi" && (
                <>
                    <View style={styles.formContainer}>
                        <View style={{ justifyContent: 'center', height: 30, backgroundColor: '#4F53B6' }}>
                            <Text style={{ color: '#FFF', paddingLeft: 10 }}>INFORMASI REKENING</Text>
                        </View>
                        <View style={{ paddingHorizontal: 20, gap: 5, marginTop: 5 }}>
                            <View style={{ borderBottomColor: '#4F53B6', borderBottomWidth: 2 }}>
                                <TouchableOpacity style={{ marginBottom: 5 }}>
                                    <Text style={{ color: '#4F53B6', fontWeight: '700' }}>Informasi Saldo</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderBottomColor: '#4F53B6', borderBottomWidth: 2 }}>
                                <TouchableOpacity style={{ marginBottom: 5 }}>
                                    <Text style={{ color: '#4F53B6', fontWeight: '700' }}>Mutasi Rekaning</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderBottomColor: '#4F53B6', borderBottomWidth: 2 }} >
                                <TouchableOpacity style={{ marginBottom: 5 }} onPress={() => setDetail(!detail)}>
                                    <Text style={{ color: '#4F53B6', fontWeight: '700' }}>Rekening Dana Nasabah (RDN)</Text>
                                </TouchableOpacity>
                            </View>
                            {detail === true &&
                                <View style={{}}>
                                    <View style={{ borderBottomColor: '#4F53B6', borderBottomWidth: 2 }}>
                                        <TouchableOpacity style={{ marginBottom: 5 }} onPress={() => setUrl('saldo')}>
                                            <Text style={{ color: '#4F53B6', fontWeight: '700', marginLeft: 20, }}>Infromasi Saldo RDN</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ borderBottomColor: '#4F53B6', borderBottomWidth: 2 }}>
                                        <TouchableOpacity style={{ marginBottom: 5 }}>
                                            <Text style={{ color: '#4F53B6', fontWeight: '700', marginLeft: 20, }}>Mutasi RDN</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                    <View
                        style={{
                            height: 30,
                            backgroundColor: '#4F53B6',
                            marginTop: 10,
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 100,
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                setDetail(false)
                                setUrl('autthentication')
                            }}
                        >
                            <Text style={{ color: '#FFF', paddingLeft: 10 }}>MENU UTAMA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                setDetail(false)
                                setUrl('login.jsp')
                            }}
                        >
                            <Text style={{ color: '#FFF', paddingLeft: 10 }}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>

                </>
            )}
            {url === "saldo" && (
                <>
                    <View style={styles.formContainer}>
                        <View style={{ justifyContent: 'center', height: 30, backgroundColor: '#4F53B6' }}>
                            <Text style={{ color: '#FFF', paddingLeft: 10 }}>INFORMASI REKENING- INFORMASI SALDO</Text>
                        </View>
                        <View style={{ paddingHorizontal: 20, gap: 5, marginTop: 5 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                                <View style={{ flex: 1, backgroundColor: '#eaeaea', padding: 4 }}><Text style={{ color: '#4F53B6', fontWeight: '700' }}>REKENING</Text></View>
                                <View style={{ flex: 1, backgroundColor: '#eaeaea', padding: 4 }}><Text style={{ color: '#4F53B6', fontWeight: '700' }}>SALDO EFEKTIF</Text></View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                                <View style={{ flex: 1, }}><Text style={{ color: '#4F53B6', fontWeight: '700', fontSize: 12 }}>{noRekening}</Text></View>
                                <View style={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#4F53B6', fontWeight: '700', fontSize: 12 }}>IDR</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#4F53B6', fontWeight: '700', fontSize: 12 }}>{saldo ? changeSaldo(formatSaldo(saldo)) : 'Rp. 0,00'}</Text>
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
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 100,
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                setDetail(false);
                                setUrl('autthentication');
                            }}
                        >
                            <Text style={{ color: '#FFF', paddingLeft: 10 }}>MENU UTAMA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                setDetail(false);
                                setUrl('login.jsp');
                            }}
                        >
                            <Text style={{ color: '#FFF', paddingLeft: 10 }}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
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
        textDecorationLine: 'underline'
    },
});

export default KlikBCA;
