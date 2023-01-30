import React, { useContext, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader2'
import Earning from '../../../Components/Earning'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

const FreelancerEarningsScreen = () => {
  const navigation = useNavigation()
  const {
    theme: { colors },
  } = useContext(Context)

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        nav={navigation}
        Title='Earnings'
        style={{ marginBottom: 10 }}
        icon={() => {
          return <Feather name='info' size={20} color='black' />
        }}
      />

      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: 30,
            padding: 23,
          },
        ]}
      >
        <Earning
          title='Net Income'
          subHeadingsDescriptions={[
            'Earning in June',
            'Active Jobs',
            'Pending Clearance',
            'Jobs Completed',
          ]}
          style={{ marginTop: 0, marginBottom: 28 }}
          total='2405.00'
          subHeadings={['$2045', '150', '1200$', '12']}
        />
        <TouchableOpacity
          labelStyle={{ color: '#fff' }}
          style={styles.btn}
          onPress={() => {}}
        >
          <MyText
            style={{
              fontSize: 16,
              color: 'white',
            }}
          >
            Withdrawal Request
          </MyText>
        </TouchableOpacity>

        <TouchableOpacity
          labelStyle={{ color: '#fff' }}
          style={[styles.btn, { backgroundColor: '#BDFBFD' }]}
          onPress={() => {
            navigation.navigate('EarningsRecords')
          }}
        >
          <MyText
            style={{
              fontSize: 16,
              color: colors.text,
            }}
          >
            View Earnings Record
          </MyText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default FreelancerEarningsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  heading: {
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'left',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
  },
  orderItem: {
    paddingTop: 13,
    paddingLeft: 13,
    paddingBottom: 14,
    paddingRight: 17,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 9,
    backgroundColor: 'white',
    shadowColor: '#878787',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 15,
  },

  subheading: {
    textAlign: 'center',
  },

  subheadingdescription: {
    color: 'rgba(35, 35, 35, 0.36);',
  },
  btn: {
    backgroundColor: '#8489FC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 11,
  },
})
