import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import BagIcon2 from '../../assets/Svgs/BagIcon2'
import ChatIcon from '../../assets/Svgs/ChatIcon'
import CompassIcon from '../../assets/Svgs/CompassIcon'
import HomeIcon from '../../assets/Svgs/HomeIcon'
import ListIcon from '../../assets/Svgs/ListIcon'
import PersonIcon from '../../assets/Svgs/PersonIcon'
import PolygonIcon from '../../assets/Svgs/PolygonIcon'
import RectangleIcon from '../../assets/Svgs/RectangleIcon'
// import { CartProvider } from '../Context/CartProvider'
import SvgImport from './SvgImport'
import MyText from './Text'

const icons = [HomeIcon, ChatIcon, CompassIcon, BagIcon2, PersonIcon]

const Tab = ({ title, selected, onSelect, index, selectedFun }) => {
  return (
    <View style={[styles.tab, { width: 60 }]}>
      {selected === index && <SvgImport svg={RectangleIcon} />}

      <View
        style={{
          marginTop: selected === index ? 8 : 13,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SvgImport svg={icons[index]} />

        <MyText style={{ marginTop: 3 }}>{title}</MyText>
      </View>
    </View>
  )
}
const FreelancerTabBar = (props) => {
  const navigation = useNavigation()

  const [selectedTab, setSelectedTab] = useState(0)
  const [isToken, setIsToken] = useState(false)

  useEffect(() => {
    getToken()
  })

  const getToken = async () => {
    const token = await AsyncStorage.getItem('@accessToken')
    if (token) {
      setIsToken(true)
    }
  }

  const goToPage = (index) => {
    if (index === 0) {
      navigation.navigate('HomeService')
    } else if (index === 1) {
      navigation.navigate('Message')
    } else if (index === 2) {
      navigation.navigate('Explore')
    } else if (index === 3) {
      navigation.navigate('CampaignManagement')
    } else if (index === 4) {
      navigation.navigate('FreelancerProfile')
    }
  }

  return (
    <View style={[styles.container, { display: true ? 'flex' : 'none' }]}>
      <TouchableOpacity
        onPress={() => {
          setSelectedTab(0)
          goToPage(0)
        }}
      >
        <Tab
          title='Home'
          selected={selectedTab}
          selectedFun={setSelectedTab}
          index={0}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedTab(1)
          goToPage(1)
        }}
      >
        <Tab
          title='Chats'
          selected={selectedTab}
          selectedFun={setSelectedTab}
          index={1}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelectedTab(2)
          goToPage(2)
        }}
      >
        <Tab
          title='Explore'
          selected={selectedTab}
          selectedFun={setSelectedTab}
          index={2}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelectedTab(3)
          goToPage(3)
        }}
      >
        <Tab
          title='Career'
          selected={selectedTab}
          selectedFun={setSelectedTab}
          index={3}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedTab(4)
          goToPage(4)
        }}
      >
        <Tab
          title='Profile'
          selected={selectedTab}
          selectedFun={setSelectedTab}
          index={4}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#fafafa',
    paddingBottom: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabTitle: {},
})

export default FreelancerTabBar
