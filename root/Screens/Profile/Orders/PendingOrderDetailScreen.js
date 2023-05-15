import React, { useContext, useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import Icon from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { Entypo } from '@expo/vector-icons'

import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader2'
import ReactNativeModal from 'react-native-modal'
import {
    cancelOneTimeOrder,
    changeDeliveryStatus,
    getSingleOrder, getSingleOrderStartup,
} from '../services/orderServices'
import axios from '../../../http/axiosSet'
import Toast from 'react-native-toast-message'
import Loader from '../../../Components/Loader'
import CartContext from "../../../Context/CartProvider";
import SvgImport from "../../../Components/SvgImport";
import DollarIcon from "../../../../assets/Svgs/DollarIcon";

const PendingOrderDetailScreen = ({ route }) => {
  const navigation = useNavigation()

  const [isModalVisible, setModalVisible] = useState(false)
  const [reason, setReason] = useState('')
  const [order, setOrder] = useState({})

  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(false)
  const context = useContext(CartContext)
  const { orderId } = route.params
  const {
    theme: { colors },
  } = useContext(Context)

  const cancelOrder = async () => {
    const resp = await cancelOneTimeOrder(orderId, reason)
    if (resp.status === 200) {
      setModalVisible(!isModalVisible)
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Order Cancelled',
        text2: '.',
      })
      navigation.navigate('MyOrders')
    } else if (resp.status === 401 || resp.status === 400) {
      navigation.navigate('LoginScreen')
    }
  }
    const[name,setName] = useState('')
    const[avatar,setAvatar] = useState('')
    const[email,setEmail] = useState('')
  const markComplete = async () => {

    const resp = await changeDeliveryStatus(orderId, 'Completed')
      console.log(resp)

    if (resp.status === 201) {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Order Completed',
        text2: '.',
      })
      navigation.navigate('MyOrders')
    } else if (resp.status === 400 || resp.status === 401) {
      navigation.navigate('LoginScreen')
    }
  }

  useEffect(() => {
    fetchOrder().then(() => console.log(order))
  }, [isFocused])

  const fetchOrder = async () => {
      let resp = null
      if (context.userdetails.role.includes('Startup')) {
          resp = await getSingleOrderStartup(orderId)


      } else {
          resp = await getSingleOrder(orderId)
      }


    if (resp.status === 200) {
      setOrder(resp.data.data)
        if(context.userdetails.role.includes('Startup')){
            setName(resp.data.data.freelancer.name)
            setAvatar(resp.data.data.freelancer.avatar)
            setEmail(resp.data.data.freelancer.email)
        }
        else{
            setName(resp.data.data.employer.name)
            setAvatar(resp.data.data.employer.avatar)
            setEmail(resp.data.data.employer.email)

        }
    } else if (resp.status === 401) {
      navigation.navigate('LoginScreen')
    } else if (resp.status === 400) {
      navigation.navigate('LoginScreen')
    }
  }

  if (loading) {
    return <Loader visible={loading} color='white' indicatorSize='large' />
  }

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Manage Jobs'
        nav={navigation}
        style={{}}
        icon={() => {
          return <Entypo name='dots-three-vertical' size={20} color='black' />
        }}
      />
      <View
        style={[
          styles.container,
          {
            paddingTop: 40,
            padding: 23,
          },
        ]}
      >
        <View
          style={{
            paddingTop: 13,
            paddingBottom: 14,
            paddingRight: 17,
            borderRadius: 10,
            flexDirection: 'row',
            marginBottom: 47,
          }}
        >
          <View>
            <Image
              source={{
                uri:
                  axios.defaults.baseURL +
                  'media/getimage/' +
                  avatar,
              }}
              style={{ width: 40, height: 40 }}
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
                style={{ fontSize: 15, fontWeight: '500', marginBottom: 2 }}
              >
                {name}
              </MyText>
              <MyText
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: 'rgba(35, 35, 35, 0.5)',
                }}
              >
                {email}
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
                  &nbsp; &nbsp;
                <MyText style={{ fontSize: 18, fontWeight: '600' }}>
                  ${order?.totalPrice}
                </MyText>
              </MyText>
            </View>
          </View>
        </View>

        {/* Title */}

        <View>
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: '#eee',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <MyText style={styles.heading}>Title</MyText>
            <MyText style={styles.description}>One time job</MyText>
          </View>
          <MyText style={styles.description}>{order?.jobTitle}</MyText>
        </View>

        {/* Description */}

        <View>
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: '#eee',
            }}
          >
            <MyText style={styles.heading}>Description</MyText>
          </View>
          <MyText style={styles.description}>{order?.description}</MyText>
        </View>

        <View>
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: '#eee',
            }}
          >
            <MyText style={styles.heading}>Message/Comment</MyText>
          </View>
          {/* <MyText style={styles.description}>{order?.delivery?.comment}</MyText> */}
        </View>

        {/* Delivery Time */}

        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={{ marginRight: 35 }}>
            <View
              style={{
                paddingBottom: 10,
                borderBottomColor: '#eee',
              }}
            >
              <MyText style={styles.heading}>Due Date</MyText>
            </View>
            <MyText style={styles.description}>
              {new Date(order.deliveryTime).toLocaleDateString('default', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </MyText>
          </View>
          <View>
            <View
              style={{
                paddingBottom: 10,
                borderBottomColor: '#eee',
              }}
            >
              <MyText style={styles.heading}>Delivered On</MyText>
            </View>
            <MyText style={styles.description}>

              {new Date(order.deliveryTime).toLocaleDateString('default', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </MyText>
          </View>
        </View>

        {/* <View style={{ flexDirection: 'row', marginBottom: 38 }}>
          <TouchableOpacity
            labelStyle={{ color: '#fff' }}
            style={[
              styles.btn,
              {
                backgroundColor: '#E8E8E8',
                width: '40%',
                paddingTop: 14,
                paddingBottom: 14,
                marginRight: 14,
              },
            ]}
          >
            <MyText
              style={{
                color: colors.text,
                fontSize: 15,
              }}
            >
              <Icon name='image' color={colors.secondary} size={20} />{' '}
              &nbsp;&nbsp; Photo.jpg
            </MyText>
          </TouchableOpacity>

          <TouchableOpacity
            labelStyle={{ color: '#fff' }}
            style={[
              styles.btn,
              {
                backgroundColor: '#E8E8E8',
                width: '40%',
                paddingTop: 14,
                paddingBottom: 14,
              },
            ]}
          >
            <MyText
              style={{
                color: colors.text,
                fontSize: 15,
              }}
            >
              <Icon name='image' color={colors.secondary} size={20} />{' '}
              &nbsp;&nbsp; Photo.jpg
            </MyText>
          </TouchableOpacity>
        </View> */}

          {
              context.userdetails?.role !== 'Freelancer' ? (
                  <TouchableOpacity
                      labelStyle={{ color: '#fff' }}
                      style={[styles.btn, { backgroundColor: colors.secondary }]}
                      onPress={() => {
                          markComplete()
                      }}
                  >
                      <MyText
                          style={{
                              color: 'white',
                              fontSize: 14,
                          }}
                      >
                          Mark Complete
                      </MyText>
                  </TouchableOpacity>
                ) : null
          }

          {
                context.userdetails?.role !== 'Freelancer' ? (
                    <TouchableOpacity
                        labelStyle={{ color: '#fff' }}
                        style={[styles.btn, { backgroundColor: '#FF0A0A' }]}
                        onPress={() => {
                            setModalVisible(!isModalVisible)
                        }}
                    >
                        <MyText
                            style={{
                                color: 'white',
                                fontSize: 14,
                            }}
                        >
                            Cancel Order
                        </MyText>
                    </TouchableOpacity>
                ) : null
          }

        <ReactNativeModal
          transparent
          isVisible={isModalVisible}
          onBackdropPress={() => {
            setModalVisible(!isModalVisible)
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 18,
              paddingTop: 26,
              paddingHorizontal: 17,
              paddingBottom: 26,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <MyText
                style={{
                  width: '95%',
                  fontWeight: '600',
                  fontSize: 16,
                  // textAlign: 'center',
                }}
              >
                Cancellation Reason
              </MyText>
              {/* <Icon
                name='close'
                size={20}
                style={{ marginRight: 15 }}
                onPress={() => {
                  setModalVisible(!isModalVisible)
                }}
              /> */}
            </View>

            <View
              style={{
                paddingVertical: 13,
                borderWidth: 0.8,
                borderColor: '#222222',
                borderRadius: 5,
                paddingRight: 14,
                marginBottom: 10,
                height: 200,
              }}
            >
              <TextInput
                placeholder='Enter Description Here'
                multiline={true}
                style={{
                  paddingLeft: 15,
                  marginLeft: 4,
                }}
                onChangeText={(e) => {
                  setReason(e)
                }}
                scrollEnabled={true}
              />
            </View>

            <TouchableOpacity
              labelStyle={{ color: '#fff' }}
              style={[styles.btn, { backgroundColor: '#FF0A0A' }]}
              onPress={() => {
                cancelOrder()
              }}
            >
              <MyText
                style={{
                  color: 'white',
                  fontSize: 14,
                }}
              >
                Cancel Order
              </MyText>
            </TouchableOpacity>

            {/* <Button title='Hide modal' onPress={() => {}} /> */}
          </View>
        </ReactNativeModal>
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
    color: '#232323',
    textAlign: 'left',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 25,
  },

  btn: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
})

export default PendingOrderDetailScreen
