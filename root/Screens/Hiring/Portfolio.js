import { View, Text } from 'react-native'
import React from 'react'
import MyText from '../../Components/Text'
import { Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from '../../http/axiosSet'
import Error from '../../Components/Error'

const Portfolio = ({ portfolio }) => {
  const navigation = useNavigation()

  console.log(portfolio)
  return (
    <ScrollView style={{ marginTop: 20 }}>
      {portfolio?.length === 0 && (
        <View>
          <Error message='No Portfolio Found' />
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {portfolio?.map((element, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('ViewDetailPorfolio', {
                  portfolioDetail: element,
                })
              }}
              style={{
                marginRight: 10,
                marginBottom: 22,
                borderWidth: 1,
                borderColor: '#eeeeee',
                borderRadius: 10,
              }}
            >
              <Image
                source={{
                    uri: axios.defaults.baseURL + 'media/getimage/' + element.attachments[0]
                }}
                style={{ width: 160, height: 150, borderRadius: 10 }}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default Portfolio
