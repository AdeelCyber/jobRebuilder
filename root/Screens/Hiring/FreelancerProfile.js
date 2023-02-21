import React, { useContext, useState, useEffect } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native'

import MyText from '../../Components/Text'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Entypo from '@expo/vector-icons/Entypo'
import StarRating from 'react-native-star-rating-widget'
import Context from '../../Context/Context'
import SvgImport from '../../Components/SvgImport'
import DeskIcon from '../../../assets/Svgs/DeskIcon'
import MedicalBagIcon from '../../../assets/Svgs/MedicalBagIcon'
import NewStarIcon from '../../../assets/Svgs/NewStarIcon'
import NewPersonIcon from '../../../assets/Svgs/NewPersonIcon'
import DeskIconBlack from '../../../assets/Svgs/DeskIconBlack'
import MedicalBagBlack from '../../../assets/Svgs/MedicalBagBlack'
import NewStarBlack from '../../../assets/Svgs/NewStarBlack'
import NewPersonBlack from '../../../assets/Svgs/NewPersonBlack'
import Services from './Services'
import Reviews from './Reviews'
import About from './About'
import Portfolio from './Portfolio'
import { getSpecificFreelancer } from '../Profile/services/FreeLancerServices'

import axios from '../../http/axiosSet'
import CustomHeader from '../../Components/CustomHeader2'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../Components/Loader'

const FreeLancerProfile = ({ route }) => {
  const [role, setRole] = useState()

  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const {
    theme: { colors },
  } = useContext(Context)

  const [freelancer, setFreelancer] = useState({})
  const [active, setActive] = useState(1)

  const buttons = [
    { name: 'Services', id: 1, whiteSvg: DeskIcon, blackSvg: DeskIconBlack },
    {
      name: 'Portfolio',
      id: 2,
      whiteSvg: MedicalBagIcon,
      blackSvg: MedicalBagBlack,
    },
    { name: 'Reviews', id: 3, whiteSvg: NewStarIcon, blackSvg: NewStarBlack },
    { name: 'About', id: 4, whiteSvg: NewPersonIcon, blackSvg: NewPersonBlack },
  ]

  const { id } = route.params

  useEffect(() => {
    fetchFreelancer()
    getUser()
  }, [isFocused])

  const getUser = async () => {
    const u = await AsyncStorage.getItem('@userDetail')
    if (JSON.parse(u)?.role === 'Startup Owner') {
      setRole('Startup')
    } else {
      setRole('User')
    }
  }

  const fetchFreelancer = async () => {
    setLoading(true)
    const resp = await getSpecificFreelancer(id)
    setLoading(false)
    console.log(resp)
    if (resp.status === 200) {
      setFreelancer(resp.data.data)
    } else {
      navigation.navigate('CampaignHome')
    }
  }

  if (loading) {
    return <Loader visible={loading} color='white' indicatorSize='large' />
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <CustomHeader
        Title=''
        style={{}}
        nav={navigation}
        icon={() => {
          return (
            <MaterialCommunityIcons
              name='bell-circle'
              size={28}
              color='black'
            />
          )
        }}
      />
      {/* User info */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 23,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <View>
          <Image
            source={{
              uri:
                axios.defaults.baseURL +
                'media/getimage/' +
                freelancer?.userInfo?.avatar,
            }}
            style={{ width: 90, height: 90, borderRadius: 50 }}
          />
        </View>
        <View>
          <View style={{ marginLeft: 13, marginTop: 5 }}>
            <MyText style={{ fontSize: 22, fontWeight: '700' }}>
              {freelancer?.userInfo?.name}
            </MyText>
            <MyText style={{ fontSize: 17, color: 'gray' }}>
              {freelancer?.about?.jobTitle}
            </MyText>
            <MyText style={{ marginTop: 11 }}>
              <MyText style={{ fontSize: 13, fontWeight: '700' }}>
                $ {freelancer?.services?.hourlyRate}
              </MyText>
              <MyText style={{ fontSize: 13, color: 'gray' }}>/Hr</MyText>
              &nbsp; &nbsp; &nbsp;
              <MyText style={{ fontSize: 13, color: 'gray' }}>
                <Entypo name='location-pin' size={20} color='grey' />
                {freelancer?.about?.city}, {freelancer?.about?.country}
              </MyText>
            </MyText>
            <MyText style={{ marginTop: 13 }}>
              <MyText style={{ color: 'gray', fontSize: 13 }}>
                Availability :
              </MyText>
              <MyText style={{ fontSize: 14 }}>
                {' '}
                {freelancer?.about?.responseTime}
              </MyText>
              <MyText style={{ fontSize: 14, color: 'gray' }}>
                {' '}
                Hrs/week{' '}
              </MyText>
            </MyText>
            <View style={{ flexDirection: 'row' }}>
              <StarRating
                rating={freelancer?.userInfo?.rating}
                //onChange={setRating}
                starSize={16}
                style={{ width: 10 }}
              />
              <MyText
                style={{ fontSize: 14, fontWeight: '700', marginLeft: 60 }}
              >
                {' '}
                {freelancer?.userInfo?.rating} &nbsp;&nbsp;{' '}
                <MyText style={{ color: 'gray' }}>
                  ( {freelancer?.ratingAndReviews?.length} Reviews)
                </MyText>
              </MyText>
            </View>
            {role === 'Startup' && (
              <View style={{ marginTop: 15, flexDirection: 'row' }}>
                <TouchableOpacity style={styles.btn}>
                  <MyText
                    style={{
                      color: 'white',
                      fontSize: 11,
                      textAlign: 'center',
                    }}
                  >
                    {' '}
                    Hire Me
                  </MyText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MessagesBox', {
                      userImg: freelancer?.userInfo?.avatar,
                      userName: freelancer?.userInfo?.name,
                      chatType: 'simple',
                    })
                  }}
                  style={[styles.btn, { backgroundColor: 'white' }]}
                >
                  <MyText style={{ fontSize: 11, textAlign: 'center' }}>
                    {' '}
                    Chats
                  </MyText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      <View
        style={{
          borderTopColor: '#D1CECB',
          borderTopWidth: 0.4,
          paddingHorizontal: 25,
          paddingTop: 15,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <FlatList
            horizontal
            data={buttons}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.btnstyle,
                  { backgroundColor: active === index + 1 ? 'black' : 'white' },
                ]}
                onPress={() => {
                  setActive(index + 1)
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <SvgImport
                    svg={active === index + 1 ? item.whiteSvg : item.blackSvg}
                    style={{
                      marginTop: 11,
                      marginLeft: 15,
                      color: 'red',
                    }}
                  />

                  <MyText
                    style={[
                      styles.btntext,
                      { color: active !== index + 1 ? 'black' : 'white' },
                    ]}
                  >
                    {item.name}
                  </MyText>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {active === 1 && (
          <Services
            services={freelancer?.services}
            jobTitle={freelancer?.about?.jobTitle}
          />
        )}
        {active === 2 && <Portfolio portfolio={freelancer?.portfolio} />}
        {active === 3 && <Reviews reviews={freelancer?.ratingAndReviews} />}
        {active === 4 && <About about={freelancer?.about} />}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: 'black',
    width: 80,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 6,
    marginRight: 11,
    borderWidth: 1,
  },
  btnstyle: {
    height: 35,
    width: 107,
    borderRadius: 5,
    backgroundColor: '#232323',
    borderWidth: 1,
    marginRight: 5,
  },
  btntext: {
    fontSize: 13,
    fontWeight: '400',
    color: 'white',
    margin: 10,
    marginLeft: 6,
  },
})

export default FreeLancerProfile
