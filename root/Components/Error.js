import { View, Text } from 'react-native'
import MyText from './Text'
import React from 'react'

const Error = (props) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MyText
        style={[
          {
            textAlign: 'center',
            backgroundColor: '#ff6866',
            color: 'white',
            fontWeight: '700',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 6,
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
