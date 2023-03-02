import React, { useContext, useState, useEffect } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native'

import Context from '../../Context/Context'
import MyText from '../../Components/Text'
import CustomHeader9 from '../../Components/CustomHeader9'
import Icon from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Swiper from 'react-native-swiper'
import CartProvider from '../../Context/CartProvider'
import { deletePortfolio } from '../Profile/services/ProfileServices'
import Toast from 'react-native-toast-message'

const ViewPortfolio = ({ route }) => {
  const {
    theme: { colors },
  } = useContext(Context)
  const navigation = useNavigation()
  const { accessToken } = useContext(CartProvider)

  const { portfolio } = route.params
  const deleteportfolio = async () => {
    console.log(accessToken)
    const portfolioId = portfolio._id
    console.log(portfolioId)

    const res = await deletePortfolio(accessToken, portfolioId)
    if (res.status == 200) {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Deleted Successfully',
        text2: '.',
      })
      navigation.navigate('HomeService')
    }
  }
  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.container]}>
        <CustomHeader9 Title='View Portfolio' nav={navigation} />
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
          <MyText style={[styles.header, { marginLeft: 30, marginRight: 5 }]}>
            Portfolio Details
          </MyText>
          <Pressable
            style={{
              marginTop: 33,
              height: 18,
              width: 18,
              borderRadius: 50,
              padding: 1,
              backgroundColor: colors.Bluish,
            }}
            onPress={() => {
              navigation.navigate('EditPortfolio', { portfolio: portfolio })
            }}
          >
            <MaterialCommunityIcons
              name='pencil'
              size={16}
              color={colors.white}
            />
          </Pressable>
          <AntDesign
            name='delete'
            size={22}
            color={colors.red}
            style={{ marginTop: 30, marginLeft: 110 }}
            onPress={() => {
              deleteportfolio()
            }}
          />
          <MyText
            style={{
              fontSize: 15,
              fontWeight: '500',
              marginTop: 32,
              marginLeft: 10,
            }}
          >
            120
          </MyText>
          <AntDesign
            name='heart'
            size={22}
            color={colors.red}
            style={{ marginTop: 30, marginLeft: 10 }}
          />
        </View>
        <MyText style={[styles.header, { margin: 30 }]}>Title</MyText>
        <MyText style={styles.textstyle}>{portfolio.title}</MyText>

        <MyText style={[styles.header, { margin: 30 }]}>Description</MyText>

        <MyText style={styles.textstyle}>{portfolio.description}</MyText>

        <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
          <MyText style={[styles.header, { marginLeft: 30, marginRight: 5 }]}>
            Attachments
          </MyText>
          <Pressable
            style={{
              marginTop: 33,
              height: 18,
              width: 18,
              borderRadius: 50,
              padding: 1,
              backgroundColor: colors.Bluish,
            }}
            onPress={() => {
              navigation.navigate('EditPortfolio', { portfolio: portfolio })
            }}
          >
            <MaterialCommunityIcons
              name='pencil'
              size={16}
              color={colors.white}
            />
          </Pressable>
        </View>
        <View
          style={{
            height: 278,
            width: 350,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 1,
            elevation: 7,
            margin: 3,
            shadowColor: colors.Bluish,
          }}
        >
          <View style={styles.swiper}>
            <Swiper showButtons={true} autoplay={true} autoplayTimeout={4}>
              {route.params?.portfolio.attachments.map((i) => (
                <Image
                  source={{
                    uri: `https://stepdev.up.railway.app/media/getimage/${i}`,
                  }}
                  resizeMode='contain'
                  style={{ height: 278, width: 350, borderRadius: 10 }}
                  key={i._id}
                />
              ))}
            </Swiper>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnstyle: {
    height: 35,
    width: 107,
    borderRadius: 5,
    backgroundColor: '#232323',
    margin: 5,
  },
  btntext: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
    margin: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: '700',
    color: '#232323',
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 10,
  },

  textstyle: {
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginRight: 30,
  },
  banner: {
    width: 290,
    height: 290,
    resizeMode: 'contain',
    marginLeft: 30,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  swiper: {
    width: '100%',
    height: 290,
    backgroundColor: '#fff',
    position: 'relative',
  },
})

export default ViewPortfolio
