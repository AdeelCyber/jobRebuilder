import React, { useContext, useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import Icon from '@expo/vector-icons/FontAwesome'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'

import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader2'
import ReactNativeModal from 'react-native-modal'
import * as DocumentPicker from 'expo-document-picker'
import {
  cancelOneTimeOrder,
  getSingleOrder,
  uploadFileServer,
} from '../services/orderServices'
import { upload } from '../../../Components/DownloadUpload'
// import { imageUpload } from '../../../Components/uploadNewFile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fileUpload, imageUpload } from '../services/fileServices'
import axios from '../../../http/axiosSet'

import Toast from 'react-native-toast-message'
import Loader from '../../../Components/Loader'

const ActiveJobDetailScreen = ({ route }) => {
  const navigation = useNavigation()

  const { orderId } = route.params
  const [isModalVisible, setModalVisible] = useState(false)
  const [file, setFile] = useState(null)
  const [fileNameFromServer, setFileNameFromServer] = useState('')
  const [reason, setReason] = useState('')
  const [order, setOrder] = useState({})
  const [deliveryDate, setDeliveryDate] = useState('')

  // hello
  const {
    theme: { colors },
  } = useContext(Context)

  const uploadFile = async () => {
    const formData = upload()
    if (!formData) {
      return
    }
    const token = await AsyncStorage.getItem('@accessToken')
    if (
      formData.name.includes('pdf') ||
      formData.name.includes('doc') ||
      formData.name.includes('docx') ||
      formData.name.includes('txt') ||
      formData.name.includes('ppt') ||
      formData.name.includes('pptx')
    )
      fileUpload(formData.uri)
    else imageUpload(formData.uri)
    setFileNameFromServer(formData.name)
  }

  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [isFocused])

  const fetchOrder = async () => {
    setLoading(true)
    const resp = await getSingleOrder(orderId)
    setLoading(false)
    if (resp.status === 200) {
      setOrder(resp.data.data)
      const str = new Date(resp.data.data.deliveryTime)

      const currentDate = new Date()
      const diffTime = str - currentDate
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)) % 24

      const arrayTime = `${diffDays}${diffHours}`.split('').map(Number)
      setDeliveryDate(arrayTime)
    } else if (resp.status === 401) {
      navigation.navigate('LoginScreen')
    } else if (resp.status === 400) {
      navigation.navigate('LoginScreen')
    }
  }

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

  if (loading) {
    return <Loader visible={loading} color='white' indicatorSize='large' />
  }
  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        nav={navigation}
        Title='Manage Jobs'
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
                  order?.employer?.avatar,
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
                {order?.employer?.name}
              </MyText>
              <MyText
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: 'rgba(35, 35, 35, 0.5)',
                }}
              >
                {order?.employer?.email}
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
                <FontAwesome5 name='bitcoin' color='#FAD461' size={21} />
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

        {/* Delivery Time */}

        <View>
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: '#eee',
            }}
          >
            <MyText style={styles.heading}>Delivery Time</MyText>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {deliveryDate?.map((element, index) => {
              return (
                <React.Fragment key={index}>
                  <View
                    style={{
                      backgroundColor: colors.secondary,
                      borderRadius: 5,
                      padding: 8,
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5,
                    }}
                  >
                    <MyText style={{ fontSize: 16, color: 'white' }}>
                      {element}
                    </MyText>
                  </View>
                  {index === 1 && (
                    <MyText
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                        marginTop: 5,
                        marginHorizontal: 4,
                      }}
                    >
                      -{' '}
                    </MyText>
                  )}
                </React.Fragment>
              )
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '33%',
              marginBottom: 38,
            }}
          >
            <MyText>Days</MyText>
            <MyText>Hours</MyText>
          </View>
        </View>

        <TouchableOpacity
          labelStyle={{ color: '#fff' }}
          style={{
            backgroundColor: '#E8E8E8',
            borderRadius: 4,
            justifyContent: 'center',
            width: '40%',
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={uploadFile}
        >
          <MyText
            style={{
              color: colors.text,
              fontSize: 15,
              padding: 14,
            }}
          >
            <Entypo name='attachment' size={14} /> &nbsp;&nbsp; Attachment
          </MyText>
        </TouchableOpacity>
        <MyText style={{ fontSize: 15, color: colors.lighttext }}>
          {file?.name}
        </MyText>

        <TouchableOpacity
          labelStyle={{ color: '#fff' }}
          style={[styles.btn, { backgroundColor: colors.secondary }]}
          onPress={() => {
            navigation.navigate('DeliverProject', { orderId: orderId })
          }}
        >
          <MyText
            style={{
              color: 'white',
              fontSize: 14,
            }}
          >
            Deliver
          </MyText>
        </TouchableOpacity>

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

export default ActiveJobDetailScreen
