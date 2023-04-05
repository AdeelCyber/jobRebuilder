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
import CustomHeader from '../../../Components/CustomHeader'
import {getOrderCategoryWise, getOrders} from '../services/orderServices'

import axios from '../../../http/axiosSet'
import Loader from '../../../Components/Loader'
import Error from '../../../Components/Error'

const PendingOrdersScreen = (props) => {
  const navigation = useNavigation()

  const [orders, setOrders] = useState([])
  const isFocused = useIsFocused()
  useEffect(() => {
    fetchOrder()
  }, [isFocused])

  const [loading, setLoading] = useState(true)

  const fetchOrder = async () => {
    setLoading(true)
    const resp = await getOrders()
    setLoading(false)
    if (resp.status === 200) {
      setOrders(resp.data.data.pending)
      props.fun(resp.data.data.pending.length)

    } else if (resp.status === 404) {
    } else if (resp.status === 401) {
    }
  }
  const {
    theme: { colors },
  } = useContext(Context)

  if (loading) {
    return <Loader visible={loading} color='white' indicatorSize='large' />
  }

  const OrderItem = ({ order }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => {
        navigation.navigate('PendingOrderDetail', { orderId: order._id })
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
                order?.freelancer?.avatar,
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
              {order?.freelancer?.name}
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
                Delivery
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
            style={styles.pendingBadge}
            onPress={() => {}}
          >
            <MyText
              style={{
                fontSize: 11,
                color: 'white',
              }}
            >
              Pending
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={{ marginTop: 33 }}>
      {orders?.length !== 0 ? (
        <>
          {orders?.map((order) => {
            return <OrderItem key={order._id} order={order} />
          })}
        </>
      ) : (
        <View>
          <Error message='No Pending Order Found' />
        </View>
      )}
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

  pendingBadge: {
    marginHorizontal: 18,
    backgroundColor: '#FF9900',
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 15,
  },
})

export default PendingOrdersScreen
