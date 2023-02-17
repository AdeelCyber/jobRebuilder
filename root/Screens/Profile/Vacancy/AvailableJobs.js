import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import CustomHeader from '../../../Components/CustomHeader2'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Searchbar } from 'react-native-paper'
import SvgImport from '../../../Components/SvgImport'
import SettingIcon2 from '../../../../assets/Svgs/Setting'
import { useContext } from 'react'
import GlobalContext from '../../../Context/Context'
import ListIcon from '../../../../assets/Svgs/ListIcon'
import { FlatList } from 'react-native'
import { useState } from 'react'
import { Pressable } from 'react-native'
import MyText from '../../../Components/Text'
import { StyleSheet } from 'react-native'
import DollarIcon from '../../../../assets/Svgs/DollarIcon'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { getCareerJobs } from '../services/jobServices'
import axios from '../../../http/axiosSet'
import Loader from '../../../Components/Loader'
const AvailableJobs = () => {
  const [catgeories, setCategories] = useState([
    'All',
    'Graphic Designer',
    'SMM',
    'Web Developer',
    'SEO',
  ])
  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(true)

  const [jobs, setJobs] = useState([])
  const [tempJobs, setTempJobs] = useState([])

  useEffect(() => {
    getData()
  }, [isFocused])

  const [error, setError] = useState(null)

  const getData = async () => {
    setLoading(true)
    setJobs([])
    const resp = await getCareerJobs()
    setLoading(false)

    if (resp.status === 200) {
      setJobs(resp.data.data)
      setTempJobs(resp.data.data)
    } else if (resp.status === 400 || resp.status === 401) {
      navigation.navigate('LoginScreen')
    }
  }

  const searchResult = (s) => {
    if (s.trim().length === 0) {
      setJobs(tempJobs)
    } else {
      const result = tempJobs?.filter((element) => {
        return (
          element.businessName.toLowerCase().includes(s.trim().toLowerCase()) ||
          element.role.type.toLowerCase().includes(s.trim().toLowerCase())
        )
      })

      if (result.length === 0) {
        setJobs([])
      } else {
        setJobs(result)
      }
    }
  }

  function CategoriesComp({ text, ...props }) {
    const [selected, setselected] = useState(false)
    const {
      theme: { colors },
    } = useContext(GlobalContext)
    return (
      <Pressable
        onPress={() => {
          setselected(!selected)
        }}
        style={[
          {
            borderRadius: 5,
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: selected ? colors.secondary : colors.white,
          },
          { ...styles.shadow },
          props.style,
        ]}
      >
        <MyText
          style={{ color: selected ? colors.white : colors.text, fontSize: 11 }}
        >
          {text}
        </MyText>
      </Pressable>
    )
  }

  const JobBox = ({ job }) => (
    <View
      onPress={() => {
        // navigation.navigate('ActiveOrderDetail', { orderId: order._id })
      }}
      style={[styles.orderItem]}
    >
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Image
            source={{
              uri: axios.defaults.baseURL + 'media/getimage/' + job?.logo,
            }}
            style={{ width: 40, height: 40 }}
          />
        </View>
        <View
          style={{
            marginLeft: 11,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <MyText
              style={{ fontSize: 17, fontWeight: '500', marginBottom: 2 }}
            >
              {job?.businessName}
            </MyText>
            <MyText
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: 'rgba(35, 35, 35, 0.5)',
              }}
            >
              {job?.role.type}
            </MyText>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: colors.secondary,
                paddingVertical: 4,
                paddingHorizontal: 20,
                borderRadius: 6,
              }}
              onPress={() => {
                navigation.navigate('JobCareerDetailScreen', { job: job })
              }}
            >
              <MyText style={{ textAlign: 'center', color: 'white' }}>
                Apply
              </MyText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 14,
        }}
      >
        <View>
          <MyText style={{ fontSize: 13, fontWeight: '700' }}>Position</MyText>
          <MyText style={{ fontSize: 16, color: 'gray', marginTop: 10 }}>
            {job?.role.position}
          </MyText>
        </View>
        <View>
          <MyText style={{ fontSize: 13, fontWeight: '700' }}>Posted</MyText>
          <MyText style={{ fontSize: 16, color: 'gray', marginTop: 10 }}>
            {Math.abs(
              Math.ceil(
                (new Date(job?.role.postedOn) - new Date()) /
                  (1000 * 60 * 60 * 24)
              )
            )}{' '}
            days ago
          </MyText>
        </View>
        <TouchableOpacity
          style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}
          onPress={() => {
            navigation.navigate('CampaignMenu', {
              id: job?.startupid,
            })
          }}
        >
          <MyText style={{ fontWeight: '700' }}>View Campaign {'>>'} </MyText>
        </TouchableOpacity>
      </View>
    </View>
  )

  const navigation = useNavigation()
  const {
    theme: { colors },
  } = useContext(GlobalContext)

  if (loading) {
    return <Loader visible={loading} color='white' indicatorSize='large' />
  }
  return (
    <>
      <CustomHeader
        Title='Available Jobs'
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
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <Loader visible={loading} color='white' indicatorSize='large' />

        <View>
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
                borderRadius: 6,
                backgroundColor: '#EEEEEE',
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
              <SvgImport
                svg={ListIcon}
                style={{ alignSelf: 'center', color: 'white' }}
              />
            </View>
            {/* seatch bar icon out */}
          </View>

          <View style={{ width: '100%', marginTop: 4 }}>
            <FlatList
              horizontal
              data={catgeories}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <CategoriesComp
                  text={item}
                  style={{
                    marginLeft: index == 0 ? 13 : 9,
                    marginVertical: 15,
                    elevation: 2,
                    marginRight: index == catgeories.length - 1 ? 10 : 0,
                  }}
                />
              )}
            />
          </View>

          {jobs?.length === 0 && (
            <View>
              <MyText
                style={{
                  fontSize: 20,
                  color: 'red',
                  fontWeight: '700',
                  textAlign: 'center',
                  marginTop: 10,
                }}
              >
                No Jobs Found
              </MyText>
            </View>
          )}

          <View>
            {jobs?.map((job, index) => {
              return <JobBox job={job} key={index} />
            })}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

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
  orderItem: {
    paddingTop: 13,
    paddingLeft: 13,
    paddingBottom: 14,
    marginHorizontal: 20,
    paddingRight: 17,
    // borderWidth: 1,
    // borderColor: 'lightgray',
    borderRadius: 10,
    // flexDirection: 'row',
    marginBottom: 9,

    backgroundColor: 'white',
    shadowColor: '#878787',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 15,
  },
})
export default AvailableJobs
