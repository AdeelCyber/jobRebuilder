import { View, Text } from 'react-native'
import React from 'react'
import MyText from '../../Components/Text'
import { StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { Image } from 'react-native'
import CustomHeader from '../../Components/CustomHeader2'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const ViewPortfolio = ({ route }) => {
  const { portfolioDetail } = route.params
  const navigation = useNavigation()
  return (
    <View style={{ backgroundColor: 'white', height: 1000 }}>
      <CustomHeader
        Title='Viewing Portfolio'
        style={{}}
        nav={navigation}
        icon={() => {
          return (
            <MaterialCommunityIcons
              name='bell-circle'
              size={28}
              color='black'
            />
          )
        }}
      />
      <View
        style={{
          marginTop: 40,
          paddingHorizontal: 26,
        }}
      >
        <MyText style={{ fontSize: 18 }}>Portfolio Details</MyText>
        <MyText style={{ fontSize: 18, marginTop: 20 }}>Title</MyText>
        <MyText style={{ fontSize: 15, color: 'gray', marginTop: 20 }}>
          {portfolioDetail?.title}
        </MyText>
        <MyText style={{ fontSize: 18, marginTop: 20 }}>Description</MyText>

        <MyText style={{ fontSize: 15, color: 'gray', marginTop: 20 }}>
          {portfolioDetail?.description}
        </MyText>
        <MyText style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>
          Attachments
        </MyText>

        <View style={styles.swiper}>
          <Swiper showButtons={true} autoplay={false} autoplayTimeout={4}>
            {portfolioDetail?.attachments.map((i, index) => {
              return (
                <Image
                  source={{
                    uri: i,
                  }}
                  resizeMode='contain'
                  style={{ height: 278, width: 350, borderRadius: 10 }}
                  key={index}
                />
              )
            })}
          </Swiper>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  swiper: {
    width: '100%',
    height: 290,
    backgroundColor: '#fff',
    position: 'relative',
  },
})

export default ViewPortfolio
