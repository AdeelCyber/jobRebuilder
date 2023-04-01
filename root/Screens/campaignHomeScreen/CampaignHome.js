import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity, ActivityIndicator, RefreshControl,
} from 'react-native'
import axios from '../../http/axiosSet'

import React, { useContext, useState, useEffect } from 'react'
import Context from '../../Context/Context'
import CustomHeader from '../../Components/CustomHeader'
import { Searchbar } from 'react-native-paper'
import SvgImport from '../../Components/SvgImport'
import SettingIcon2 from '../../../assets/Svgs/SettingIcon2'

import MyText from '../../Components/Text'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import PopularComp from '../../Components/PopularComp'
import RateComp from '../../Components/RateComp'
import {
  getFreelancerCategories,
  getFreelancers, getFreelancersCategoryWise,
} from '../Profile/services/FreeLancerServices'
import { StackActions, NavigationActions } from 'react-navigation'
import Loader from '../../Components/Loader'
import { useIsFocused } from '@react-navigation/native'
import { CartProvider } from '../../Context/CartProvider'
import Error from '../../Components/Error'

const CampaignHome = ({ navigation, routes }) => {
  const [selected, setselected] = useState("All")

  const userdetails = useContext(CartProvider)

  console.log(userdetails)

  const searchResult = (s, status) => {
    if (status === true) {
      if (s === 'All') {
        return
      } else {
        console.log(s)
        const result = popularTempData?.filter((element) => {
          return element.jobTitle === s
        })

        if (result.length === 0) {
          setPopularData([])
        } else {
          setPopularData(result)
        }
      }
      return
    }

    if (s.trim().length === 0) {
      setPopularData(popularTempData)
    } else {
      const result = popularTempData?.filter((element) => {
        return (
          element.name.toLowerCase().includes(s.trim().toLowerCase()) ||
          element.jobTitle.toLowerCase().includes(s.trim().toLowerCase())
        )
      })

      if (result.length === 0) {
        setPopularData([])
      } else {
        setPopularData(result)
      }
    }
  }

  function CategoriesComp({ text, ...props }) {
    const {
      theme: { colors },
    } = useContext(Context)
    return (
      <TouchableOpacity
        onPress={() => {
          setselected(text)
          searchResult(text, true)
        }}
        style={[
          {
            borderRadius: 5,
            paddingVertical: 15,
            paddingHorizontal: 20,

            backgroundColor:
              selected === text ? colors.secondary : colors.white,
          },
          { ...styles.shadow },
          props.style,
        ]}
      >
        <MyText
          style={{
            color: selected === text ? colors.white : colors.text,
            fontSize: 11,
          }}
        >
          {text}
        </MyText>
      </TouchableOpacity>
    )
  }

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Events' })],
  })
  // loading

  const [loading, setLoading] = useState(true)
  //categories hook
  const [catgeories, setCategories] = useState([])
  //Popular hook
  // const [popularData, setPopularData] = useState([
  //   {
  //     name: 'Abdullah',
  //     designation: 'Ceo',
  //     Price: '70.00',
  //     Rating: '5.0',
  //     Image:
  //       'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
  //   },
  //   {
  //     name: 'Abdullah',
  //     designation: 'Ceo',
  //     Price: '70.00',
  //     Rating: '5.0',
  //     Image:
  //       'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
  //   },
  //   {
  //     name: 'Abdullah',
  //     designation: 'Ceo',
  //     Price: '70.00',
  //     Rating: '5.0',
  //     Image:
  //       'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
  //   },
  //   {
  //     name: 'Abdullah',
  //     designation: 'Ceo',
  //     Price: '70.00',
  //     Rating: '5.0',
  //     Image:
  //       'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
  //   },
  //   {
  //     name: 'Abdullah',
  //     designation: 'Ceo',
  //     Price: '70.00',
  //     Rating: '5.0',
  //     Image:
  //       'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
  //   },
  //   {
  //     name: 'Abdullah',
  //     designation: 'Ceo',
  //     Price: '70.00',
  //     Rating: '5.0',
  //     Image:
  //       'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
  //   },
  // ])
  const [popularData, setPopularData] = useState([])
  const [popularTempData, setPopularTempData] = useState([])

  // fixed Rate hook
  const [RateData, setRateData] = useState([
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
  ])
  const [EquityData, setEquityData] = useState([
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
  ])

  const [searchQuery, setSearchQuery] = React.useState('') //searchbar query hook
  // Api call
  const isFocused = useIsFocused()
  useEffect(() => {

    getFreelancersData()
  }, [isFocused])
  const [data, setData] = useState({
    popular: [],
    fixedRate: [],
    equity: [],
  })
  const getFreelancersData = async () => {
    const resp = await getFreelancers()
    const resp2 = await getFreelancerCategories()

    setLoading(false)
    // console.log(resp.data);
    if (resp.data.status === 'OK') {
      console.log(resp.data.data)
      setData(resp.data.data)
    }
    if (resp2.status === 200) {
      setCategories(() => {
        return [{ title: 'All' }, ...resp2.data.data]
      })
    }
  }
  const [categoryData, setCategoryData] = useState([])
  const getFreelancersCategory = async (cat) => {
    const resp = await getFreelancersCategoryWise(cat)

    setLoading(false)
    // console.log(resp.data);
    if (resp.data.status === 'OK') {
      console.log('category data')
      console.log(resp.data.data)

      setCategoryData(resp.data.data.fixedRate)
    }
  }

  const onChangeSearch = (query) => setSearchQuery(query)
  const {
    theme: { colors },
  } = useContext(Context)

  useEffect(() => {
    if(selected === 'All'){
      setLoading(true)
      return }
    else{
      getFreelancersCategory(selected).then(() => setLoading(false))
    }
  },[selected])

  return (
    // main container
    <ScrollView
        refreshControl={
            <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                    getFreelancersData()

                }}
            />

        }
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      {/* header */}
      <CustomHeader nav={navigation} />
      {/* header out */}

      {/*Seacrch bar and setting icon in  */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          marginTop: 20,
          paddingLeft: 13,
          paddingBottom: 10,
        }}
      >
        <Searchbar
          placeholderTextColor={'#232323A1'}
          placeholder='Search'
          onChangeText={(e) => {
            searchResult(e, false)
          }}
          // value={searchQuery}
          style={{
            width: '80%',
            color: colors.placeHolder,
            borderRadius: 6,
            backgroundColor: colors.white,
            fontSize: 10,
          }}
        />
        <View
          style={[
            {
              backgroundColor: colors.white,
              justifyContent: 'center',
              alignContent: 'center',
              borderRadius: 6,
              height: 52,
              width: 52,
              marginLeft: 10,

              elevation: 10,
            },
            styles.shadow,
          ]}
        >
          <SvgImport svg={SettingIcon2} style={{ alignSelf: 'center' }} />
        </View>
        {/* seatch bar icon out */}
      </View>
      <View style={{ marginTop: 10, paddingLeft: 13 }}>
        <MyText style={{ fontSize: 24, fontWeight: '700' }}>Categories</MyText>
      </View>
      <View style={{ width: '100%', marginTop: 4 }}>
        {
          !loading ? (
              <FlatList
                  ListEmptyComponent={
                    <View >
                      <Error message='Categories will be added soon....' />
                    </View>
                  }
                  horizontal
                  data={catgeories}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                      <CategoriesComp

                          text={item.title}
                          style={{
                            marginLeft: index == 0 ? 13 : 9,
                            marginVertical: 15,
                            elevation: 2,
                            marginRight: index == catgeories.length - 1 ? 10 : 0,
                          }}
                      />
                  )}
              />
            ) : (
              <ActivityIndicator style={{flex:1,}} color={colors.Bluish} size={'small'} />
            )

        }
      </View>

      {
        selected === "All" ? (
            <>
              <View style={{ marginTop: 10, paddingLeft: 13, paddingRight: 15 }}>
                <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                >
                  <MyText style={{ fontSize: 24, fontWeight: '700' }}>
                    Most Popular
                  </MyText>
                  <MyText
                      style={{ fontWeight: '500', fontSize: 10, color: '#8489FC' }}
                  >
                    See All
                  </MyText>
                </View>
              </View>
              <View style={{ width: '100%', marginTop: 4 }}>
                {
                  !loading ? (
                      data.popular.length > 0 ? (
                          <FlatList
                              horizontal
                              data={data.popular}
                              showsHorizontalScrollIndicator={false}
                              renderItem={({ item, index }) => (
                                  <PopularComp
                                      name={item.name}
                                      Price={item.hourlyRate}
                                      designation={item.jobTitle}
                                      Rating={item.rating}
                                      Image={item.avatar}
                                      id={item._id}
                                      nav={navigation}
                                      style={{
                                        marginLeft: index == 0 ? 13 : 9,
                                        marginVertical: 15,

                                        marginRight: index == popularData.length - 1 ? 10 : 0,
                                      }}
                                  />
                              )}
                          />
                      ) : (
                          <View >
                            <Error message='No Data Found' />
                          </View>
                      ) ) : (

                      <ActivityIndicator style={{flex:1,}} color={colors.Bluish} size={'large'} />
                  )

                }
              </View>
              <View style={{ marginTop: 10, paddingLeft: 13, paddingRight: 15 }}>
                <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                >
                  <MyText style={{ fontSize: 24, fontWeight: '700' }}>
                    Freelancers
                  </MyText>
                  <MyText
                      style={{ fontWeight: '500', fontSize: 10, color: '#8489FC' }}
                  >
                    See All
                  </MyText>
                </View>
              </View>
              <View style={{ paddingLeft: 17, paddingRight: 15 }}>
                {
                  !loading ? (
                      data.fixedRate.length > 0 ? (
                          data.fixedRate?.map((item, index) => (
                              <RateComp
                                  key={index}
                                  name={item.name}
                                  id={item._id}
                                  Price={item.hourlyRate}
                                  designation={item.jobTitle}
                                  Rating={item.rating}
                                  Image={item.avatar}
                                  style={{ marginVertical: 11 }}
                              />
                          ))
                      ) : (
                          <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:20}}>
                            <Error message='Fixed Rate will be added soon....' />
                          </View>
                      )
                  ) : (
                      <ActivityIndicator style={{flex:1,}} color={colors.Bluish} size={'large'} />
                  )

                }
              </View>
              <View style={{ marginTop: 10, paddingLeft: 13, paddingRight: 15 }}>
                <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                >
                  <MyText style={{ fontSize: 24, fontWeight: '700' }}>
                    Partners
                  </MyText>
                  <Pressable >
                    <MyText
                        style={{ fontWeight: '500', fontSize: 10, color: '#8489FC' }}
                    >
                      See All
                    </MyText>
                  </Pressable>
                </View>
              </View>
              <View style={{ paddingLeft: 17, paddingRight: 15 }}>
                {
                  !loading ? (
                      data.equity.length > 0 ? (
                              data.equity?.map((item, index) => (
                                  <RateComp
                                      key={index}
                                      name={item.name}
                                      Price={item.hourlyRate}
                                      id={item._id}
                                      designation={item.jobTitle}
                                      Rating={item.rating}
                                      Image={item.avatar}
                                      style={{ marginVertical: 11 }}
                                  />
                              )))
                          : (
                              <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:20}}>
                                <Error message='Work for equity will be added soon....' />
                              </View>
                          )
                  ) : (
                      <ActivityIndicator style={{flex:1,}} color={colors.Bluish} size={'large'} />
                  )
                }
              </View>
            </>
        ) : (
            <>
              <View style={{ marginTop: 10, paddingLeft: 13, paddingRight: 15 }}>
                <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                >
                  <MyText style={{ fontSize: 24, fontWeight: '700' }}>
                    {
                      selected
                    }
                  </MyText>
                  <MyText
                      style={{ fontWeight: '500', fontSize: 10, color: '#8489FC' }}
                  >
                    See All
                  </MyText>
                </View>
              </View>
              <View style={{ paddingLeft: 17, paddingRight: 15 }}>
                {
                  !loading ? (
                      categoryData.length > 0 ? (
                              <FlatList
                                    data={categoryData}
                                    renderItem={({ item, index }) => (
                                        <RateComp
                                            key={index}
                                            name={item.name}
                                            Price={item.hourlyRate}
                                            id={item._id}
                                            designation={item.jobTitle}
                                            Rating={item.rating}
                                            Image={item.avatar}
                                            style={{ marginVertical: 11 }}
                                        />
                                    )}
                                />
                            )
                          : (
                              <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:20}}>
                                <Error message='Empty, Search another category....' />
                              </View>
                          )
                  ) : (
                      <ActivityIndicator style={{flex:1,}} color={colors.Bluish} size={'large'} />
                  )
                }
              </View>
            </>
        )
      }

    </ScrollView>
  )
}

export default CampaignHome

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
})
