import React, { useContext, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import Icon from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader'

const AmountSpentScreen = () => {
  const navigation = useNavigation()
  const {
    theme: { colors },
  } = useContext(Context)

  const OrderItem = () => (
    <View style={styles.orderItem}>
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
            <FontAwesome5 name='bitcoin' color='#FAD461' size={16} />
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
    </View>
  )

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: 40,
            padding: 23,
          },
        ]}
      >
        <View>
          {/* Heading */}

          <OrderItem />
          <OrderItem />
          <OrderItem />
        </View>
      </View>
    </ScrollView>
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
})

export default AmountSpentScreen
