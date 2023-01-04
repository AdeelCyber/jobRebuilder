import React, { useContext, useState } from 'react'
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

import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader'
import ReactNativeModal from 'react-native-modal'

const PendingOrderDetailScreen = () => {
  const navigation = useNavigation()

  const [isModalVisible, setModalVisible] = useState(false)

  const {
    theme: { colors },
  } = useContext(Context)

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
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
                uri: 'https://banner2.cleanpng.com/20180625/req/kisspng-computer-icons-avatar-business-computer-software-user-avatar-5b3097fcae25c3.3909949015299112927133.jpg',
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
                Phil Jones
              </MyText>
              <MyText
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: 'rgba(35, 35, 35, 0.5)',
                }}
              >
                phil@gmail.com
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
                <MyText style={{ fontSize: 18, fontWeight: '600' }}>$50</MyText>
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
          <MyText style={styles.description}>Make me a logo</MyText>
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
          <MyText style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            venenatis sit amet risus a bibendum.
          </MyText>
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
            <MyText style={styles.description}>25 Dec 2022</MyText>
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
            <MyText style={styles.description}>23 Dec 2022</MyText>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 38 }}>
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
        </View>

        <TouchableOpacity
          labelStyle={{ color: '#fff' }}
          style={[styles.btn, { backgroundColor: colors.secondary }]}
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
                scrollEnabled={true}
              />
            </View>

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
