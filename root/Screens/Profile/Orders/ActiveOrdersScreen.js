import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import MyText from '../../../Components/Text'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader'
import SvgImport from '../../../Components/SvgImport'
import DollarIcon from '../../../../assets/Svgs/DollarIcon'
import {getOrderCategoryWise, getOrders} from '../services/orderServices'
import axios from '../../../http/axiosSet'
import Loader from '../../../Components/Loader'
import Error from '../../../Components/Error'

const ActiveOrdersScreen = (props) => {
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
    try{
      setOrders(resp.data.data.active)
      console.log(resp.data.data.active)
        props.fun(resp.data.data.active.length)

    }
    catch(err){
      setOrders([])
    }
  }

  if (loading) {
    return <Loader visible={loading} color='white' indicatorSize='large' />
  }

  const OrderItem = ({ order }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ActiveOrderDetail', { orderId: order._id })
      }}
      style={[styles.orderItem]}
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
          <MyText style={{ fontSize: 13, fontWeight: '500', marginBottom: 2 }}>
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
            <SvgImport svg={DollarIcon} />
            {/* <FontAwesome5 name='bitcoin' color='#FAD461' size={16} /> */}
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
              {' '}
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
    <View style={{ marginTop: 33 }}>
      {orders?.length !== 0 ? (
        <>
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: '#eee',
            }}
          >
            <MyText style={styles.heading}>Due in next few days</MyText>
          </View>
          {orders?.map((order) => {
            return <OrderItem key={order._id} order={order} />
          })}
          {/* <OrderItem /> */}
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: '#eee',
            }}
          >
            {/* <MyText style={styles.heading}>Due this month</MyText> */}
          </View>
        </>
      ) : (
        <View>
          <Error message='No Active Order Found' />
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
    paddingBottom: 14,
    paddingRight: 17,
    // borderWidth: 1,
    // borderColor: 'lightgray',
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
