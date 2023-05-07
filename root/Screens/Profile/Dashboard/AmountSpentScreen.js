import React, { useContext, useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image, FlatList,
} from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import Icon from '@expo/vector-icons/FontAwesome'

import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader2'
import {getExpensesDetails, getOrderCategoryWise, getOrders} from '../services/orderServices'

import axios from '../../../http/axiosSet'
import Loader from '../../../Components/Loader'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Error from '../../../Components/Error'

const AmountSpendScreen = () => {
  const navigation = useNavigation()

  const [orders, setOrders] = useState([])
  const isFocused = useIsFocused()
  useEffect(() => {
    fetchOrder()
  }, [isFocused])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchOrder = async () => {
    setLoading(true)
    const resp = await getExpensesDetails(page, 10)
    setLoading(false)
    if (resp.status === 200) {
      console.log(resp.data.data)
      setOrders(resp.data.data.expenses)
    } else if (resp.status === 404) {
    } else if (resp.status === 401) {
    }
  }

  const {
    theme: { colors },
  } = useContext(Context)

  const OrderItem = ({ order }) => (
      console.log(order),
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
                order?.avatar,
            }}
            style={{ width: 36, height: 36 ,borderRadius:5}}
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
                style={{ fontSize: 8, fontWeight: '500', marginBottom: 2,
                  color: 'rgba(35, 35, 35, 0.5)'
                }}
            >
              Order Given To
            </MyText>
            <MyText
              style={{ fontSize: 15, fontWeight: '500', marginBottom: 2 }}
            >
              {order?.name}
            </MyText>
            <MyText
                style={{ fontSize: 8, fontWeight: '500', marginBottom: 2
            ,color: 'rgba(35, 35, 35, 0.5)'
                }}
            >
              Job Title
            </MyText>
            <MyText
              style={{
                fontSize: 11,
                fontWeight: '500',
              }}
            >
              {order?.title}
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
                ${order?.price}
              </MyText>
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
              {order.status}
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={{ flex:1, backgroundColor: 'white' }}>
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
      <View  style={{
        paddingHorizontal: 20,
        marginTop: 10,
      }}>
        {orders?.length !== 0 ? (
          <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <OrderItem order={item} />}
            showsVerticalScrollIndicator={false}
            ></FlatList>
        ) : (

            <View style={{ marginTop:120 }}>
              <Error message="You haven't spend any amount yet" />
            </View>
        )}
      </View>
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
    shadowColor: '#050505',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 3,
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
