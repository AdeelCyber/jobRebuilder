import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import MyText from '../../../Components/Text'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader'
import SvgImport from '../../../Components/SvgImport'
import DollarIcon from '../../../../assets/Svgs/DollarIcon'

const ActiveOrdersScreen = () => {
  const navigation = useNavigation()

  const OrderItem = () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ActiveOrderDetail')
      }}
      style={[styles.orderItem]}
    >
      <View>
        <Image
          source={{
            uri: 'https://banner2.cleanpng.com/20180625/req/kisspng-computer-icons-avatar-business-computer-software-user-avatar-5b3097fcae25c3.3909949015299112927133.jpg',
          }}
          style={{ width: 36, height: 36 }}
        />
      </View>
      <View
        style={{
          marginLeft: 11,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <MyText style={{ fontSize: 13, fontWeight: '500', marginBottom: 2 }}>
            Phil Jones
          </MyText>
          <MyText
            style={{
              fontSize: 11,
              fontWeight: '500',
              color: 'rgba(35, 35, 35, 0.5)',
            }}
          >
            Logo Designing
          </MyText>
        </View>
        <View>
          <MyText
            style={{
              marginBottom: 3,
              textAlign: 'right',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SvgImport svg={DollarIcon} />
            {/* <FontAwesome5 name='bitcoin' color='#FAD461' size={16} /> */}
            &nbsp; &nbsp;
            <MyText style={{ fontSize: 14, fontWeight: '600' }}>$50</MyText>
          </MyText>
          <MyText
            style={{
              fontSize: 11,
              fontWeight: '500',
              color: 'rgba(35, 35, 35, 0.5)',
            }}
          >
            Delivery in
            <MyText
              style={{
                fontSize: 11,
                fontWeight: '700',
              }}
            >
              {' '}
              2
            </MyText>{' '}
            days
          </MyText>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={{ marginTop: 33 }}>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: '#eee',
        }}
      >
        <MyText style={styles.heading}>Due in next few days</MyText>
      </View>
      <OrderItem />
      <OrderItem />
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: '#eee',
        }}
      >
        <MyText style={styles.heading}>Due this month</MyText>
      </View>
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  orderItem: {
    paddingTop: 13,
    paddingLeft: 13,
    paddingBottom: 14,
    paddingRight: 17,
    // borderWidth: 1,
    // borderColor: 'lightgray',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 9,

    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 10,
  },
  heading: {
    fontWeight: '700',
    lineHeight: 30,
    color: '#232323',
    textAlign: 'left',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
  },
})

export default ActiveOrdersScreen
