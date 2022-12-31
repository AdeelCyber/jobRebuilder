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

import PasswordChangeIcon from '../../../../assets/Svgs/PasswordChangeIcon'
import SvgImport from '../../../Components/SvgImport'

const SettingScreen = () => {
  const navigation = useNavigation()
  const [appNotification, setAppNotification] = useState(false)

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
            <Icon style={{ fontWeight: 0 }} name='arrow-right' size={15} />
          ) : (
            <Switch
              trackColor={{ false: '#000', true: '#000' }}
              thumbColor={appNotification ? colors.primary : '#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={() => {
                setAppNotification(!appNotification)
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
    <ScrollView>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: 40,
            height: 1000,
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
    marginLeft: 10,
    marginRight: 10,
  },

  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 70,
  },
})

export default SettingScreen
