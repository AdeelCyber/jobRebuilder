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
import Icon from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

import FontAwesome from '@expo/vector-icons/FontAwesome'

const AddFinancialScreen = () => {
  const navigation = useNavigation()
  const {
    theme: { colors },
  } = useContext(Context)

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: 40,
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
          <MyText style={[styles.heading, { color: colors.text }]}>
            Enter Financial Details
          </MyText>
        </View>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Gross Sales'
            underlineColorAndroid='transparent'
          />
          <FontAwesome
            style={styles.searchIcon}
            name='dollar'
            size={20}
            color={colors.secondaryText}
          />
        </View>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Net Sales'
            underlineColorAndroid='transparent'
          />
          <FontAwesome
            style={styles.searchIcon}
            name='dollar'
            size={20}
            color={colors.secondaryText}
          />
        </View>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Gross Profit'
            underlineColorAndroid='transparent'
          />
          <FontAwesome
            style={styles.searchIcon}
            name='dollar'
            size={20}
            color={colors.secondaryText}
          />
        </View>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Earning Before Interest'
            underlineColorAndroid='transparent'
          />
          <FontAwesome
            style={styles.searchIcon}
            name='dollar'
            size={20}
            color={colors.secondaryText}
          />
        </View>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Taxes'
            underlineColorAndroid='transparent'
          />
          <FontAwesome
            style={styles.searchIcon}
            name='dollar'
            size={20}
            color={colors.secondaryText}
          />
        </View>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder='Net Profit'
            underlineColorAndroid='transparent'
          />
          <FontAwesome
            style={styles.searchIcon}
            name='dollar'
            size={20}
            color={colors.secondaryText}
          />
        </View>

        <TouchableOpacity labelStyle={{ color: '#fff' }} style={styles.btn}>
          <MyText
            style={{
              color: 'white',
              fontSize: 14,
            }}
          >
            Update
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

  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 70,
  },
  editItemInput: {
    padding: 0,
    fontSize: 18,
  },
  searchSection: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    marginHorizontal: 18,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  searchIcon: {
    padding: 20,
  },
  input: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 20,
    paddingLeft: 15,
    padding: 20,
    color: '#424242',
  },
  btn: {
    marginHorizontal: 18,
    backgroundColor: '#8489FC',
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    marginBottom: 40,
  },
  heading: {
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'left',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
})

export default AddFinancialScreen
