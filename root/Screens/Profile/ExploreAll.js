import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'

import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context'
import CustomHeader from '../../Components/CustomHeader'
import { Searchbar } from 'react-native-paper'
import SvgImport from '../../Components/SvgImport'
import SettingIcon from '../../../assets/Svgs/SettingIcon'
import GraduationHat from '../../../assets/Svgs/GraduationHat'
import MyText from '../../Components/Text'
import HomeCategories from '../../Components/HomeCategories'
import HomePopular from '../../Components/HomePopular'
import Buildings from '../../../assets/img/Buildings.png'
import Logo from '../../../assets/Svgs/Logo'
import HeartIcon from '../../../assets/Svgs/HeartIcon'
import AIBrainIcon from '../../../assets/Svgs/AIBrainIcon'
import SoftwareCompanyIcon from '../../../assets/Svgs/SoftwareCompanyIcon'
import ConstructionIcon from '../../../assets/Svgs/ConstructionIcon'
import { getExploreData } from './services/FreeLancerServices'
import axios from '../../http/axiosSet'
import { useIsFocused } from '@react-navigation/native'
import Loader from '../../Components/Loader'

const ExploreAll = ({ route }) => {
  const { exploreData } = route.params
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
      }}
    >
      <CustomHeader />
      <View>
        <MyText style={{ fontSize: 24, fontWeight: '700', marginTop: 15 }}>
          See All StartUps
        </MyText>
      </View>
      <View style={{ width: '100%', marginTop: 10 }}>
        <FlatList
          //   horizontal
          data={exploreData}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <HomePopular
              id={item._id}
              Src={Buildings}
              title={item.businessName}
              Logo={axios.defaults.baseURL + item.logo}
              // raisedFunds={item.raisedFunds}
              // minInv={item.minInv}
              ShareHolders={item.budget}
              style={{}}
              w={'100%'}
            />
          )}
        />
      </View>
    </ScrollView>
  )
}

export default ExploreAll
