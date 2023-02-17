import { View, Text } from 'react-native'
import React from 'react'
import MyText from '../../Components/Text'
import SvgImport from '../../Components/SvgImport'
import CalendarIcon from '../../../assets/Svgs/CalenderIcon'
import { StyleSheet } from 'react-native'
import ClockIcon from '../../../assets/Svgs/ClockIcon'
import LanguageIcon from '../../../assets/Svgs/LanguageIcon'
import ResponseIcon from '../../../assets/Svgs/ResponseIcon'

const About = ({ about }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.box}>
        <View>
          <MyText style={{ fontSize: 15, fontWeight: '600', marginBottom: 10 }}>
            About
          </MyText>
        </View>
        <MyText style={{ color: 'gray', fontSize: 13 }}>
          {about?.aboutMe}
        </MyText>
      </View>

      <View style={[styles.box, { flexDirection: 'row' }]}>
        <SvgImport svg={CalendarIcon} />
        <View style={{ marginLeft: 15 }}>
          <MyText style={{ fontSize: 13, marginTop: -2, fontWeight: '700' }}>
            Joined Date
          </MyText>
          <MyText style={{ fontSize: 13, color: 'gray' }}>
            {new Date(about.joinedData).toLocaleDateString('default', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </MyText>
        </View>
      </View>

      <View style={[styles.box, { flexDirection: 'row' }]}>
        <SvgImport svg={ClockIcon} />
        <View style={{ marginLeft: 15 }}>
          <MyText style={{ fontSize: 13, marginTop: -2, fontWeight: '700' }}>
            Last Active
          </MyText>
          <MyText style={{ fontSize: 13, color: 'gray' }}>
            {about?.lastActive} min ago
          </MyText>
        </View>
      </View>

      <View style={[styles.box, { flexDirection: 'row' }]}>
        <SvgImport svg={LanguageIcon} />
        <View style={{ marginLeft: 15 }}>
          <MyText style={{ fontSize: 13, marginTop: -2, fontWeight: '700' }}>
            Language
          </MyText>
          <MyText style={{ fontSize: 13, color: 'gray' }}>
            {about?.language}
          </MyText>
        </View>
      </View>

      <View style={[styles.box, { flexDirection: 'row' }]}>
        <SvgImport svg={ResponseIcon} />
        <View style={{ marginLeft: 15 }}>
          <MyText style={{ fontSize: 13, marginTop: -2, fontWeight: '700' }}>
            Response Time
          </MyText>
          <MyText style={{ fontSize: 13, color: 'gray' }}>
            {about?.responseTime} min ago
          </MyText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    paddingTop: 18,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    shadowColor: '#878787',
    marginBottom: 15,
    paddingBottom: 20,
    //   elevation: 15,
  },
})

export default About
