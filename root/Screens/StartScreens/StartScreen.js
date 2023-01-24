import React, { useContext } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    ImageBackground,

} from 'react-native';

import Context from "../../Context/Context";
import MyText from '../../Components/Text';

import Icon from '@expo/vector-icons/FontAwesome';
import Icons from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Fontisto from '@expo/vector-icons/Fontisto'

const StartScreen = () => {
    const {
        theme: { colors },
    } = useContext(Context);
    const navigation = useNavigation()


    return (
        <ScrollView>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View
                    style={{
                        backgroundColor: colors.Bluish,
                        borderRadius: 10,
                        width: '88%',
                        height: 230,
                        alignSelf: 'center',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 1.5,
                        shadowRadius: 2,
                        elevation: 5,
                        marginTop: 20
                    }}>
                    <ImageBackground
                        source={require('../../../assets/img/work.png')}
                        style={{ width: '95%', height: '100%', marginLeft: 20 }}>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ height: 40, width: 40, backgroundColor: colors.white, borderRadius: 50 }}>
                                <Icon name="rocket" size={25} color="#8489FC" style={{ margin: 6 }} />
                            </View>

                            <MyText
                                style={{
                                    color: 'white',
                                    fontSize: 16,
                                    marginTop: 10,

                                }}>
                                Build a Startup
                            </MyText>
                            <MyText
                                style={{
                                    color: 'white',
                                    fontSize: 10,
                                    marginTop: 10,
                                    marginRight: 60

                                }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Etiam elementum pharetra consectetur adipiscing elit.consectetur elit.
                            </MyText>

                        </View>
                        <Pressable
                            style={{
                                backgroundColor: colors.white,
                                width: 90,
                                height: 33,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 40,

                            }}
                            onPress={() => {
                                // storedata();
                                console.log(arr);
                                navigation.navigate('SecondScreen', { ar: arr });
                                setModalVisible(false);
                            }}>
                            <MyText
                                style={{
                                    color: colors.pink,
                                    fontSize: 10,
                                }}>
                                Build
                            </MyText>
                        </Pressable>
                    </ImageBackground>
                </View>

                <View
                    style={{
                        backgroundColor: colors.white,
                        borderRadius: 10,
                        width: '88%',
                        height: 230,
                        alignSelf: 'center',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 1.5,
                        shadowRadius: 2,
                        elevation: 5,
                        marginTop: 20

                    }}>
                    <ImageBackground
                        source={require('../../../assets/img/working.jpg')}
                        style={{ width: '95%', height: '100%', marginLeft: 20 }}>
                        <View style={{ marginTop: 10 }}>
                            <View style={{
                                height: 40,
                                width: 40,
                                backgroundColor: colors.white,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 1.5,
                                shadowRadius: 2,
                                elevation: 5,
                                borderRadius: 50
                            }}>
                                <Image
                                    source={require('../../../assets/img/desk.png')}
                                    style={{ height: 25, width: 25, alignSelf: 'center', margin: 6 }} />
                            </View>

                            <MyText
                                style={{
                                    fontSize: 16,
                                    marginTop: 10,
                                    fontWeight: 'bold'

                                }}>
                                Work for Equity / Fixed price
                            </MyText>
                            <MyText
                                style={{
                                    fontSize: 10,
                                    marginTop: 10,
                                    marginRight: 60

                                }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Etiam elementum pharetra consectetur adipiscing elit.consectetur elit.
                            </MyText>

                        </View>
                        <Pressable
                            style={{
                                backgroundColor: "#ba55d3",
                                width: 90,
                                height: 33,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 40,

                            }}
                            onPress={() => {
                                // storedata();
                                console.log(arr);
                                navigation.navigate('SecondScreen', { ar: arr });
                                setModalVisible(false);
                            }}>
                            <MyText
                                style={{
                                    color: colors.white,
                                    fontSize: 10,
                                }}>
                                Participate
                            </MyText>
                        </Pressable>
                    </ImageBackground>
                </View>

                <View
                    style={{
                        backgroundColor: colors.Bluish,
                        borderRadius: 10,
                        width: '88%',
                        height: 230,
                        alignSelf: 'center',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 1.5,
                        shadowRadius: 2,
                        elevation: 5,
                        marginTop: 20
                    }}>
                    <ImageBackground
                        source={require('../../../assets/img/invest.png')}
                        style={{ width: '95%', height: '100%', marginLeft: 20 }}>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ height: 40, width: 40, backgroundColor: colors.white, borderRadius: 50 }}>
                                <Icons name="coins" size={25} color="#8489FC" style={{ margin: 6 }} />
                            </View>

                            <MyText
                                style={{
                                    color: 'white',
                                    fontSize: 16,
                                    marginTop: 10,

                                }}>
                                Invest in Startup
                            </MyText>
                            <MyText
                                style={{
                                    color: 'white',
                                    fontSize: 10,
                                    marginTop: 10,
                                    marginRight: 60

                                }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Etiam elementum pharetra consectetur adipiscing elit.consectetur elit.
                            </MyText>

                        </View>
                        <Pressable
                            style={{
                                backgroundColor: colors.white,
                                width: 100,
                                height: 33,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 40,

                            }}
                            onPress={() => {
                                // storedata();
                                console.log(arr);
                                navigation.navigate('SecondScreen', { ar: arr });
                                setModalVisible(false);
                            }}>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <Fontisto name="locked" size={13} color="#8489FC" style={{ marginRight: 5 }} />
                                <MyText
                                    style={{
                                        color: colors.Bluish,
                                        fontSize: 10,
                                    }}>
                                    Coming Soon
                                </MyText>
                            </View>

                        </Pressable>
                    </ImageBackground>
                </View>

                <View
                    style={{
                        flexDirection: "column",
                        width: "95%",
                        alignSelf:"center",
                        paddingHorizontal: 10,
                    }}
                >
                     <Pressable
                            style={{
                                backgroundColor: colors.white,
                                width: "100%",
                                height: 50,
                                borderWidth:1,
                                borderColor:colors.Bluish,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,

                            }}
                            onPress={() => {
                                navigation.navigate('LoginScreen')

                            }}>
                                <MyText
                                    style={{
                                        fontSize: 16,
                                    }}>
                                    Skip
                                </MyText>

                        </Pressable>
                    </View>
                </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default StartScreen;