import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import MyText from './Text'
import Context from '../Context/Context'

const Earning = ({
  title,
  total,
  subHeadings,
  subHeadingsDescriptions,
  ...props
}) => {
  console.log(subHeadings)
  const {
    theme: { colors },
  } = useContext(Context)
  return (
    <View
      style={[
        {
          paddingTop: 28,
          paddingLeft: 19,
          paddingRight: 22,
          paddingBottom: 20,
          borderRadius: 15,
          shadowColor: '#878787',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          borderBottomColor: colors.secondary,
          borderBottomWidth: 22,
          borderWidth: 1,
          borderColor: 'rgba(100, 100, 111, 0.2)',
        },
        props.style,
      ]}
    >
      <MyText
        style={{
          textAlign: 'center',
          fontSize: 17,
          color: 'rgba(35, 35, 35, 0.36);',
        }}
      >
        {title}
      </MyText>
      <MyText
        style={{
          fontSize: 33,
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 25,
        }}
      >
        $ {total ?? 0}
      </MyText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 29,
        }}
      >
        <View>
          <MyText style={styles.subheading}>$ {subHeadings[0] ?? 0}</MyText>
          <MyText style={styles.subheadingdescription}>
            {subHeadingsDescriptions[0]}
          </MyText>
        </View>
        <View>
          <MyText style={styles.subheading}>{subHeadings[1] ?? 0}</MyText>
          <MyText style={styles.subheadingdescription}>
            {subHeadingsDescriptions[1]}
          </MyText>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View>
          <MyText style={styles.subheading}>$ {subHeadings[2] ?? 0}</MyText>
          <MyText style={styles.subheadingdescription}>
            {subHeadingsDescriptions[2]}
          </MyText>
        </View>
        <View>
          <MyText style={styles.subheading}>{subHeadings[3] ?? 0}</MyText>
          <MyText style={styles.subheadingdescription}>
            {subHeadingsDescriptions[3]}
          </MyText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  subheading: {
    textAlign: 'center',
  },

  subheadingdescription: {
    color: 'rgba(35, 35, 35, 0.36);',
  },
})

export default Earning
