import React, { useContext, useState, useEffect } from 'react'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'

import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader2'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getWarnings } from '../services/warningServices'
import axios from '../../../http/axiosSet'
import Loader from '../../../Components/Loader'

const WarningsScreen = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [warnings, setWarnings] = useState([])
  const [totalWarnings, setTotalWarnings] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWarnings()
  }, [isFocused])

  const fetchWarnings = async () => {
    setWarnings([])
    setLoading(true)
    const resp = await getWarnings()
    setLoading(false)
    if (resp.status === 200) {
      setWarnings(resp.data.data[0].warnings)
      setTotalWarnings(resp.data.data[0].warningsCount[0])
    } else if (resp.status === 404) {
    } else if (resp.status === 401) {
    }
  }

  const {
    theme: { colors },
  } = useContext(Context)

  const RequestBox = (props) => (
    <View style={styles.requestBox}>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Image
            style={{ height: 60, width: 60, borderRadius: 50 }}
            source={{
              uri: axios.defaults.baseURL + 'media/getimage/' + props.logo,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <View>
            <MyText style={{ fontSize: 15, marginLeft: 10 }}>
              {props.name}
            </MyText>
            <MyText style={{ marginLeft: 10, marginTop: 10, color: 'gray' }}>
              {props.category}
            </MyText>
          </View>

          <TouchableOpacity
            labelStyle={{ color: '#fff' }}
            style={{
              backgroundColor: '#F50303',
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopRightRadius: 0,
              height: 20,
              paddingHorizontal: 15,
              borderBottomRightRadius: 0,
            }}
            disabled
          >
            <MyText
              style={{
                color: 'white',
                fontSize: 10,
              }}
            >
              {totalWarnings} Warnings
            </MyText>
          </TouchableOpacity>
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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <MyText style={{ marginBottom: 11 }}>Warned On</MyText>
          <MyText>
            {new Date(props.warning?.createdAt).toLocaleDateString('default', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </MyText>
        </View>

        <View style={{ flexDirection: 'row', paddingRight: 10 }}>
          <TouchableOpacity
            labelStyle={{ color: '#fff' }}
            onPress={() => {
              navigation.navigate('WarningDetail', {
                warning: props,
              })
            }}
            style={{
              backgroundColor: '#DBDBDB',
              borderRadius: 4,
              height: 19,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
              paddingHorizontal: 20,
            }}
          >
            <MyText
              style={{
                fontSize: 11,
              }}
            >
              View Reason
            </MyText>
          </TouchableOpacity>
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
                userImg: props.logo,
                userName: props?.name,
                chatType: 'simple',
              })
            }}
          >
            <MyText
              style={{
                color: 'white',
                fontSize: 11,
              }}
            >
              Chat
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Warnings'
        style={{ elevation: 0 }}
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
      <Loader visible={loading} color='white' indicatorSize='large' />
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
        {warnings?.map((warning, index) => {
          return (
            <RequestBox
              key={index}
              warning={{ ...warning.warnings }}
              logo={warning.logo}
              name={warning.name}
              category={warning.category}
              startupId={warning.startupId}
            />
          )
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
    paddingLeft: 10,
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

export default WarningsScreen
