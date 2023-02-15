import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import MyText from '../../../Components/Text'
import { Image } from 'react-native'
import axios from '../../../http/axiosSet'
import { useContext } from 'react'
import GlobalContext from '../../../Context/Context'
import { applyOnJob } from '../services/jobServices'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import CustomHeader from '../../../Components/CustomHeader2'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const JobCareerDetailScreen = ({ route }) => {
  const { job } = route.params
  const {
    theme: { colors },
  } = useContext(GlobalContext)

  const navigation = useNavigation()

  const apply = async () => {
    const resp = await applyOnJob(job.startupid, job.role._id)
    console.log(resp)
    if (resp.status === 200) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Job Applied',
        text2: '.',
      })
      navigation.navigate('AvailableJobs')
    } else if (resp.status === 400) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Already Applied',
        text2: '.',
      })
    } else {
      navigation.navigate('LoginScreen')
    }
  }
  return (
    <View>
      <CustomHeader
        Title='Job'
        style={{ elevation: 0, shadowColor: 'white', borderRadius: 0 }}
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
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop: 25,
          height: 1000,
        }}
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
                style={{ fontSize: 20, fontWeight: '500', marginBottom: 2 }}
              >
                {job?.businessName}
              </MyText>
              <MyText
                style={{
                  fontSize: 15,
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
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: 'blue',
                }}
              >
                <MyText
                  style={{ fontSize: 16, textAlign: 'center', color: 'blue' }}
                >
                  {' '}
                  {'>'}
                </MyText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <MyText style={{ fontSize: 20, marginTop: 20 }}>Position</MyText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <MyText style={{ marginTop: 20, fontSize: 15, color: 'gray' }}>
            {job?.role.position}
          </MyText>
          <MyText style={{ marginTop: 20, fontSize: 15, color: 'gray' }}>
            {Math.abs(
              Math.ceil(
                (new Date(job?.role.postedOn) - new Date()) /
                  (1000 * 60 * 60 * 24)
              )
            )}{' '}
            days ago
          </MyText>
        </View>
        <MyText style={{ fontSize: 20, marginTop: 20 }}>Description</MyText>
        <MyText style={{ marginTop: 20, fontSize: 15, color: 'gray' }}>
          {job?.role.description}
        </MyText>

        <TouchableOpacity
          style={{
            backgroundColor: colors.secondary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 6,
            width: 90,
            marginTop: 30,
          }}
          onPress={() => {
            apply()
            // navigation.navigate('JobCareerDetailScreen', { job: job })
          }}
        >
          <MyText
            style={{
              textAlign: 'center',
              fontSize: 15,
              color: 'white',
            }}
          >
            Apply
          </MyText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default JobCareerDetailScreen
