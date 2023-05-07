import { View, Text } from 'react-native'
import MyText from './Text'
import React from 'react'
import { Image } from 'react-native'

const Error = (props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        style={{ marginBottom: 10 }}
        source={require('../../assets/img/Empty.png')}
      />

      <MyText
        style={[
          {
            textAlign: 'center',
            backgroundColor: '#FDD3D3',
            color: 'white',
            fontWeight: '700',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 6,
            textShadowColor: 'black',
          },
          props.style,
        ]}
      >
        {props.message}
      </MyText>
    </View>
  )
}

export default Error
