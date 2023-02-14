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
import { Entypo } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader2'
import { getSingleOrder } from '../services/orderServices'
import axios from '../../../http/axiosSet'

const CancelledOrderDetailScreen = ({ route }) => {
  const navigation = useNavigation()
  const [order, setOrder] = useState({})

  const { orderId } = route.params

  useEffect(() => {
    fetchOrder()
  }, [])

  const fetchOrder = async () => {
    const resp = await getSingleOrder(orderId)

    if (resp.status === 200) {
      setOrder(resp.data.data)
    } else if (resp.status === 401) {
      navigation.navigate('LoginScreen')
    } else if (resp.status === 400) {
      navigation.navigate('LoginScreen')
    }
  }

  const {
    theme: { colors },
  } = useContext(Context)

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Cancelled Orders'
        style={{
          elevation: 0,
        }}
        icon={() => {
          return <Entypo name='dots-three-vertical' size={20} color='black' />
        }}
        nav={navigation}
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
                uri: axios.defaults.baseURL + order?.employer?.avatar,
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
          <MyText style={styles.description}>{order?.jobTItle}</MyText>
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

        {/* Cancelled Reason */}

        <View>
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: '#eee',
            }}
          >
            <MyText style={styles.heading}>Reason Of Cancellation</MyText>
          </View>
          <MyText style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            venenatis sit amet risus a bibendum.
          </MyText>
        </View>

        {/* Dates */}

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
            <MyText style={styles.description}>25 Dec 2022</MyText>
          </View>
          <View>
            <View
              style={{
                paddingBottom: 10,
                borderBottomColor: '#eee',
              }}
            >
              <MyText style={styles.heading}>Cancelled On</MyText>
            </View>
            <MyText style={styles.description}>23 Dec 2022</MyText>
          </View>
        </View>

        <TouchableOpacity
          labelStyle={{ color: '#fff' }}
          style={{
            backgroundColor: '#E8E8E8',
            borderRadius: 4,
            justifyContent: 'center',
            width: '43%',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('ManageJobs')
          }}
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
})

export default CancelledOrderDetailScreen
