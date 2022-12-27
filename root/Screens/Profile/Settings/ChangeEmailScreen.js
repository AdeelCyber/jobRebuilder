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
import { FontAwesome } from '@expo/vector-icons'

const ChangeEmailScreen = () => {
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
            marginTop: 60,
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
            Email Address
          </MyText>
        </View>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Email Address'
            underlineColorAndroid='transparent'
          />
          <FontAwesome
            style={styles.searchIcon}
            name='pencil'
            size={20}
            color={colors.secondaryText}
          />
        </View>

        <TouchableOpacity
          labelStyle={{ color: '#fff' }}
          style={{
            marginHorizontal: 18,
            backgroundColor: '#34b7f1',
            borderRadius: 10,
            width: '90%',
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
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
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
  listItemText: {
    fontSize: 18,
  },
  checkedItemText: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'green',
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 70,
  },
  editItemInput: {
    padding: 0,
    fontSize: 18,
  },
})

export default ChangeEmailScreen
