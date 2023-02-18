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
import { getSpecificWarning } from '../services/warningServices'
import axios from '../../../http/axiosSet'
import Loader from '../../../Components/Loader'
const WarningReasonDetailScreen = ({ route }) => {
  const navigation = useNavigation()
  // const [warning, setWarning] = useState({})

  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // fetchWarning()
  }, [isFocused])

  const { warning } = route.params
  const fetchWarning = async () => {
    setLoading(true)

    const resp = await getSpecificWarning(startupId, warningId)
    setLoading(false)

    if (resp.status === 200) {
      setWarning(resp.data.data)
    } else if (resp.status === 404) {
    } else if (resp.status === 401) {
    }
  }

  const {
    theme: { colors },
  } = useContext(Context)

  if (loading) {
    return <Loader visible={loading} color='white' indicatorSize='large' />
  }

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
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            marginBottom: 7,
            // backgroundColor: 'yellow',
          }}
        >
          <Image
            style={{ height: 60, width: 60, borderRadius: 50, marginRight: 10 }}
            source={{
              uri: axios.defaults.baseURL + 'media/getimage/' + warning.logo,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <View>
              <View>
                <View
                  style={{
                    borderBottomColor: '#eee',
                    marginTop: 5,
                  }}
                >
                  <MyText
                    style={{ marginBottom: 3, fontWeight: '500', fontSize: 15 }}
                  >
                    {warning.name}
                  </MyText>
                </View>
                <MyText style={{ color: 'gray', fontSize: 12, marginTop: 10 }}>
                  {warning.category}
                </MyText>
              </View>
            </View>

            <View>
              <TouchableOpacity
                labelStyle={{ color: '#fff' }}
                style={styles.completedBadge}
                onPress={() => {
                  navigation.navigate('MessagesBox', {
                    userImg: axios.defaults.baseURL + warning.logo,
                    userName: warning.name,
                    chatType: 'Simple Chat',
                  })
                }}
              >
                <MyText
                  style={{
                    fontSize: 11,
                    color: 'white',
                  }}
                >
                  Chat
                </MyText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <MyText style={styles.heading}>Reason</MyText>
        <MyText style={{ lineHeight: 20, color: 'gray' }}>
          {warning.warning.reason}
        </MyText>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  heading: {
    // fontWeight: '700',
    lineHeight: 30,
    color: '#232323',
    textAlign: 'left',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
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
  completedBadge: {
    backgroundColor: '#8489FC',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 7.5,
    paddingBottom: 7.5,
    paddingHorizontal: 28.5,
    marginTop: 10,
  },
})

export default WarningReasonDetailScreen
