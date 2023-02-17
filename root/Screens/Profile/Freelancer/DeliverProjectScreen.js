import React, { useContext, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'

import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader2'
import { Entypo } from '@expo/vector-icons'
import SvgImport from '../../../Components/SvgImport'
import UploadIcon from '../../../../assets/Svgs/UploadIcon'
import * as DocumentPicker from 'expo-document-picker'
import {
  deliverOneTimeOrder,
  uploadFileServer,
} from '../services/orderServices'
import { fileUpload } from '../services/fileServices'
import Toast from 'react-native-toast-message'

const DeliverProjectScreen = ({ route }) => {
  const navigation = useNavigation()
  const [comment, setComment] = useState('')
  const [file, setFile] = useState(null)
  const [fileNameFromServer, setFileNameFromServer] = useState('')
  const [attachments, setAttachments] = useState([])

  const { orderId } = route.params
  const {
    theme: { colors },
  } = useContext(Context)

  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({})
      if (result.cancelled) {
        throw new Error('File not selected')
      }
      setFile(result)
      const { body } = await fileUpload(result.uri)
      console.log(JSON.parse(body))

      setAttachments((prevItems) => {
        return [...prevItems, JSON.parse(body).filename]
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const deliver = async () => {
    const resp = await deliverOneTimeOrder(orderId, comment, attachments)
    if (resp.status === 200) {
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Order Cancelled',
        text2: '.',
      })
      navigation.navigate('FreelancerProfile')
    } else if (resp.status === 400 || resp.status === 401) {
      navigation.navigate('LoginScreen')
    }
  }

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Deliver Project'
        nav={navigation}
        style={{}}
        icon={() => {
          return <Entypo name='dots-three-vertical' size={20} color='black' />
        }}
      />
      <View style={[styles.container, { paddingTop: 17, padding: 23 }]}>
        <MyText style={styles.heading}>Comment/Message*</MyText>
        <View style={styles.sectiontextarea}>
          <TextInput
            style={{
              paddingLeft: 15,
              marginLeft: 4,
              fontSize: 12,
            }}
            onChangeText={(e) => {
              setComment(e)
            }}
            multiline={true}
            scrollEnabled={true}
            placeholder='Enter Message here'
            underlineColorAndroid='transparent'
          />
        </View>
        <MyText style={styles.heading}>Attachment*</MyText>
        <MyText style={{ color: 'gray' }}>
          Upload your project files here, so the client can review.
        </MyText>
        <TouchableOpacity
          labelStyle={{ color: '#fff' }}
          style={styles.btn}
          onPress={uploadFile}
        >
          <MyText
            style={{
              fontSize: 17,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SvgImport style={{ marginLeft: 2 }} svg={UploadIcon} /> Upload File
          </MyText>
        </TouchableOpacity>
        <MyText style={{ fontSize: 15, color: colors.lighttext }}>
          {file?.name}
        </MyText>
        <TouchableOpacity
          labelStyle={{ color: '#fff' }}
          style={[
            styles.btn,
            { width: '100%', backgroundColor: colors.secondary },
          ]}
          onPress={() => {
            deliver()
          }}
        >
          <MyText
            style={{
              fontSize: 14,
              color: 'white',
            }}
          >
            Delivery
          </MyText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default DeliverProjectScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    // fontWeight: '700',
    lineHeight: 30,
    color: '#232323',
    textAlign: 'left',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
  },
  dropdown: {
    height: 55,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingLeft: 30,
  },

  sectiontextarea: {
    paddingVertical: 13,
    borderWidth: 0.8,
    borderColor: '#222222',
    borderRadius: 10,
    paddingRight: 14,
    marginBottom: 10,
    marginTop: 11,
    height: 135,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  searchIcon: {
    padding: 10,
  },

  textInput: {
    paddingLeft: 15,
    marginLeft: 4,
    flex: 1,
    border: 'none',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginHorizontal: 18,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 26,
    color: '#424242',
  },

  textInputView: {
    paddingVertical: 13,
    width: '90%',
    borderWidth: 0.8,
    borderColor: '#222222',
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingRight: 14,
    marginHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 29,
    marginBottom: 40,
  },
  shadow: {
    shadowColor: '#000a',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
