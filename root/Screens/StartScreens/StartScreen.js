import React, { useContext } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native'

import Context from '../../Context/Context'
import MyText from '../../Components/Text'

import Icon from '@expo/vector-icons/FontAwesome'
import Icons from '@expo/vector-icons/FontAwesome5'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Fontisto from '@expo/vector-icons/Fontisto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CartContext from '../../Context/CartProvider'

const StartScreen = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const contest = useContext(CartContext)
  React.useLayoutEffect(() => {
    getData()
  }, [isFocused])

  const getData = async () => {
    const token = await AsyncStorage.getItem('@accessToken')
    const Refreshtoken = await AsyncStorage.getItem('@refreshToken')
    const user = await AsyncStorage.getItem('@userDetail')
    const userDetail = JSON.parse(user)

    if (token) {
      contest.setaccessToken(token)
      contest.setrefreshToken(Refreshtoken)
      contest.setuserdetails(userDetail)
      console.log('U', userDetail)
      contest.setislogin(true)
      if (userDetail.role === 'Freelancer') navigation.navigate('HomeService')
      else navigation.navigate('CampaignHome')
    }
  }

  const {
    theme: { colors },
  } = useContext(Context)

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
            marginTop: 20,
          }}
        >
          <ImageBackground
            source={require('../../../assets/img/work.png')}
            style={{ width: '95%', height: '100%', marginLeft: 20 }}
          >
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: colors.white,
                  borderRadius: 50,
                }}
              >
                <Icon
                  name='rocket'
                  size={25}
                  color='#8489FC'
                  style={{ margin: 6 }}
                />
              </View>

              <MyText
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}
              >
                Start a Business
              </MyText>
              <MyText
                style={{
                  color: 'white',
                  fontSize: 10,
                  marginTop: 10,
                  marginRight: 110,
                  fontWeight: '600',
                  textAlign: 'justify',
                }}
              >
                Break down your business idea{'\n'}Build a team Raise funds
                (coming soon){'\n'}Hire an expert
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
                navigation.navigate('CreateAccount', { role: 'Startup Owner' })
              }}
            >
              <MyText
                style={{
                  color: '#ba55d3',
                  fontSize: 10,
                }}
              >
                Start
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
            marginTop: 20,
          }}
        >
          <ImageBackground
            source={require('../../../assets/img/working.jpg')}
            style={{ width: '95%', height: '100%', marginLeft: 20 }}
          >
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: colors.white,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1.5,
                  shadowRadius: 2,
                  elevation: 5,
                  borderRadius: 50,
                }}
              >
                <Image
                  source={require('../../../assets/img/desk.png')}
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'center',
                    margin: 6,
                  }}
                />
              </View>

              <MyText
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}
              >
                Join a Business as Partner or{'\n'}Work as a Freelancer
              </MyText>
              <MyText
                style={{
                  fontWeight: '600',
                  fontSize: 10,
                  marginTop: 10,
                  marginRight: 110,
                  textAlign: 'justify',
                }}
              >
                Work for equity (own part of the business){'\n'}Work for a fixed
                rate
              </MyText>
            </View>
            <Pressable
              style={{
                backgroundColor: '#ba55d3',
                width: 90,
                height: 33,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
              }}
              onPress={() => {
                navigation.navigate('CreateAccount', { role: 'Freelancer' })
              }}
            >
              <MyText
                style={{
                  color: colors.white,
                  fontSize: 10,
                }}
              >
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
            marginTop: 20,
          }}
        >
          <ImageBackground
            source={require('../../../assets/img/invest.png')}
            style={{ width: '95%', height: '100%', marginLeft: 20 }}
          >
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: colors.white,
                  borderRadius: 50,
                }}
              >
                <Icons
                  name='coins'
                  size={25}
                  color='#8489FC'
                  style={{ margin: 6 }}
                />
              </View>

              <MyText
                style={{
                  color: 'white',
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}
              >
                Invest
              </MyText>
              <MyText
                style={{
                  color: 'white',
                  fontSize: 10,
                  marginTop: 10,
                  marginRight: 110,
                  marginBottom: 15,
                  textAlign: 'justify',
                }}
              >
                Invest in early-stage business{'\n'}Support new business
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
                // navigation.navigate("CreateAccount");
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Fontisto
                  name='locked'
                  size={13}
                  color='#8489FC'
                  style={{ marginRight: 5 }}
                />
                <MyText
                  style={{
                    color: colors.Bluish,
                    fontSize: 10,
                  }}
                >
                  Coming Soon
                </MyText>
              </View>
            </Pressable>
          </ImageBackground>
        </View>

        <View
          style={{
            flexDirection: 'column',
            width: '95%',
            alignSelf: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Pressable
            style={{
              backgroundColor: colors.white,
              width: '100%',
              height: 50,
              borderWidth: 1,
              borderColor: colors.Bluish,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 30,
            }}
            onPress={() => {
              contest.setUserTab(true)
              navigation.navigate('Explore')
            }}
          >
            <MyText
              style={{
                fontSize: 16,
              }}
            >
              Skip
            </MyText>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default StartScreen
