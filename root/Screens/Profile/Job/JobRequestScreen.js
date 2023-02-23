import React, { useContext, useEffect, useState } from 'react'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import Icon from '@expo/vector-icons/FontAwesome'

import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'

import { useIsFocused, useNavigation } from '@react-navigation/native'
import SvgImport from '../../../Components/SvgImport'
import MotoMobileIcon from '../../../../assets/Svgs/MotoMobileIcon'
import ArrowRightIcon from '../../../../assets/Svgs/ArrowRightIcon'
import SmallArrowRight from '../../../../assets/Svgs/SmallArrowRight'
import CustomHeader from '../../../Components/CustomHeader2'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getAvailableJobs } from '../services/jobServices'
import axios from '../../../http/axiosSet'
import Loader from '../../../Components/Loader'
import Error from '../../../Components/Error'

const JobRequestScreen = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const {
    theme: { colors },
  } = useContext(Context)

  useEffect(() => {
    fetchData()
  }, [isFocused])

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const startupid = '63e291756fc91d001e0040a6'

  const fetchData = async () => {
    setLoading(true)
    const resp = await getAvailableJobs(startupid)
    console.log(resp)
    setLoading(false)
    if (resp.status === 200) {
      setJobs(resp.data.data)
      console.log('data', resp)
    } else if (resp.status === 400 || resp.status === 401) {
      navigation.navigate('LoginScreen')
    }
  }

  const RequestBox = ({ job }) => (
    <View style={styles.requestBox}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Image
          style={{ height: 45, width: 45, borderRadius: 5 }}
          source={{
            uri:
              axios.defaults.baseURL +
              'media/getimage/' +
              job?.freelancer.avatar,
          }}
        />

        <View style={{ paddingHorizontal: 15 }}>
          <MyText style={{ fontSize: 10 }}>{job?.freelancer.name}</MyText>
          <MyText
            style={{
              color: colors.secondaryText,
              fontSize: 9,
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            {job?.freelancer.JobTitle}
          </MyText>
          <MyText
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 10,
              fontWeight: '600',
            }}
          >
            <Icon name='star' color='#FFB33E' /> 5.0
          </MyText>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingTop: 23,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ marginHorizontal: 4 }}>
          <MyText
            style={{ paddingBottom: 10, fontWeight: '600', fontSize: 12 }}
          >
            Applied For
          </MyText>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <SvgImport svg={MotoMobileIcon} />
            <MyText style={{ fontSize: 11 }}> {job?.startup?.name}</MyText>
            {/* <Icon name='compass' color='blue' />  */}
          </View>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <MyText
            style={{ paddingBottom: 10, fontWeight: '600', fontSize: 12 }}
          >
            Position
          </MyText>
          <MyText
            style={{
              fontSize: 11,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {job?.startup?.position}
          </MyText>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <MyText
            style={{ paddingBottom: 10, fontWeight: '600', fontSize: 12 }}
          >
            Applied On
          </MyText>
          <MyText
            style={{
              fontSize: 11,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {new Date(job?.appliedOn).toLocaleDateString('default', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </MyText>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('ShowFreelancer', { id: job?.freelancer?._id })
          }}
        >
          <MyText
            style={{
              fontSize: 10,
              fontWeight: '600',
            }}
          >
            View Profile
          </MyText>
          <MyText style={{ fontWeight: '600', fontSize: 13 }}>
            {' '}
            &#x3e;&#x3e;
          </MyText>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            labelStyle={{ color: '#fff' }}
            style={{
              backgroundColor: '#8489FC',
              borderRadius: 4,
              width: 63,
              height: 19,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('MessagesBox', {
                userImg: job?.freelancer.avatar,
                userName: job?.freelancer.name,
                chatType: 'simple',
              })
            }}
          >
            <MyText
              style={{
                color: 'white',
                fontSize: 10,
              }}
            >
              Chat
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  if (loading) {
    return <Loader visible={loading} color='white' indicatorSize='large' />
  }

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Job Requests'
        nav={navigation}
        style={{ elevation: 0 }}
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
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: 40,
            paddingHorizontal: 24,
            paddingBottom: 100,
          },
        ]}
      >
        {jobs?.length === 0 && (
          <View>
            <Error message='No Job Request Found' />
          </View>
        )}
        {jobs?.map((job, index) => {
          return <RequestBox job={job} key={index} />
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  requestBox: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 15,
    marginBottom: 16,
    backgroundColor: 'white',
    shadowColor: '#878787',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 15,
  },
})

export default JobRequestScreen
