import React, { useContext, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import MyText from '../../Components/Text'
import Context from '../../Context/Context'

import SvgImport from '../../Components/SvgImport'
import MasterCard from '../../../assets/Svgs/MasterCard'

import CustomHeader from '../../Components/CustomHeader2'
import { Feather } from '@expo/vector-icons'
import BinIcon from '../../../assets/Svgs/BinIcon'

const PaymentAccountsScreen = () => {
  const {
    theme: { colors },
  } = useContext(Context)

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Payment Method'
        style={{}}
        icon={() => {
          return <Feather name='info' size={20} color='black' />
        }}
      />
      <View style={[styles.container, { padding: 16 }]}>
        <MyText style={styles.heading}>Comment/Message*</MyText>

        <View style={{ marginTop: 10, backgroundColor: '#FFFFFF' }}>
          <View style={styles.listItemView}>
            <View
              style={{
                backgroundColor: '#C38BFF',
                borderRadius: 5,
                marginRight: 20,
                padding: 7,
                height: 62,
                width: 67,
                justifyContent: 'center',
                alignItems: 'center',

                borderTopRightRadius: 50,
                borderBottomRightRadius: 60,
              }}
            >
              <SvgImport svg={MasterCard} />
            </View>

            <View style={{ flex: 1 }}>
              <MyText
                style={{
                  fontWeight: '600',
                  fontSize: 15,
                }}
              >
                Master - credit
              </MyText>
              <MyText
                style={{
                  fontWeight: '600',
                  fontSize: 15,
                }}
              >
                **** 5464
              </MyText>
            </View>
            <TouchableOpacity style={styles.iconView}>
              <SvgImport svg={BinIcon} />
              {/* <Icon style={{ fontWeight: 0 }} name='arrow-right' size={15} /> */}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          labelStyle={{ color: colors.white }}
          style={{
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 18,
            paddingBottom: 18,
            marginTop: 17,
            borderWidth: 1,
          }}
          onPress={() => {
            //   navigation.navigate('AmountSpent')
          }}
        >
          <MyText
            style={{
              fontSize: 14,
            }}
          >
            + Add New Card
          </MyText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default PaymentAccountsScreen

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
  listItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
})
