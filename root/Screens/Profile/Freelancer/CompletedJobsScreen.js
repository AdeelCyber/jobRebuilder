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
import Icon from '@expo/vector-icons/FontAwesome'

import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader'

const CompletedJobsScreen = () => {
  const navigation = useNavigation()

  const {
    theme: { colors },
  } = useContext(Context)

  const OrderItem = () => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => {
        navigation.navigate('CompletedOrderDetail')
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
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
            <MyText
              style={{ fontSize: 13, fontWeight: '500', marginBottom: 2 }}
            >
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
              <MyText style={{ fontSize: 15, fontWeight: '600' }}>$50</MyText>
            </MyText>
            <MyText
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: 'rgba(35, 35, 35, 0.5)',
              }}
            >
              <Icon name='star' color='#eeeeee' />
              <Icon name='star' color='#eeeeee' />
              <Icon name='star' color='#eeeeee' />
              <Icon name='star' color='#eeeeee' />
              <Icon name='star' color='#eeeeee' />
            </MyText>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 17,
          flexDirection: 'row',
          marginBottom: 7,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 18 }}>
            <View
              style={{
                borderBottomColor: '#eee',
              }}
            >
              <MyText style={{ marginBottom: 3, fontWeight: '500' }}>
                Due Date
              </MyText>
            </View>
            <MyText style={{ color: 'gray' }}>25 Dec 2022</MyText>
          </View>
          <View>
            <View
              style={{
                borderBottomColor: '#eee',
              }}
            >
              <MyText style={{ marginBottom: 3, fontWeight: '500' }}>
                Delivered On
              </MyText>
            </View>
            <MyText style={{ color: 'gray' }}>23 Dec 2022</MyText>
          </View>
        </View>

        <View style={{ flexDirection: 'column-reverse' }}>
          <TouchableOpacity
            labelStyle={{ color: '#fff' }}
            disabled={true}
            style={styles.completedBadge}
            onPress={() => {}}
          >
            <MyText
              style={{
                fontSize: 11,
                color: 'white',
              }}
            >
              Completed
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={{ marginTop: 33 }}>
      <OrderItem />
      <OrderItem />
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
    paddingRight: 17,
    borderRadius: 10,
    marginBottom: 9,
    backgroundColor: 'white',
    shadowColor: '#878787',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 15,
  },
  completedBadge: {
    marginHorizontal: 18,
    backgroundColor: '#13B887',
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 15,
  },
})

export default CompletedJobsScreen