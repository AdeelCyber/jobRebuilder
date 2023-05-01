import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from 'react'
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList,
  Pressable,
  TouchableOpacity,
  Modal, Linking,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Context from '../../Context/Context'
import { Entypo, AntDesign } from '@expo/vector-icons'
import MyText from '../../Components/Text'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import CartProvider from '../../Context/CartProvider'
import moment from 'moment'
import { CardField, useStripe } from '@stripe/stripe-react-native'

import {
  equityOrderOfferStatus,
  equityOrderOfferStatusRej,
  oneTimeOrderOfferStatus,
  sendMessagess,
  sendMessagessInGroup,
} from '../Profile/services/MessageServices'
import * as ImagePicker from 'expo-image-picker'
import {
  downloadFile,
  fileGet,
  fileUpload,
  imageUpload,
} from '../Profile/services/fileServices'
import * as DocumentPicker from 'expo-document-picker'
import PDFReader from 'rn-pdf-reader-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { startupNames } from '../Profile/services/startupServices'
import SelectDropdown from 'react-native-select-dropdown'
import * as FileSystem from 'expo-file-system'
import { StorageAccessFramework } from 'expo-file-system'
import { useIsFocused } from '@react-navigation/native'
import {baseURL} from "../../http/axiosSet";

const MessageBox = ({
  route,
  messages,
  setMessages,
  id,
  userImg,
  chatType,
  userName,
  members,
  online,
}) => {
  const navigation = useNavigation()
  const { accessToken, socket, userdetails } = useContext(CartProvider)
  const {
    theme: { colors },
  } = useContext(Context)
  const [getmedia, setmedia] = useState(false)

  const [message, setMessage] = useState('')
  const [msg, setmsg] = useState(messages)
  const [mediatype, setmediatype] = useState()
  const [imgcontent, setimgcontent] = useState()
  const [doc, setdoc] = useState()
  const [docinfo, setdocinfo] = useState()
  const [getmodalvisible1, setModalVisible1] = useState(false)
  const [getmodalvisible2, setModalVisible2] = useState(false)
  const yourRef = useRef()
  const isFocused = useIsFocused()

  const [items, setItems] = useState([])
  const [position, setposition] = useState()
  const [equityid, setequityid] = useState()
  const [startupid, setstartupid] = useState()
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false)
  const [getorderid, setorderid] = useState('')
  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1,
    })
    //console.log(result);

    if (!result.canceled) {
      setmedia(result.assets[0].uri)
      setmediatype(result.assets[0].type)
      const img = await imageUpload(result.assets[0].uri)
      const i = JSON.parse(img.body)
      if (chatType === 'group') {
        var obj = {}
        ;(obj['createdAt'] = Date.now()),
          (obj['image'] = i.filename),
          (obj['sender'] = {
            avatar: userdetails.avatar,
          }),
          (obj['text'] = i.filename),
          (obj['user'] = {
            _id: 'me',
          })

        setmsg([...msg, obj])
        sendMessage(i.filename, 'image')
      } else {
        var obj = {}
        ;(obj['createdAt'] = Date.now()),
          (obj['image'] = i.filename),
          (obj['text'] = i.filename),
          (obj['user'] = {
            _id: 'me',
          })

        setmsg([...msg, obj])
        sendMessage(i.filename, 'image')
      }

      // console.log(file.uri)
      //console.log(data);
    }
  }

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({})

    setdoc(result.uri)
    const pdf = await fileUpload(result.uri)
    // console.log(pdf);
    const p = JSON.parse(pdf.body)
    //  console.log(p);
    if (chatType === 'group') {
      var obj = {}
      ;(obj['createdAt'] = Date.now()),
        (obj['file'] = p.filename),
        (obj['sender'] = {
          avatar: userdetails.avatar,
        }),
        (obj['text'] = p.filename),
        (obj['user'] = {
          _id: 'me',
        })
    } else {
      var obj = {}
      ;(obj['createdAt'] = Date.now()),
        (obj['file'] = p.filename),
        (obj['text'] = p.filename),
        (obj['user'] = {
          _id: 'me',
        })
    }

    setmsg([...msg, obj])
    sendMessage(p.filename, 'file')
  }

  const sendMessage = async (message, type) => {
    // console.log(type);
    // console.log(message);
    // console.log(id);

    if (chatType === 'group') {
      const res = await sendMessagessInGroup(accessToken, id, message, type)
      console.log(res.status)
      if (res.status == 201) {
        socket.emit(
          'group message',
          {
            msgcontent: message,
            messageType: type,
            image: userdetails.avatar,
          },
          id
        )
      }
    } else {
      const res = await sendMessagess(accessToken, id, message, type)
      console.log(res.status)
      if (res.status == 200) {
        socket.emit('private message', {
          to: id,
          content: {
            msgcontent: message,
            messageType: type,
          },
        })
      }
    }
    //console.log(res.data);
  }

  const oneTimeOfferstatus = async (orderid, status) => {
    try {
      const resp = await oneTimeOrderOfferStatus(accessToken, orderid, status)
      console.log(resp.data)
      if (resp.status == 200) {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Done',
          text2: 'Please reload the chat to see the changes.',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const equityOfferstatus = async (startupid, position, equityid, status) => {
    try {
      const resp = await equityOrderOfferStatus(
        accessToken,
        startupid,
        position,
        equityid,
        status
      )
      //console.log(resp.data);
      if (resp.status == 200) {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Done',
          text2: 'Please reload the chat to see the changes.',
        })
      }
    } catch (error) {
      //  console.log(error.response.data);
    }
  }
  const equityOfferstatusReject = async (equityid, status) => {
    try {
      const resp = await equityOrderOfferStatusRej(
        accessToken,
        equityid,
        status
      )
      // console.log(resp.data);
      if (resp.status == 200) {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Done',
          text2: 'Please reload the chat to see the changes.',
        })
      }
    } catch (error) {
      // console.log(error.response.data);
    }
  }

  const getstartups = async () => {
    const res = await startupNames(accessToken)
    setItems(res.data.startUps)
    console.log(res.data)
  }

  const getpdf = async (doc) => {
    const res = await fileGet(accessToken, doc)
    var file = new Blob([res.data], { type: 'application/octet-stream' })
    console.log(res.data)
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync()
    if (!permissions.granted) {
      return
    }
    try {
      await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        res.data,
        'application/pdf'
      )
        .then((r) => {
          //   console.log(r);
        })
        .catch((e) => {
          //   console.log(e);
        })
    } catch (error) {
      //  console.log(error);
    }
    //console.log(res.data);
  }
  useEffect(() => {
    getstartups()
    // console.log(chatType);
  }, [])

  useEffect(() => {
    yourRef.current.scrollToEnd({ animated: true })
  }, [isFocused])
  const handleContentSizeChange = () => [
    yourRef.current.scrollToEnd({ animated: true }),
  ]

  const icon = () => (
      <Entypo name='dots-three-vertical' size={24} color='black' />
    ),
    Title = userName

  // useEffect(() => {
  //   console.log(messages);

  if (chatType === 'group') {
    socket.on('get-group-messages', (data, id) => {
      //console.log(data);
      //console.log(id);

      var obj = {}
      ;(obj['createdAt'] = Date.now()),
        (obj['sender'] = {
          avatar: data.image,
        }),
        (obj[`${data.messageType}`] = data.msgcontent),
        (obj['user'] = {
          _id: 'other',
        })

      setmsg([...msg, obj])
    })
  } else {
    socket.on('private message', (data) => {
      const { content, from } = data
      console.log(content)
      if (content.messageType === 'oneTimeOrder') {
        var obj = {}
        obj.createdAt = Date.now()
        obj.OneTimeOrder = {
          _id: content.msgcontent,

          totalPrice: content.totalPrice,
          jobTitle: content.jobTitle,
          deliveryTime: content.deliveryTime,
        }
        obj[`${content.messageType}`] = content.msgcontent
        obj.user = {
          _id: 'other',
        }
        // var obj = {
        //   createdAt: Date.now(),
        //   oneTimeOrder: {
        //     totalPrice: content.totalPrice,
        //     jobTitle: content.jobTitle,
        //   },
        //   [content.messageType]: content.msgcontent,
        //   user: {
        //     _id: "other",
        //   },
        // };
        // (obj["createdAt"] = Date.now()),
        //   (obj["oneTimeOrder"] = {
        //     totalPrice: content.totalPrice,
        //     jobTitle: content.jobTitle,
        //   }),
        //   (obj[`${content.messageType}`] = content.msgcontent),
        //   (obj["user"] = {
        //     _id: "other",
        //   });
        console.log(obj)
        setmsg([...msg, obj])
      } else if (content.messageType === 'equityOrder') {
        let obj = {}
        ;(obj['createdAt'] = Date.now()),
          (obj['EquityOrder'] = {
            // deliveryTime: content.deliveryTime,
            _id: content.msgcontent,
            equity: content.totalPrice,
            jobTitle: content.jobTitle,
            partnershipAgreement: content.partnershipAgreement,
          }),
          (obj[`${content.messageType}`] = content.msgcontent),
          (obj['user'] = {
            _id: 'other',
          })
        setmsg([...msg, obj])
      }
      // console.log(from);
      else {
        var obj = {}
        ;(obj['createdAt'] = Date.now()),
          (obj[`${content.messageType}`] = content.msgcontent),
          (obj['user'] = {
            _id: 'other',
          })

        setmsg([...msg, obj])
      }
    })
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Modal animationType='fade' transparent={true}
             onDismiss={() => {
               setModalVisible1(!getmodalvisible1)}
             }
             onRequestClose={() => {
               setModalVisible1(!getmodalvisible1)
             }}
             visible={getmodalvisible1}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MyText>
              <Text style={styles.textStyle}>Select Startup</Text>
            </MyText>
            <View style={styles.SectionStyle}>

              <SelectDropdown
                style={[styles.inputStyle, { borderColor: '#EEEEEE' }]}
                data={items}
                onSelect={(selectedItem, index) => {
                  setstartupid(selectedItem._id)
                  //console.log(selectedItem._id, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.businessName
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.businessName
                }}
              />
            </View>
            <View style={[styles.SectionStyle, { width: 192 }]}>
              <TextInput
                style={[
                  styles.inputStyle,
                  {
                    elevation: 7,
                  },
                ]}
                onChangeText={(position) => setposition(position)}
                placeholder='Position'
                placeholderTextColor='#ACA9A9'
                underlineColorAndroid='#f000'
              />
            </View>
            <Pressable
              style={{
                width: 192,
                height: 31,
                borderRadius: 10,
                marginTop: 6,
                backgroundColor: colors.Bluish,
              }}
              onPress={() => {
                equityOfferstatus(startupid, position, equityid, 'Accepted')
                setModalVisible1(false)
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '400',
                  alignSelf: 'center',
                  margin: 6,
                  color: colors.white,
                }}
              >
                Accept Offer
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal animationType='fade' visible={getmodalvisible2}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={styles.confirmation}>
              <Text
                style={{
                  color: '#333',
                  fontSize: 20,
                  textAlign: 'center',
                }}
              >
                Enter your Card Info
              </Text>
              <CardField
                postalCodeEnabled={true}
                cardNumberEnabled={true}
                style={{
                  width: '90%',
                  height: 50,
                  marginVertical: 30,
                  marginLeft: 15,
                  color: '#333',
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: colors.Bluish,
                  height: 33,
                  width: 150,
                  marginLeft: 230,
                  elevation: 8,
                  borderRadius: 10,
                }}
                onPress={() => {
                  initializePaymentSheet()
                  openPaymentSheet()
                }}
              >
                <Text style={styles.buttonText}>Pay - $</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View style={[styles.header, styles.shadow]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign
            name='arrowleft'
            size={24}
            color='black'
            onPress={() => navigation.goBack()}
          />
        </View>
        {/* Text View in */}
        <View>
          <Image
            source={{
              uri: `${baseURL}media/getimage/${userImg}`,
            }}
            style={{ height: 46, width: 46, margin: 6, borderRadius: 50 }}
          />
        </View>
        <View style={{ marginRight: 80 }}>
          <MyText
            style={{
              fontWeight: '700',
              fontSize: 14,
              marginRight: 49,
              color: colors.text,
            }}
          >
            {Title}
          </MyText>

          {chatType === 'group' ? (
            <Pressable
              onPress={() => {
                navigation.navigate('NewMessage', { members: members })
              }}
            >
              <FlatList
                data={members}
                keyExtractor={(item) => item.id}
                horizontal={true}
                style={{ alignSelf: 'flex-start', width: 66 }}
                renderItem={({ item }) => (
                  <View style={{ marginTop: 5, width: 19 }}>
                    <Image
                      style={{ width: 24, height: 24, borderRadius: 50 }}
                      source={{
                        uri: 'https://www.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg',
                      }}
                    />
                  </View>
                )}
              />
            </Pressable>
          ) : (
            <MyText
              style={{
                fontWeight: '700',
                fontSize: 12,
                marginRight: 49,
                color: '#ACA9A9',
              }}
            >
              {online}
            </MyText>
          )}
        </View>
      </View>
      {chatType === 'group' ? (
        <FlatList
          data={msg}
          ref={yourRef}
          onContentSizeChange={handleContentSizeChange}
          // onLayout={() => yourRef.current.scrollToEnd()}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
              {item.user._id == 'other' ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Image
                      source={{
                        uri: `https://stepev-dev.up.railway.app/media/getimage/${item.sender.avatar}`,
                      }}
                      style={{
                        height: 25,
                        marginLeft: 9,
                        width: 25,
                        marginTop: 25,
                        borderRadius: 50,
                      }}
                    />
                    <View
                      style={{
                        height: 43,
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        backgroundColor: '#ecf0f1',
                        padding: 8,
                        marginTop: 10,
                        marginLeft: 13,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '400',
                        }}
                      >
                        {item?.text}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      marginLeft: 50,
                      margin: 7,
                      fontSize: 8,
                      fontWeight: '400',
                      color: '#23232380',
                    }}
                  >
                    {moment(item.createdAt).format('h:mm a')}
                  </Text>
                  {item.image && (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Image
                          source={{
                            uri: `${baseURL}media/getimage/${item.sender.avatar}`,
                          }}
                          style={{
                            height: 25,
                            marginLeft: 9,
                            width: 25,
                            marginTop: 25,
                            borderRadius: 50,
                          }}
                        />
                        <Image
                          source={{
                            uri: `${baseURL}media/getimage/${item.image}`,
                          }}
                          style={{
                            height: 150,
                            width: 150,
                            marginLeft: 13,
                            margin: 7,
                            borderRadius: 10,
                            backgroundColor: '#FFF2F2',
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginLeft: 50,
                          margin: 7,
                          fontSize: 8,
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}

                  {item.file && (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Image
                          source={{
                            uri: `${baseURL}media/getimage/${item.sender.avatar}`,
                          }}
                          style={{
                            height: 25,
                            marginLeft: 9,
                            width: 25,
                            marginTop: 25,
                            borderRadius: 50,
                          }}
                        />
                        <View
                          style={{
                            height: 70,
                            width: 90,
                            marginLeft: 13,

                            backgroundColor: '#FFF2F2',
                            borderRadius: 10,
                          }}
                        >
                          <Pressable
                            onPress={() => {
                              Linking.openURL(
                                `${baseURL}media/getFile/${item.file}`
                              )
                              // Toast.show({
                              //   topOffset: 60,
                              //   type: "success",
                              //   text1: "Downloading...",
                              // });
                            }}
                          >
                            <Image
                              source={require('../../../assets/img/pdf.png')}
                              style={{
                                height: 50,
                                width: 50,
                                margin: 7,
                              }}
                            />
                          </Pressable>
                        </View>
                      </View>
                      <Text
                        style={{
                          marginLeft: 50,
                          margin: 7,
                          fontSize: 8,
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                  >
                    <View
                      style={{
                        height: 43,
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        padding: 8,
                        marginTop: 10,
                        marginRight: 13,
                        borderRadius: 10,
                        backgroundColor: colors.Bluish,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 11,
                          fontWeight: '400',
                        }}
                      >
                        {item?.text}
                      </Text>
                    </View>
                    <Image
                      source={{
                        uri: `${axios.defaults.baseURL}/media/getimage/${item.sender.avatar}`,
                      }}
                      style={{
                        height: 25,
                        marginRight: 9,
                        width: 25,
                        borderRadius: 50,
                        alignSelf: 'flex-end',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      marginRight: 50,
                      margin: 7,
                      fontSize: 8,
                      alignSelf: 'flex-end',
                      fontWeight: '400',
                      color: '#23232380',
                    }}
                  >
                    {moment(item.createdAt).format('h:mm a')}
                  </Text>
                  {item.image && (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Image
                          source={{
                            uri: `${baseURL}media/getimage/${item.image}`,
                          }}
                          style={{
                            height: 150,
                            width: 150,
                            alignSelf: 'flex-end',
                            marginRight: 13,
                            margin: 7,
                            borderRadius: 10,
                            backgroundColor: colors.Bluish,
                          }}
                        />
                        <Image
                          source={{
                            uri: `${baseURL}media/getimage/${item.sender.avatar}`,
                          }}
                          style={{
                            height: 25,
                            marginRight: 9,
                            width: 25,
                            borderRadius: 50,
                            alignSelf: 'flex-end',
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginRight: 50,
                          margin: 7,
                          fontSize: 8,
                          alignSelf: 'flex-end',
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}

                  {item.file && (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <View
                          style={{
                            height: 70,
                            width: 90,
                            alignSelf: 'flex-end',
                            marginRight: 13,

                            backgroundColor: colors.Bluish,
                            borderRadius: 10,
                          }}
                        >
                          <Pressable
                            onPress={() => {
                              downloadFile(
                                `${baseURL}media/getFile/${item.file}`
                              )
                              // Toast.show({
                              //   topOffset: 60,
                              //   type: "success",
                              //   text1: "Downloading...",
                              // });
                            }}
                          >
                            <Image
                              source={require('../../../assets/img/pdf.png')}
                              style={{
                                height: 50,
                                width: 50,
                                margin: 7,
                              }}
                            />
                          </Pressable>
                        </View>
                        <Image
                          source={{
                            uri: `${baseURL}media/getimage/${item.sender.avatar}`,
                          }}
                          style={{
                            height: 25,
                            marginRight: 9,
                            width: 25,
                            borderRadius: 50,
                            alignSelf: 'flex-end',
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginRight: 50,
                          margin: 7,
                          fontSize: 8,
                          alignSelf: 'flex-end',
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <FlatList
          data={msg}
          ref={yourRef}
          onContentSizeChange={handleContentSizeChange}
          // onLayout={() => yourRef.current.scrollToEnd()}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View>
              {item.user._id == 'other' ? (
                <View>
                  <View
                    style={{
                      height: 43,
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                      padding: 8,
                      marginTop: 10,
                      marginLeft: 18,
                      borderRadius: 10,
                      backgroundColor: '#FFF2F2',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: '400',
                      }}
                    >
                      {item.text}
                    </Text>
                  </View>
                  <Text
                    style={{
                      marginLeft: 20,
                      margin: 7,
                      fontSize: 8,
                      fontWeight: '400',
                      color: '#23232380',
                    }}
                  >
                    {moment(item.createdAt).format('h:mm a')}
                  </Text>
                  {item.image && (
                    <View>
                      <Image
                        source={{
                          uri: `${baseURL}media/getimage/${item.image}`,
                        }}
                        style={{
                          height: 150,
                          width: 150,
                          marginLeft: 20,
                          margin: 7,
                          borderRadius: 10,
                          backgroundColor: '#FFF2F2',
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 20,
                          margin: 7,
                          fontSize: 8,
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}
                  {item.file && (
                    <View>
                      <View
                        style={{
                          height: 70,
                          width: 90,
                          marginLeft: 20,

                          backgroundColor: '#FFF2F2',
                          borderRadius: 10,
                        }}
                      >
                        <Pressable
                          onPress={() => {
                            Linking.openURL(
                              `${baseURL}media/getFile/${item.file}`
                            )
                            // Toast.show({
                            //   topOffset: 60,
                            //   type: "success",
                            //   text1: "Downloading...",
                            // });
                          }}
                        >
                          <Image
                            source={require('../../../assets/img/pdf.png')}
                            style={{
                              height: 50,
                              width: 50,
                              margin: 7,
                            }}
                          />
                        </Pressable>
                      </View>
                      <Text
                        style={{
                          marginLeft: 20,
                          margin: 7,
                          fontSize: 8,
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}
                  {item.oneTimeOrder && (
                    <View>
                      <View
                        style={{
                          height: 180,
                          alignSelf: 'flex-start',
                          padding: 8,
                          marginTop: 10,
                          marginLeft: 18,
                          borderRadius: 10,
                          backgroundColor: '#FFF2F2',
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            marginBottom: 5,
                          }}
                        >
                          {item.oneTimeOrder?.jobTitle
                            ? item.oneTimeOrder.jobTitle
                            : item.OneTimeOrder.jobTitle}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '700',
                            marginBottom: 3,
                            borderBottomWidth: 0.5,
                            borderColor: colors.iconGray,
                          }}
                        >
                          One Time Project
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              color: '#23232380',
                            }}
                          >
                            Total Price
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '500',
                            }}
                          >
                            ${' '}
                            {item.oneTimeOrder?.totalPrice
                              ? item.oneTimeOrder.totalPrice
                              : item.OneTimeOrder.totalPrice}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              color: '#23232380',
                            }}
                          >
                            Delivery Time
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '500',
                            }}
                          >
                            {item.oneTimeOrder?.deliveryTime
                              ? moment(item.oneTimeOrder.deliveryTime).format(
                                  'MMM Do YY'
                                )
                              : item.OneTimeOrder.deliveryTime}
                          </Text>
                        </View>
                        {item.oneTimeOrder?.offerStatus !== 'Accepted' && item.oneTimeOrder?.offerStatus !== 'Rejected' && item.oneTimeOrder?.offerStatus !== 'Withdrawn' ? (
                         <View>
                        <Pressable
                          disabled={
                            item.oneTimeOrder.offerStatus === 'Accepted' ||
                            item.oneTimeOrder.offerStatus === 'Rejected'
                              ? true
                              : false
                          }
                          // disabled={!loading}
                          style={{
                            width: 192,
                            height: 30,
                            borderWidth: 1,
                            borderRadius: 10,
                            marginTop: 6,
                          }}
                          onPress={() => {
                            let newid = ""
                            newid = item.oneTimeOrder?._id
                            console.log('newid', newid)
                            navigation.navigate('CheckoutSheet', {
                              order: newid,
                              item: item,
                            })
                            // setorderid(item.oneTimeOrder._id);
                            // setModalVisible2(true);
                            // openPaymentSheet(item.oneTimeOrder._id);
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              alignSelf: 'center',
                              margin: 6,
                            }}
                          >
                            Accept Offer
                          </Text>
                        </Pressable>
                        <Pressable
                          disabled={
                            item.oneTimeOrder.offerStatus === 'Accepted' ||
                            item.oneTimeOrder.offerStatus === 'Rejected'
                              ? true
                              : false
                          }
                          style={{
                            width: 192,
                            height: 30,
                            marginTop: 6,
                            borderRadius: 10,
                            backgroundColor: colors.Bluish,
                          }}
                          onPress={() => {
                            let newid = item.oneTimeOrder?._id
                              ? item.oneTimeOrder._id
                              : item.OneTimeOrder._id

                            oneTimeOfferstatus(newid, 'Rejected')
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              color: colors.white,
                              alignSelf: 'center',
                              margin: 6,
                            }}
                          >
                            Reject Offer
                          </Text>
                        </Pressable>
                        </View>
                        ) : (
                            <Pressable

                                // disabled={!loading}
                                style={{
                                  width: 192,
                                  height: 60,
                                  borderWidth: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 10,
                                  marginTop: 6,
                                }}

                            >
                              <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '400',
                                    alignSelf: 'center',
                                    margin: 6,
                                  }}
                              >
                                Offer {item.oneTimeOrder?.offerStatus}
                              </Text>
                            </Pressable>
                        )}
                      </View>
                      <Text
                        style={{
                          marginLeft: 20,
                          margin: 7,
                          fontSize: 8,
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}
                  {item.equityOrder && (
                    <View>
                      <View
                        style={{
                          height: 180,
                          alignSelf: 'flex-start',
                          padding: 8,
                          marginTop: 10,
                          marginLeft: 18,
                          borderRadius: 10,
                          backgroundColor: '#FFF2F2',
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            marginBottom: 5,
                          }}
                        >
                          {item.equityOrder?.jobTitle
                            ? item.equityOrder.jobTitle
                            : item.EquityOrder.jobTitle}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '700',
                            marginBottom: 3,
                            borderBottomWidth: 0.5,
                            borderColor: colors.iconGray,
                          }}
                        >
                          Join a business
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              color: '#23232380',
                            }}
                          >
                            Equity
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '500',
                            }}
                          >
                            %
                            {item.equityOrder?.equity
                              ? item.equityOrder.equity
                              : item.EquityOrder.equity}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              color: '#23232380',
                            }}
                          >
                            Partnership Agreement
                          </Text>
                          <Pressable
                            onPress={() => {
                              Linking.openURL(
                                  `${baseURL}media/getFile/${item.equityOrder?.partnershipAgreement ? item.equityOrder.partnershipAgreement
                                      : item.EquityOrder.partnershipAgreement}`)

                              // downloadFile(
                              //   `${baseURL}media/getFile/${
                              //     item.equityOrder?.partnershipAgreement
                              //       ? item.equityOrder.partnershipAgreement
                              //       : item.EquityOrder.partnershipAgreement
                              //   }`

                              // Toast.show({
                              //   topOffset: 60,
                              //   type: "success",
                              //   text1: "Downloading...",
                              // });
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: colors.Bluish,
                                fontWeight: '500',
                              }}
                            >
                              View
                            </Text>
                          </Pressable>
                        </View>
                        {
                            item.equityOrder?.offerStatus === 'Pending' ? (
                                <View>
                                  <Pressable
                                      style={{
                                        width: 192,
                                        height: 31,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        marginTop: 6,
                                      }}
                                      onPress={() => {
                                        let newid = item.equityOrder?._id
                                            ? item.equityOrder._id
                                            : item.EquityOrder._id
                                        console.log(newid)
                                        getstartups()

                                        setequityid(newid)
                                        setModalVisible1(true)
                                        //equityOfferstatus(item.equityOrder._id, "Accepted");
                                      }}
                                  >
                                    <Text
                                        style={{
                                          fontSize: 11,
                                          fontWeight: '400',
                                          alignSelf: 'center',
                                          margin: 6,
                                        }}
                                    >
                                      Accept Offer
                                    </Text>
                                  </Pressable>
                                  <Pressable
                                      disabled={
                                        item.equityOrder.offerStatus === 'Accepted' ||
                                        item.equityOrder.offerStatus === 'Rejected'
                                            ? true
                                            : false
                                      }
                                      style={{
                                        width: 192,
                                        height: 31,
                                        marginTop: 6,
                                        borderRadius: 10,
                                        backgroundColor: colors.Bluish,
                                      }}
                                      onPress={() => {
                                        let newid = item.equityOrder?._id
                                            ? item.equityOrder._id
                                            : item.EquityOrder._id

                                        equityOfferstatusReject(newid, 'Rejected')
                                      }}
                                  >
                                    <Text
                                        style={{
                                          fontSize: 11,
                                          fontWeight: '400',
                                          color: colors.white,
                                          alignSelf: 'center',
                                          margin: 6,
                                        }}
                                    >
                                      Reject Offer
                                    </Text>
                                  </Pressable>
                                </View>
                            ) : (
                                <Pressable

                                    // disabled={!loading}
                                    style={{
                                      width: 192,
                                      height: 60,
                                      borderWidth: 1,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: 10,
                                      marginTop: 6,
                                    }}

                                >
                                  <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '400',
                                        alignSelf: 'center',
                                        margin: 6,
                                      }}
                                  >
                                    Offer {item.equityOrder?.offerStatus}
                                  </Text>
                                </Pressable>
                            )
                        }
                      </View>
                      <Text
                        style={{
                          marginLeft: 20,
                          margin: 7,
                          fontSize: 8,
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      height: 43,
                      flexDirection: 'row',
                      alignSelf: 'flex-end',
                      padding: 8,
                      marginTop: 10,
                      marginRight: 18,
                      borderRadius: 10,
                      backgroundColor: colors.Bluish,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 11,
                        fontWeight: '400',
                      }}
                    >
                      {item.text}
                    </Text>
                  </View>
                  <Text
                    style={{
                      marginRight: 20,
                      margin: 7,
                      fontSize: 8,
                      alignSelf: 'flex-end',
                      fontWeight: '400',
                      color: '#23232380',
                    }}
                  >
                    {moment(item.createdAt).format('h:mm a')}
                  </Text>
                  {item.image && (
                    <View>
                      <Image
                        source={{
                          uri: `${baseURL}media/getimage/${item.image}`,
                        }}
                        style={{
                          height: 150,
                          width: 150,
                          alignSelf: 'flex-end',
                          marginRight: 20,
                          margin: 7,
                          borderRadius: 10,
                          backgroundColor: colors.Bluish,
                        }}
                      />
                      <Text
                        style={{
                          marginRight: 20,
                          margin: 7,
                          fontSize: 8,
                          alignSelf: 'flex-end',
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}

                  {item.file && (
                    <View>
                      <View
                        style={{
                          height: 70,
                          width: 90,
                          alignSelf: 'flex-end',
                          marginRight: 20,

                          backgroundColor: colors.Bluish,
                          borderRadius: 10,
                        }}
                      >
                        <Pressable
                          onPress={() => {
                            Linking.openURL(
                              `${baseURL}media/getFile/${item.file}`
                            )
                            // Toast.show({
                            //   topOffset: 60,
                            //   type: "success",
                            //   text1: "Downloading...",
                            // });
                          }}
                        >
                          <Image
                            source={require('../../../assets/img/pdf.png')}
                            style={{
                              height: 50,
                              width: 50,
                              margin: 7,
                            }}
                          />
                        </Pressable>
                      </View>
                      <Text
                        style={{
                          marginRight: 20,
                          margin: 7,
                          fontSize: 8,
                          alignSelf: 'flex-end',
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}
                  {item.oneTimeOrder && (
                    <View>
                      <View
                        style={{
                          height: 180,
                          alignSelf: 'flex-end',
                          padding: 8,
                          marginTop: 10,
                          marginRight: 18,
                          borderRadius: 10,
                          backgroundColor: colors.Bluish,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: colors.white,
                            marginBottom: 5,
                          }}
                        >
                          {item.oneTimeOrder.jobTitle}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '700',
                            color: colors.white,
                            marginBottom: 3,
                            borderBottomWidth: 0.5,
                            borderColor: colors.white,
                          }}
                        >
                          One Time Project
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              color: colors.white,
                            }}
                          >
                            Total Price
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '500',
                              color: colors.white,
                            }}
                          >
                            ${item.oneTimeOrder.totalPrice}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              color: colors.white,
                            }}
                          >
                            Delivery Time
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '500',
                              color: colors.white,
                            }}
                          >
                            {moment(item.oneTimeOrder.deliveryTime).format(
                              'MMM Do YYYY'
                            )}
                          </Text>
                        </View>
                        {item.oneTimeOrder?.offerStatus !== 'Accepted' && item.oneTimeOrder?.offerStatus !== 'Rejected' && item.oneTimeOrder?.offerStatus !== 'Withdrawn' ? (
                        <View>
                        <Pressable
                          style={{
                            width: 192,
                            height: 31,
                            borderWidth: 1,
                            borderColor: colors.white,
                            borderRadius: 10,
                            marginTop: 6,
                          }}
                          onPress={() => {}}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              alignSelf: 'center',
                              margin: 6,
                              color: colors.white,
                            }}
                          >
                            Offer Sent
                          </Text>
                        </Pressable>
                        <Pressable
                          disabled={
                            item.oneTimeOrder.offerStatus === 'Withdrawn '
                              ? true
                              : false
                          }
                          style={{
                            width: 192,
                            height: 31,
                            marginTop: 6,
                            borderRadius: 10,
                            backgroundColor: colors.white,
                          }}
                          onPress={() => {
                            if(item.oneTimeOrder.offerStatus === 'Withdrawn')
                            {
                              return
                            }
                            oneTimeOfferstatus(
                              item.oneTimeOrder._id,
                              'Withdrawn'
                            )
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              color: colors.Bluish,
                              alignSelf: 'center',
                              margin: 6,
                            }}
                          >
                            Withdraw Offer
                          </Text>
                        </Pressable>
                      </View> ) : (
                          <Pressable

                          // disabled={!loading}
                          style={{
                          width: 192,
                          height: 60,
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          marginTop: 6,
                        }}

                          >
                          <Text
                          style={{
                          fontSize: 11,
                          fontWeight: '400',
                          alignSelf: 'center',
                          margin: 6,
                        }}
                          >
                          Offer {item.oneTimeOrder?.offerStatus}
                          </Text>
                          </Pressable>
                          )}

                      </View>
                      <Text
                        style={{
                          marginRight: 20,
                          alignSelf: 'flex-end',
                          margin: 7,
                          fontSize: 8,
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}
                  {item.equityOrder && (
                    <View>
                      <View
                        style={{
                          height: 180,
                          alignSelf: 'flex-end',
                          padding: 8,
                          marginTop: 10,
                          marginRight: 18,
                          borderRadius: 10,
                          backgroundColor: colors.Bluish,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: colors.white,
                            marginBottom: 5,
                          }}
                        >
                          {item.equityOrder.jobTitle}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '700',
                            color: colors.white,
                            marginBottom: 3,
                            borderBottomWidth: 0.5,
                            borderColor: colors.white,
                          }}
                        >
                          Joining a business
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              color: colors.white,
                            }}
                          >
                            Equity
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '500',
                              color: colors.white,
                            }}
                          >
                            %{item.equityOrder.equity}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              color: colors.white,
                            }}
                          >
                            Partnership Agreement
                          </Text>
                          <Pressable
                            onPress={() => {
                              downloadFile(
                                `${baseURL}media/getFile/${item.equityOrder.partnershipAgreement}`
                              )
                              // Toast.show({
                              //   topOffset: 60,
                              //   type: "success",
                              //   text1: "Downloading...",
                              // });
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '500',
                                color: colors.white,
                              }}
                            >
                              View
                            </Text>
                          </Pressable>
                        </View>
                        {item.equityOrder?.offerStatus !== 'Accepted' && item.equityOrder?.offerStatus !== 'Rejected' && item.equityOrder?.offerStatus !== 'Withdrawn' ? (
                                <View>
                        <Pressable
                          style={{
                            width: 192,
                            height: 31,
                            borderWidth: 1,
                            borderColor: colors.white,
                            borderRadius: 10,
                            marginTop: 6,
                          }}
                          onPress={() => {}}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              alignSelf: 'center',
                              margin: 6,
                              color: colors.white,
                            }}
                          >
                            Offer Sent
                          </Text>
                        </Pressable>
                        <Pressable
                          disabled={
                            item.equityOrder.offerStatus === 'Withdrawn'
                              ? true
                              : false
                          }
                          style={{
                            width: 192,
                            height: 31,
                            marginTop: 6,
                            borderRadius: 10,
                            backgroundColor: colors.white,
                          }}
                          onPress={() => {
                            equityOfferstatusReject(
                              item.equityOrder._id,
                              'Withdrawn'
                            )
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              color: colors.Bluish,
                              alignSelf: 'center',
                              margin: 6,
                            }}
                          >
                            Withdraw Offer
                          </Text>
                        </Pressable>
                                </View> )
                            : (
                          <Pressable

                          // disabled={!loading}
                          style={{
                          width: 192,
                          height: 60,
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          marginTop: 6,
                        }}

                          >
                          <Text
                          style={{
                          fontSize: 11,
                          fontWeight: '400',
                          alignSelf: 'center',
                          margin: 6,
                        }}
                          >
                          Offer {item.equityOrder?.offerStatus}
                          </Text>
                          </Pressable>
                          )}
                      </View>
                      <Text
                        style={{
                          marginRight: 20,
                          alignSelf: 'flex-end',
                          margin: 7,
                          fontSize: 8,
                          fontWeight: '400',
                          color: '#23232380',
                        }}
                      >
                        {moment(item.createdAt).format('h:mm a')}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        />
      )}
      <View style={{ height: 50, borderWidth: 0.3, borderColor: '#23232380' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            elevation: 5,
          }}
        >
          <MaterialCommunityIcons
            name='camera'
            style={{ margin: 14, marginRight: 5 }}
            size={25}
            color='#23232380'
            onPress={() => {
              pickMedia()
            }}
          />
          <TextInput
            style={{
              marginRight: 10,
              fontSize: 11,
              fontWeight: '400',
              width: 130,
              flex: 1,
            }}
            multiline={true}
            placeholder='Type Message here'
            placeholderTextColor='#23232380'
            onChangeText={(message) => setMessage(message)}
            value={message}
          />
          <MaterialCommunityIcons
            name='send-circle'
            style={{ margin: 10, marginRight: 5 }}
            size={32}
            color={colors.Bluish}
            onPress={() => {
              //console.log(msg);
              if (chatType === 'group') {
                var obj = {}
                ;(obj['createdAt'] = Date.now()),
                  (obj['text'] = message),
                  (obj['sender'] = {
                    avatar: userdetails.avatar,
                  }),
                  (obj['user'] = {
                    _id: 'me',
                  })
                setmsg([...msg, obj])
                sendMessage(message, 'text')
                setMessage('')
              } else {
                var obj = {}
                ;(obj['createdAt'] = Date.now()),
                  (obj['text'] = message),
                  (obj['user'] = {
                    _id: 'me',
                  })
                setmsg([...msg, obj])
                sendMessage(message, 'text')
                setMessage('')
              }
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1.5,
          shadowRadius: 2,
          elevation: 3,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => {
            pickDocument()
          }}
        >
          <Entypo
            name='attachment'
            style={{ marginTop: 10, marginLeft: 20 }}
            size={15}
            color='#23232380'
          />
          <MyText
            style={{
              color: '#23232380',
              fontSize: 11,
              margin: 10,
            }}
          >
            Attach Files
          </MyText>
        </TouchableOpacity>

        {chatType === 'group' || userdetails.role === 'Startup Owner' ? (
          <View></View>
        ) : (
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              navigation.navigate('CustomOffer', { id: id })
            }}
          >
            <AntDesign
              name='pluscircleo'
              style={{ marginTop: 10, marginLeft: 20 }}
              size={15}
              color='#23232380'
            />
            <MyText
              style={{
                color: '#23232380',
                fontSize: 11,
                margin: 10,
              }}
            >
              Create Order
            </MyText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default MessageBox

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    padding: 6,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.5,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 47,
    marginTop: 14,
    marginBottom: 5,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 14,
    borderRadius: 2,
    backgroundColor: 'white',
  },
})
