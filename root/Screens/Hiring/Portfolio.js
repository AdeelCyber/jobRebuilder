import { View, Text } from 'react-native'
import React from 'react'
import MyText from '../../Components/Text'
import { Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Portfolio = ({ portfolio }) => {
  const navigation = useNavigation()

  return (
    <ScrollView style={{ marginTop: 20 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {portfolio?.map((element, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('ViewDetailPorfolio', {
                  portfolioDetail: element,
                })
              }}
              style={{ marginRight: 10, marginBottom: 22 }}
            >
              <Image
                source={{
                  uri: element.attachments[0],
                }}
                style={{ width: 170, height: 150, borderRadius: 10 }}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default Portfolio
