import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import MyText from '../../Components/Text'
import Context from '../../Context/Context'

const Services = ({ services, jobTitle }) => {
  const {
    theme: { colors },
  } = useContext(Context)
  return (
    <View style={{ marginTop: 30 }}>
      <MyText style={{ fontSize: 17, fontWeight: '600' }}>Description</MyText>
      <View
        style={{
          marginTop: 10,
          paddingTop: 18,
          paddingHorizontal: 16,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'lightgray',
          backgroundColor: 'white',
          shadowColor: '#878787',
          marginBottom: 15,
          paddingBottom: 40,
          //   elevation: 15,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <MyText style={{ fontSize: 17, fontWeight: '600', marginBottom: 10 }}>
            {jobTitle}
          </MyText>
          <MyText style={{ fontSize: 15, fontWeight: '700' }}>
            {services?.hourlyRate}$
          </MyText>
        </View>
        <MyText style={{ color: 'gray', fontSize: 13 }}>
          {services?.description}
        </MyText>
      </View>
      <MyText style={{ fontSize: 17, fontWeight: '600' }}>Skills</MyText>

      <View
        style={{
          marginTop: 10,
          paddingVertical: 18,
          paddingHorizontal: 16,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'lightgray',
          backgroundColor: 'white',
          shadowColor: '#878787',
          marginBottom: 15,
          flexWrap: 'wrap',
          flexDirection: 'row',
          //   elevation: 15,
        }}
      >
        {services?.skills.map((element) => {
          return (
            <View
              style={{
                backgroundColor: colors.secondary,
                width: 100,
                paddingHorizontal: 11,
                paddingVertical: 6,
                borderRadius: 7,
                marginRight: 7,
                marginBottom: 4,
              }}
            >
              <MyText
                style={{ textAlign: 'center', color: 'white', fontSize: 13 }}
              >
                {element}
              </MyText>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default Services
