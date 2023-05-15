import React, { useContext, useEffect, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    View,
    Switch,
    TouchableOpacity,
    Text,
    Image, Linking,
} from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import Icon from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { Entypo } from '@expo/vector-icons'

import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader2'
import {getSingleOrder, getSingleOrderStartup} from '../services/orderServices'
import axios from '../../../http/axiosSet'
import Loader from '../../../Components/Loader'
import CartContext from "../../../Context/CartProvider";
import SvgImport from "../../../Components/SvgImport";
import DollarIcon from "../../../../assets/Svgs/DollarIcon";

const CompletedOrderDetailScreen = ({route}) => {
  const navigation = useNavigation()

  const {
    theme: { colors },
  } = useContext(Context)

  const [order, setOrder] = useState({})
    const[name,setName] = useState('')
    const[avatar,setAvatar] = useState('')
    const[email,setEmail] = useState('')
    const context  =useContext(CartContext)

  const { orderId } = route.params

  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder().then(()=>{
        console.log('order',order)

    })
  }, [isFocused])

  const fetchOrder = async () => {
    setLoading(true)
      let resp = null
      if (context.userdetails.role.includes('Startup')) {
          resp = await getSingleOrderStartup(orderId)


      } else {
          resp = await getSingleOrder(orderId)
      }

      setLoading(false)
    if (resp.status === 200) {
      setOrder(resp.data.data)
        if(context.userdetails.role.includes('Startup')){
            setName(resp.data.data.freelancer.name)
            setAvatar(resp.data.data.freelancer.avatar)
            setEmail(resp.data.data.freelancer.email)
        }
        else {
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

  const Review = ({ avatar, email, name, rating, date, comment }) => (
      // {
      //     comment?
      //         <View style={{ marginBottom: 15 }}>
      //             <View
      //                 style={{
      //                     paddingTop: 13,
      //                     paddingBottom: 14,
      //                     paddingRight: 17,
      //                     borderRadius: 10,
      //                     flexDirection: 'row',
      //                 }}
      //             >
      //                 <View>
      //                     <Image
      //                         source={{
      //                             uri: avatar,
      //                         }}
      //                         style={{ width: 40, height: 40 }}
      //                     />
      //                 </View>
      //                 <View
      //                     style={{
      //                         marginLeft: 11,
      //                         flex: 1,
      //                         flexDirection: 'row',
      //                         justifyContent: 'space-between',
      //                     }}
      //                 >
      //                     <View>
      //                         <MyText
      //                             style={{ fontSize: 15, fontWeight: '500', marginBottom: 2 }}
      //                         >
      //                             {name}
      //                         </MyText>
      //                         <View style={{ flexDirection: 'row' }}>
      //                             {[...Array(rating).keys()].map((element) => {
      //                                 return (
      //                                     <Icon
      //                                         style={{ marginRight: 2.2 }}
      //                                         name='star'
      //                                         key={element}
      //                                         color={element + 1 <= rating ? '#FFB33E' : '#eeeeee'}
      //                                     />
      //                                 )
      //                             })}
      //                         </View>
      //                     </View>
      //                     <View>
      //                         <MyText
      //                             style={{
      //                                 marginBottom: 3,
      //                                 textAlign: 'right',
      //                                 justifyContent: 'center',
      //                                 alignItems: 'center',
      //                                 color: 'rgba(35, 35, 35, 0.35)',
      //                             }}
      //                         >
      //                             {Math.round((new Date() - new Date(date)) / 1000 / 60 / 60 / 24)}{' '}
      //                             days ago
      //                         </MyText>
      //                     </View>
      //                 </View>
      //             </View>
      //             <MyText style={{ color: 'rgba(35, 35, 35, 0.49)' }}>{comment}</MyText>
      //         </View>
      //           :
              <View>
                  <MyText>
                      No Review
                  </MyText>
              </View>

  )

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        nav={navigation}
        Title='My Orders'
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

        {/* Cancelled Reason */}

        <View>
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: '#eee',
            }}
          >
            <MyText style={styles.heading}>Message/Comment</MyText>
          </View>
          <MyText style={styles.description}>{order?.delivery?.comment}</MyText>
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
              {console.log(order)}
            <MyText style={styles.description}>
              {' '}
              {new Date(order?.deliveryTime).toLocaleDateString('default', {
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
              {' '}
              {new Date(order?.deliveryTime).toLocaleDateString('default', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </MyText>
          </View>
        </View>

        {order?.delivery?.attachments?.map((file, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
              // check if file is image
                if (
                    file.includes('.jpg') ||
                    file.includes('.png') ||
                    file.includes('.jpeg') ||
                    file.includes('.gif') ||
                    file.includes('.svg') ||
                    file.includes('.webp') ||
                    file.includes('.bmp') ||
                    file.includes('.tiff') ||
                    file.includes('.jfif')  ||
                    file.includes('.pjpeg') ||
                    file.includes('.pjp') ||
                    file.includes('.avif') ||
                    file.includes('.heif') ||
                    file.includes('.heic') ||
                    file.includes('.apng')
                    ) {
                    Linking.openURL(
                        axios.defaults.baseURL +
                        'media/getImage/' +
                        file
                    )
                    } else {
                    Linking.openURL(
                        axios.defaults.baseURL +
                        'media/getFile/' +
                        file
                    )
                }


              }}
              labelStyle={{ color: '#fff' }}
              style={{
                backgroundColor: '#E8E8E8',
                borderRadius: 4,
                justifyContent: 'center',
                width: '40%',
                alignItems: 'center',
              }}
            >
              <MyText
                style={{
                  color: colors.text,
                  fontSize: 15,
                  padding: 14,
                }}
              >
                <Entypo name='attachment' size={14} /> &nbsp;&nbsp; {file}
              </MyText>
            </TouchableOpacity>
          )
        })}

        <View style={{ marginTop: 49 }}>
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: '#eee',
            }}
          >
            <MyText style={styles.heading}>My Reviews</MyText>
          </View>
            {}
          <Review
            avatar={order?.review?.avatar}
            name={order?.review?.name}
            rating={order?.review?.rating}
            email={order?.review?.email}
            date={order?.review?.date}
            comment={order?.review?.comment}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingRight: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  listItemText: {
    fontSize: 18,
  },

  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 70,
  },
  editItemInput: {
    padding: 0,
    fontSize: 18,
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

export default CompletedOrderDetailScreen
