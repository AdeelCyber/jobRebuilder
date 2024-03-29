import React, { useContext, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
} from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'

import Icon from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import SvgImport from '../../../Components/SvgImport'

import PasswordChangeIcon from '../../../../assets/Svgs/PasswordChangeIcon'
import ArrowRightIcon from '../../../../assets/Svgs/ArrowRightIcon'
import CustomHeader from '../../../Components/CustomHeader2'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { changeNotification } from '../services/settingsServices'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'

const SettingScreen = () => {
  const navigation = useNavigation()
  const [appNotification, setAppNotification] = useState(false)

  const modifyNotification = async (e) => {
    console.log(appNotification)
    const resp = await changeNotification(e)
    console.log(resp)
    if (resp.status === 200) {
      if (e) await AsyncStorage.setItem('@noti', 'true')
      else await AsyncStorage.setItem('@noti', 'false')
    } else {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Something went wrong',
        text2: '.',
      })
    }
  }

  useEffect(() => {
    getNotification()
  }, [])

  const getNotification = async () => {
    const n = await AsyncStorage.getItem('@noti')
    console.log('n', n)
    if (n === 'true') setAppNotification(true)
    else setAppNotification(false)
  }

  const ListItem = ({ title, icon, isToggle, navigate }) => (
    <TouchableOpacity
      disabled={isToggle}
      style={{ marginTop: 10 }}
      onPress={() => {
        if (!isToggle) navigation.navigate(navigate)
      }}
    >
      <View style={styles.listItemView}>
        <View
          style={{
            backgroundColor: '#EEEEEE',
            borderRadius: 10,
            marginRight: 20,
            padding: 7,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {title === 'Change Password' ? (
            <SvgImport svg={PasswordChangeIcon} />
          ) : (
            <Icon name={icon} size={24} color={'black'} />
          )}
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <MyText
            style={{
              fontWeight: '500',
              fontSize: 15,
            }}
          >
            {title}
          </MyText>
        </View>

        <View style={styles.iconView}>
          {!isToggle ? (
            <SvgImport svg={ArrowRightIcon} />
          ) : (
            <Switch
              trackColor={{ false: '#000', true: '#000' }}
              thumbColor={appNotification ? colors.primary : '#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={(e) => {
                console.log('Val', e)
                setAppNotification(e)
                modifyNotification(e)
              }}
              value={appNotification}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  const {
    theme: { colors },
  } = useContext(Context)

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Settings'
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
      <View
        style={[
          styles.container,
          {
            paddingTop: 17,
          },
        ]}
      >
        <View
          style={{
            paddingBottom: 10,
            marginHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <MyText
            style={{
              fontWeight: '600',
              lineHeight: 30,
              color: colors.text,
              textAlign: 'left',
              marginTop: 20,
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            Contact Details
          </MyText>
        </View>
        <ListItem
          title='Email Address'
          icon='envelope'
          isToggle={false}
          navigate='ChangeEmail'
        />
        <ListItem
          title='Phone Number'
          icon='phone'
          isToggle={false}
          navigate='ChangePhoneNumber'
        />

        <View
          style={{
            paddingBottom: 10,
            marginHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <MyText
            style={{
              fontWeight: '600',
              lineHeight: 30,
              color: colors.text,
              textAlign: 'left',
              marginTop: 20,
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            Security Details
          </MyText>
        </View>
        <ListItem
          title='Change Password'
          icon='tv'
          isToggle={false}
          navigate='ChangePassword'
        />

        <View
          style={{
            paddingBottom: 10,
            marginHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <MyText
            style={{
              fontWeight: '600',
              lineHeight: 30,
              color: colors.text,
              textAlign: 'left',
              marginTop: 20,
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            App Settings
          </MyText>
        </View>
        <ListItem title='App Notification' icon='bell' isToggle={true} />

        <View
          style={{
            paddingBottom: 10,
            marginHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <MyText
            style={{
              fontWeight: '600',
              lineHeight: 30,
              color: colors.text,
              textAlign: 'left',
              marginTop: 20,
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            Account
          </MyText>
        </View>
        <ListItem
          title='Delete Account'
          icon='trash'
          isToggle={false}
          navigate='DeleteAccount'
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingRight: 0,
    marginLeft: 15,
  },

  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 70,
  },
})

export default SettingScreen
