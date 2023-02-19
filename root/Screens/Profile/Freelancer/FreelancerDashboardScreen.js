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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader'
import Earning from '../../../Components/Earning'
import { getOrderCategoryWise } from '../services/orderServices'
import axios from '../../../http/axiosSet'
import SvgImport from '../../../Components/SvgImport'
import DollarIcon from '../../../../assets/Svgs/DollarIcon'
import { getWalletDetail } from '../services/walletServices'
import Loader from '../../../Components/Loader'
const FreelancerDashboardScreen = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(true)

  const {
    theme: { colors },
  } = useContext(Context)

  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrder()
  }, [isFocused])

  const [walletDetail, setWalletDetail] = useState({})

  const fetchOrder = async () => {
    setLoading(true)
    const resp = await getOrderCategoryWise('Active')
    const resp2 = await getWalletDetail()
    setLoading(false)

    setWalletDetail(resp2.data.data)

    if (resp.status === 200) {
      setOrders(resp.data.data)
    } else if (resp.status === 404) {
    } else if (resp.status === 401) {
    }
  }

  const OrderItem = ({ order }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ActiveJobDetail', { orderId: order._id })
      }}
      style={[styles.orderItem]}
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
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader />

      <Loader visible={loading} color='white' indicatorSize='large' />
      {!loading && (
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
          <MyText style={{ fontSize: 17, marginBottom: 12 }}>
            My Dashboard
          </MyText>
          {/* Top */}
          <Earning
            title='Net Income'
            subHeadingsDescriptions={[
              `Earning this month`,
              'Active Jobs',
              'Pending Clearance',
              'Jobs Completed',
            ]}
            style={{ marginTop: 0, marginBottom: 28 }}
            total={walletDetail.netIncome}
            subHeadings={[
              `$ ${walletDetail.earningsThisMonth}`,
              walletDetail.activeJobs,
              `$ ${walletDetail.pendingClearence}`,
              walletDetail.jobsCompleted,
            ]}
          />

          {/* Mid */}

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
                Active Jobs
              </MyText>
            </View>
            {!loading && orders.length === 0 && (
              <View>
                <MyText
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: 'red',
                    fontWeight: '700',
                  }}
                >
                  No Active Jobs{' '}
                </MyText>
              </View>
            )}
            {orders?.map((order, index) => {
              return <OrderItem order={order} key={index} />
            })}
          </View>
        </View>
      )}
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
    fontSize: 17,
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

  subheading: {
    textAlign: 'center',
  },

  subheadingdescription: {
    color: 'rgba(35, 35, 35, 0.36);',
  },
})

export default FreelancerDashboardScreen
