import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import MyText from '../../Components/Text'
import Icon from '@expo/vector-icons/FontAwesome'
import Error from '../../Components/Error'

const Reviews = ({ reviews }) => {
  const Review = ({ avatar, email, name, rating, date, comment }) => (
    <View
      style={{
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'lightgray',
        paddingHorizontal: 5,
        paddingVertical: 4,
      }}
    >
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
              uri: avatar,
            }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
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
            <View style={{ flexDirection: 'row' }}>
              {[...Array(5).keys()].map((element) => {
                return (
                  <Icon
                    style={{ marginRight: 2.2 }}
                    name='star'
                    key={element}
                    color={element + 1 <= rating ? '#FFB33E' : '#eeeeee'}
                  />
                )
              })}
              <MyText style={{ marginLeft: 5, fontSize: 13 }}>{rating}</MyText>
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
              {Math.round((new Date() - new Date(date)) / 1000 / 60 / 60 / 24)}{' '}
              days ago
            </MyText>
          </View>
        </View>
      </View>
      <MyText style={{ color: 'rgba(35, 35, 35, 0.49)' }}>{comment}</MyText>
    </View>
  )

  return (
    <View
      style={{
        marginTop: 20,
        paddingBottom: 40,
      }}
    >
      {reviews.length === 0 && (
        <View>
          <Error message='No Review Found' />
        </View>
      )}
      {reviews?.map((element, index) => {
        return <Review review={element} key={index} />
      })}
    </View>
  )
}

export default Reviews
