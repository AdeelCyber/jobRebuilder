import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import MyText from './Text'

const Category1 = () => {
  return (
    <View
      style={{
        backgroundColor: '#8489FC',
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 21,
        borderRadius: 5,
        marginRight: 9,
        borderWidth: 1,
        borderColor: 'lightgray',
      }}
    >
      <MyText style={{ color: 'white' }}>UI/UX Design</MyText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Category1
