import React, { useContext, useEffect, useState } from 'react'
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

import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader2'
import { getOrderCategoryWise, getOrders } from '../services/orderServices'

import axios from '../../../http/axiosSet'
import Loader from '../../../Components/Loader'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const AmountSpendScreen = () => {
  const navigation = useNavigation()

  const [orders, setOrders] = useState([])
  const isFocused = useIsFocused()
  useEffect(() => {
    fetchOrder()
  }, [isFocused])

  const [loading, setLoading] = useState(true)

  const fetchOrder = async () => {
    setLoading(true)
    const resp = await getOrderCategoryWise('Active')
    setLoading(false)
    if (resp.status === 200) {
      setOrders(resp.data.data)
    } else if (resp.status === 404) {
    } else if (resp.status === 401) {
    }
  }

  if (loading) {
    return <Loader visible={loading} color='white' indicatorSize='large' />
  }

  const {
    theme: { colors },
  } = useContext(Context)

  const OrderItem = ({ order }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => {
        navigation.navigate('CompletedOrderDetail', { orderId: order._id })
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
              uri:
                axios.defaults.baseURL +
                'media/getimage/' +
                order?.employer?.avatar,
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
              <MyText style={{ fontSize: 15, fontWeight: '600' }}>
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
              {[...Array(5).keys()].map((x) => {
                return (
                  <Icon
                    name='star'
                    color={x + 1 <= order?.rating ? 'yellow' : '#eeeeee'}
                  />
                )
              })}
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
            <MyText style={{ color: 'gray' }}>
              {new Date(order?.createdAt).toLocaleDateString('default', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </MyText>
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
            <MyText style={{ color: 'gray' }}>
              {new Date(order?.deliveryTime).toLocaleDateString('default', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </MyText>
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
    <ScrollView style={{ height: '100%', backgroundColor: 'white' }}>
      <CustomHeader
        Title='Expenses'
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
      <View>
        {orders?.length !== 0 ? (
          <>
            {orders?.map((order) => {
              return <OrderItem key={order._id} order={order} />
            })}
          </>
        ) : (
          <View>
            <MyText
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'red',
                marginTop: 12,
                textAlign: 'center',
              }}
            >
              No orders
            </MyText>
          </View>
        )}
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

export default AmountSpendScreen
