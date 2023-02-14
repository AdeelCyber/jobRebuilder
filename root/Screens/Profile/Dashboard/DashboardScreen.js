import React, { useContext, useEffect, useState } from 'react'
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
import CustomHeader from '../../../Components/CustomHeader2'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getOrders } from '../services/orderServices'
import axios from '../../../http/axiosSet'

const DashboardScreen = () => {
  const navigation = useNavigation()
  const {
    theme: { colors },
  } = useContext(Context)

  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const resp = await getOrders()

    if (resp.status === 200) {
      setOrders(res.data.data)
    } else if (resp.status === 400 || resp.status === 401) {
      navigation.navigate('LoginScreen')
    }
  }

  const OrderItem = ({ order }) => (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate('ActiveOrderDetail')
      }}
      disabled={true}
      style={styles.orderItem}
    >
      <View>
        <Image
          source={{
            uri: axios.defaults.baseURL + order?.employer?.avatar,
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
            {order?.employer?.name}
          </MyText>
          <MyText
            style={{
              fontSize: 11,
              fontWeight: '500',
              color: 'rgba(35, 35, 35, 0.5)',
            }}
          >
            {order?.jobTitle}
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
            <MyText style={{ fontSize: 14, fontWeight: '600' }}>
              ${order?.totalPrice}
            </MyText>
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
              {Math.ceil(
                (new Date(order?.deliveryTime) - new Date()) /
                  (1000 * 60 * 60 * 24)
              )}
            </MyText>{' '}
            days
          </MyText>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Dashboard'
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
        nav={navigation}
      />
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
        {/* Top */}
        <View
          style={{
            backgroundColor: colors.text,
            paddingTop: 14,
            paddingLeft: 19,
            paddingRight: 22,
            paddingBottom: 20,
            borderRadius: 15,
          }}
        >
          <MyText
            style={{
              color: colors.white,
              fontSize: 24,
              fontWeight: '500',
              marginBottom: 8,
            }}
          >
            $ 5404.00
          </MyText>
          <MyText style={{ fontSize: 12, color: colors.secondary }}>
            Total Amount Spent
          </MyText>

          <TouchableOpacity
            labelStyle={{ color: colors.white }}
            style={{
              backgroundColor: colors.secondary,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 18,
              paddingBottom: 18,
              marginTop: 17,
            }}
            onPress={() => {
              navigation.navigate('AmountSpent')
            }}
          >
            <MyText
              style={{
                color: 'white',
                fontSize: 14,
              }}
            >
              Details
            </MyText>
          </TouchableOpacity>
        </View>

        {/* Mid */}

        <View
          style={{
            marginTop: 35,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 35,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('JobRequests')
            }}
          >
            <View style={styles.card}>
              <Icon name='group' size={37} />
              <MyText
                style={{
                  fontSize: 13,
                  padding: 2,
                  backgroundColor: colors.secondary,
                  color: 'white',
                  fontWeight: '700',
                  borderRadius: 50,
                  width: 19,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  bottom: 45,
                  left: 25,
                }}
              >
                10
              </MyText>
              <MyText
                style={{ fontSize: 13, fontWeight: '500', marginTop: -10 }}
              >
                Job Requests
              </MyText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyOrders')
            }}
          >
            <View
              style={[
                styles.card,
                {
                  borderRadius: 8,
                  paddingTop: 24,
                  paddingLeft: 35,
                  paddingBottom: 19,
                  paddingRight: 30,
                },
              ]}
            >
              <Icon name='shopping-bag' size={37} />
              <MyText
                style={{
                  fontSize: 13,
                  padding: 2,
                  backgroundColor: colors.secondary,
                  color: 'white',
                  fontWeight: '700',
                  borderRadius: 50,
                  width: 19,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  bottom: 45,
                  left: 25,
                }}
              >
                10
              </MyText>
              <MyText
                style={{ fontSize: 13, fontWeight: '500', marginTop: -10 }}
              >
                Orders
              </MyText>
            </View>
          </TouchableOpacity>
        </View>

        {/* Last */}

        <View>
          {/* Heading */}
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: '#eee',
              marginBottom: 26,
            }}
          >
            <MyText style={[styles.heading, { color: colors.text }]}>
              Recent Orders
            </MyText>
          </View>
          {orders?.map((order, index) => {
            return <OrderItem key={index} />
          })}
        </View>
      </View>
    </ScrollView>
  )
}

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
    fontSize: 16,
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

  card: {
    borderRadius: 8,
    paddingTop: 24,
    paddingLeft: 15,
    paddingBottom: 19,
    paddingRight: 15,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#c0c0c0',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 20,
  },
})

export default DashboardScreen
