import React, { useContext, useMemo, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import MyText from '../../Components/Text'
import Context from '../../Context/Context'

import CustomHeader from '../../Components/CustomHeader2'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const ChangeProfileScreen = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context)
  const navigation = useNavigation()

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title=''
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
      <View style={[styles.container, { paddingTop: 17 }]}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <Image
            style={{ height: 107, width: 107, borderRadius: 50 }}
            source={{
              uri: 'https://banner2.cleanpng.com/20180625/req/kisspng-computer-icons-avatar-business-computer-software-user-avatar-5b3097fcae25c3.3909949015299112927133.jpg',
            }}
          />
          <MyText
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginTop: 9,
              marginBottom: 34,
            }}
          >
            Change Profile Picture
          </MyText>
        </View>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Name'
            underlineColorAndroid='transparent'
          />
          <FontAwesome
            style={styles.searchIcon}
            name='pencil'
            size={20}
            color={colors.secondaryText}
          />
        </View>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Position'
            underlineColorAndroid='transparent'
          />
          <FontAwesome
            style={styles.searchIcon}
            name='pencil'
            size={20}
            color={colors.secondaryText}
          />
        </View>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Country'
            underlineColorAndroid='transparent'
          />
          <FontAwesome
            style={styles.searchIcon}
            name='pencil'
            size={20}
            color={colors.secondaryText}
          />
        </View>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Language'
            underlineColorAndroid='transparent'
          />
          <FontAwesome
            style={styles.searchIcon}
            name='pencil'
            size={20}
            color={colors.secondaryText}
          />
        </View>
        <View style={styles.sectiontextarea}>
          <TextInput
            style={{
              paddingLeft: 15,
              marginLeft: 4,
            }}
            multiline={true}
            scrollEnabled={true}
            placeholder='About'
            underlineColorAndroid='transparent'
          />
        </View>

        <TouchableOpacity
          labelStyle={{ color: '#fff' }}
          style={styles.btn}
          onPress={() => {}}
        >
          <MyText
            style={{
              fontSize: 14,
              color: 'white',
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
  dropdown: {
    height: 55,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingLeft: 30,
  },

  sectiontextarea: {
    marginHorizontal: 18,
    paddingVertical: 13,
    borderWidth: 0.8,
    borderColor: '#222222',
    borderRadius: 10,
    paddingRight: 14,
    marginBottom: 10,
    marginTop: 10,
    height: 135,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  searchIcon: {
    padding: 10,
  },

  textInput: {
    paddingLeft: 15,
    marginLeft: 4,
    flex: 1,
    border: 'none',
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
    marginBottom: 12,
  },
  input: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 26,
    color: '#424242',
  },

  textInputView: {
    paddingVertical: 13,
    width: '90%',
    borderWidth: 0.8,
    borderColor: '#222222',
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingRight: 14,
    marginHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btn: {
    marginHorizontal: 18,

    backgroundColor: '#8489FC',
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 29,
    marginBottom: 40,
  },
  shadow: {
    shadowColor: '#000a',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})

export default ChangeProfileScreen
