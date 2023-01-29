import React, { useContext, useState } from 'react'
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

const CompletedOrderDetailScreen = () => {
  const navigation = useNavigation()

  const {
    theme: { colors },
  } = useContext(Context)

  const Review = () => (
    <View style={{ marginBottom: 15 }}>
      <View
        style={{
          paddingTop: 13,
          paddingBottom: 14,
          paddingRight: 17,
          borderRadius: 10,
          flexDirection: 'row',
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
            <View style={{ flexDirection: 'row' }}>
              {[1, 2, 3, 4, 5].map((element) => {
                return (
                  <Icon
                    style={{ marginRight: 2.2 }}
                    name='star'
                    key={element}
                    color='#FFB33E'
                  />
                )
              })}
            </View>
          </View>
          <View>
            <MyText
              style={{
                marginBottom: 3,
                textAlign: 'right',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'rgba(35, 35, 35, 0.35)',
              }}
            >
              4 days ago
            </MyText>
          </View>
        </View>
      </View>
      <MyText style={{ color: 'rgba(35, 35, 35, 0.49)' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vene
        natis sit amet risus a. More
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
              <MyText style={styles.heading}>Delivered On</MyText>
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
            <Entypo name='attachment' size={14} /> &nbsp;&nbsp; Attachment
          </MyText>
        </TouchableOpacity>

        <View style={{ marginTop: 49 }}>
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: '#eee',
            }}
          >
            <MyText style={styles.heading}>My Reviews</MyText>
          </View>
          <Review />
          <Review />
          <Review />
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
