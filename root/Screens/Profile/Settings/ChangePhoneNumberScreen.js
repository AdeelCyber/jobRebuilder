import React, { useContext, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native'

import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import CustomHeader from '../../../Components/CustomHeader2'
import { useNavigation } from '@react-navigation/native'
import { modifyPhoneNumber } from '../services/settingsServices'

const ChangePhoneNumberScreen = () => {
  const {
    theme: { colors },
  } = useContext(Context)
  const navigation = useNavigation()

  const [phoneNumber, setPhoneNumber] = useState(async () => {
    await AsyncStorage.getItem('@phoneNumber')
  })

  const changePhoneNumber = async () => {
    const resp = await modifyPhoneNumber(phoneNumber)
    if (resp.status === 200) {
      console.log('Phone number updated')
    }
  }

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Settings'
        nav={navigation}
        style={{}}
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
      <View style={[styles.container]}>
        <View
          style={{
            paddingBottom: 10,
            marginHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop: 20,
          }}
        >
          <MyText
            style={{
              fontWeight: '700',
              lineHeight: 30,
              color: colors.text,
              textAlign: 'left',
              marginTop: 20,
              fontSize: 16,
            }}
          >
            Phone Number
          </MyText>
        </View>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Phone Number'
            underlineColorAndroid='transparent'
            value={phoneNumber}
            onChangeText={(e) => {
              setPhoneNumber(e)
            }}
          />
          <FontAwesome
            style={styles.searchIcon}
            name='pencil'
            size={20}
            color={colors.secondaryText}
          />
        </View>

        <TouchableOpacity
          onPress={changePhoneNumber}
          labelStyle={{ color: '#fff' }}
          style={{
            marginHorizontal: 18,
            backgroundColor: colors.secondary,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            marginTop: 15,
            marginBottom: 40,
          }}
        >
          <MyText
            style={{
              color: 'white',
              fontSize: 14,
            }}
          >
            Done
          </MyText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginHorizontal: 18,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 26,
    color: '#424242',
  },
})

export default ChangePhoneNumberScreen
