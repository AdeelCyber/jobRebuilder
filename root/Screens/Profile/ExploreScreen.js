import {StyleSheet, Text, View, FlatList, ScrollView, ActivityIndicator} from 'react-native'

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
import { TouchableOpacity } from 'react-native'
import { getStartupCategories } from './services/startupServices'
import Error from '../../Components/Error'

const ExploreScreen = ({ navigation, routes }) => {
  //categories hook
  const isFocused = useIsFocused()
  // const [catgeories, setCategories] = useState([
  //   { icon: ConstructionIcon, text: 'Construction' },
  //   { icon: GraduationHat, text: 'Education' },
  //   { icon: SoftwareCompanyIcon, text: 'Software Company' },
  //   { icon: AIBrainIcon, text: 'Ai Tech' },
  //   { icon: HeartIcon, text: 'Liked' },
  // ])
  const [catgeories, setCategories] = useState([])

  useEffect(() => {
    fetchData()
  }, [isFocused])
  //Popular hook
  const [popularCards, setPopularCards] = useState([
    {
      src: Buildings,
      title: 'Beyond',
      desc: '',
      raisedFunds: '$250 M',
      minInv: '$124.0',
      ShareHolders: 2560,
    },
    {
      src: Buildings,
      title: 'Beyond',
      desc: '',
      raisedFunds: '$250 M',
      minInv: '$124.0',
      ShareHolders: 2560,
    },
    {
      src: Buildings,
      title: 'Beyond',
      desc: '',
      raisedFunds: '$250 M',
      minInv: '$124.0',
      ShareHolders: 2560,
    },
  ])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    setExploreData([])
    const resp = await getExploreData()
    const resp2 = await getStartupCategories()
    setLoading(false)

    console.log(resp.data)

    if (resp.status === 200) {
      setExploreData(() => {
        let result = resp.data.startups
        const result2 = result.map((element) => {
          element.src = Buildings
          return element
        })
        console.log('result ', result2)
        return result2
      })

      setExploreTempData(() => {
        let result = resp.data.startups
        const result2 = result.map((element) => {
          element.src = Buildings
          return element
        })
        console.log('result ', result2)
        return result2
      })
    } else if (resp.status === 400 || resp.status === 401) {
      navigation.navigate('LoginScreen')
    }

    if (resp2.status === 200) {
      setCategories(resp2.data.categories)
    }
  }
  const [searchQuery, setSearchQuery] = React.useState('') //searchbar query hook
  const [isSearch, setIsSearch] = React.useState(false) //searchbar query hook

  const onChangeSearch = (query) => setSearchQuery(query)
  const {
    theme: { colors },
  } = useContext(Context)
  const numCols = catgeories.length //for categories gapping

  const [exploreData, setExploreData] = useState([])
  const [exploreTempData, setExploreTempData] = useState([])

  const searchResult = (s) => {
    if (s.trim().length === 0) {
      setExploreData(exploreTempData)
      setIsSearch(false)
    } else {
      console.log(exploreData)
      const result = exploreTempData?.filter((element) => {
        return (
          element.businessName.toLowerCase().includes(s.trim().toLowerCase()) ||
          element.category.toLowerCase().includes(s.trim().toLowerCase())
        )
      })

      if (result.length === 0) {
        setExploreData([])
      } else {
        setIsSearch(true)
        setExploreData(result)
      }
    }
  }

  return (
    // main container
    <View style={{ flex: 1, backgroundColor: colors.background }}>

      {/* header */}
      <CustomHeader />
      {/* header out */}
          <ScrollView
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                paddingLeft: 15,
              }}
          >
          {/*Seacrch bar and setting icon in  */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              marginTop: 20,
              paddingLeft: 10,
            }}
          >
            <Searchbar
              placeholder='Search'
              onChangeText={(e) => {
                searchResult(e)
              }}
              style={{
                width: '80%',
                color: colors.placeHolder,
                backgroundColor: '#eeeeee',
                borderRadius: 6,
              }}
            />
            <View
              style={{
                backgroundColor: colors.secondary,
                justifyContent: 'center',
                alignContent: 'center',
                borderRadius: 15,
                height: 42,
                width: 48,
                marginLeft: 10,
              }}
            >
              <SvgImport svg={SettingIcon} style={{ alignSelf: 'center' }} />
            </View>
            {/* seatch bar icon out */}
          </View>
          {/* Categories In */}
          {/*<View style={{ marginTop: 10, display:"none" }}>*/}
          {/*  <MyText*/}
          {/*    style={{ fontSize: 24, fontWeight: '700', paddingLeft: 10 }}*/}
          {/*  >*/}
          {/*    Categories*/}
          {/*  </MyText>*/}
          {/*  <View style={{ width: '100%' }}>*/}
          {/*    <FlatList*/}
          {/*      horizontal*/}
          {/*      data={catgeories}*/}
          {/*      showsHorizontalScrollIndicator={false}*/}
          {/*      renderItem={({ item, index }) => (*/}
          {/*        <HomeCategories*/}
          {/*          svg={item.avatar}*/}
          {/*          title={item.title}*/}
          {/*          style={{}}*/}
          {/*        />*/}
          {/*      )}*/}
          {/*    />*/}
          {/*  </View>*/}
          {/*</View>*/}
          {/* Categories Out */}
          {/* popular In */}

          <View style={{ paddingLeft: 10,marginTop:10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 4,
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: '700' }}>
                {isSearch
                  ? 'Search Result'
                  : exploreData.length !== 0
                  ? 'Join a business'
                  : ''}
              </Text>
              {/*{!isSearch && exploreData.length !== 0 && (*/}
              {/*  // <TouchableOpacity*/}
              {/*  //   onPress={() => {*/}
              {/*  //     navigation.navigate('ExploreAll', { exploreData })*/}
              {/*  //   }}*/}
              {/*  // >*/}
              {/*  //   <MyText*/}
              {/*  //     style={{*/}
              {/*  //       fontWeight: '500',*/}
              {/*  //       fontSize: 10,*/}
              {/*  //       color: colors.lighttext,*/}
              {/*  //       marginRight: 15,*/}
              {/*  //     }}*/}
              {/*  //   >*/}
              {/*  //     See All*/}
              {/*  //   </MyText>*/}
              {/*  // </TouchableOpacity>*/}
              {/*)}*/}
            </View>

            {
              loading ?
                  <ActivityIndicator style={{flex:1,alignSelf:'center'}} color={colors.Bluish} size='large' />:
                  <View style={{ width: '100%', marginTop: 10 }}>
                    <FlatList
                        horizontal
                        data={exploreData}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <HomePopular
                                id={item._id}
                                Src={Buildings}
                                item={item}
                                title={item.businessName}
                                Logo={axios.defaults.baseURL +
                                    'media/getimage/' + item.logo}
                                // raisedFunds={item.raisedFunds}
                                // minInv={item.minInv}
                                ShareHolders={item.budget}
                                style={{
                                  width: 200,
                                }}
                            />
                        )}
                    />
                  </View>
            }
          </View>
          {/* popular Out */}
          {/* Recents In  */}
          {!isSearch && exploreData.length !== 0 && (
            <View style={{ marginTop: '8%', paddingLeft: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: 4,
                }}
              >
                <MyText style={{ fontSize: 24, fontWeight: '700' }}>
                  Work as Freelancer
                </MyText>
                {/*<TouchableOpacity*/}
                {/*  onPress={() => {*/}
                {/*    navigation.navigate('ExploreAll', { exploreData })*/}
                {/*  }}*/}
                {/*>*/}
                {/*  <MyText*/}
                {/*    style={{*/}
                {/*      fontWeight: '500',*/}
                {/*      fontSize: 10,*/}
                {/*      color: colors.lighttext,*/}
                {/*      marginRight: 15,*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    See All*/}
                {/*  </MyText>*/}
                {/*</TouchableOpacity>*/}
              </View>

              {
                loading ?
                    <ActivityIndicator style={{flex:1,alignSelf:'center'}} color={colors.Bluish} size='large' />:
                    <View style={{ width: '100%', marginTop: 10 }}>
                      <FlatList
                          horizontal
                          data={exploreData}
                          showsHorizontalScrollIndicator={false}
                          renderItem={({ item, index }) => (
                              <HomePopular
                                  id={item._id}
                                  Src={Buildings}
                                  item = {item}
                                  title={item.businessName}
                                  Logo={axios.defaults.baseURL + item.logo}
                                  // raisedFunds={item.raisedFunds}
                                  // minInv={item.minInv}
                                  ShareHolders={item.budget}
                                  style={{
                                    width: 200,
                                  }}
                              />
                          )}
                      />
                    </View>
              }
            </View>
          )}
          {exploreData?.length === 0 && !loading &&  (
            <View>
              <Error message='No Campaign Found' />
            </View>
          )}
          </ScrollView>
      {/* Recents Out */}
    </View>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  // container : {
  //     flex:1,
  // }
})
