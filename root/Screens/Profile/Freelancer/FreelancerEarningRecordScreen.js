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

const FreelancerEarningRecordScreen = () => {
  const navigation = useNavigation()
  const {
    theme: { colors },
  } = useContext(Context)

  const EarningItem = () => (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate('ActiveOrderDetail')
      }}
      style={styles.orderItem}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            backgroundColor: colors.secondary,
            borderRadius: 8,
            width: 53,
            height: 64,
            paddingTop: 6,
            paddingBottom: 7,
            paddingHorizontal: 9,
          }}
        >
          <MyText
            style={{ color: colors.white, fontSize: 15, textAlign: 'center' }}
          >
            &nbsp;2&nbsp; Jan 22
          </MyText>
        </View>
        <View
          style={{
            padding: 9,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
            width: '85%',
          }}
        >
          <View>
            <MyText style={{ fontSize: 16 }}>Logo Design</MyText>
            <TouchableOpacity
              labelStyle={{ color: '#fff' }}
              disabled={true}
              style={styles.cancelledBadge}
              onPress={() => {}}
            >
              <MyText
                style={{
                  fontSize: 11,
                  color: 'white',
                }}
              >
                Funds Cleared
              </MyText>
            </TouchableOpacity>
          </View>
          <View>
            <MyText style={{ fontSize: 15, textAlign: 'right' }}>$150</MyText>
            <MyText style={{ fontSize: 15, color: 'rgba(35, 35, 35, 0.7)' }}>
              Amount
            </MyText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Earnings Record'
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
        <EarningItem />
        <EarningItem />
        <EarningItem />
        <EarningItem />
        <EarningItem />
      </View>
    </ScrollView>
  )
}

export default FreelancerEarningRecordScreen

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
    padding: 12,
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
  cancelledBadge: {
    marginTop: 11,
    width: 104,
    backgroundColor: '#13B887',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 15,
  },
})
