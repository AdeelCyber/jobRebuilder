import React, { useContext } from 'react'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'

import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader2'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const WarningReasonDetailScreen = () => {
  const navigation = useNavigation()

  const {
    theme: { colors },
  } = useContext(Context)

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Warnings'
        style={{ elevation: 0 }}
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
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: 40,
            paddingHorizontal: 24,
            paddingBottom: 100,
          },
        ]}
      >
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            marginBottom: 7,
            // backgroundColor: 'yellow',
          }}
        >
          <Image
            style={{ height: 50, width: 50, borderRadius: 50, marginRight: 10 }}
            source={{
              uri: 'https://img.freepik.com/premium-photo/portrait-handsome-anime-boy-avatar-computer-graphic-background-2d-illustration_67092-2000.jpg?w=2000',
            }}
          />
          <View>
            <View style={{ marginRight: 18 }}>
              <View
                style={{
                  borderBottomColor: '#eee',
                  marginTop: 5,
                }}
              >
                <MyText
                  style={{ marginBottom: 3, fontWeight: '500', fontSize: 15 }}
                >
                  Moto Mobile
                </MyText>
              </View>
              <MyText style={{ color: 'gray', fontSize: 12 }}>
                Mobile Company
              </MyText>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              //   backgroundColor: 'red',
              width: '55%',
            }}
          >
            <TouchableOpacity
              labelStyle={{ color: '#fff' }}
              disabled={true}
              style={styles.completedBadge}
              onPress={() => {}}
            >
              <MyText
                style={{
                  fontSize: 11,
                  color: 'white',
                }}
              >
                Chat
              </MyText>
            </TouchableOpacity>
          </View>
        </View>
        <MyText style={styles.heading}>Reason</MyText>
        <MyText style={{ lineHeight: 20, color: 'gray' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          venenatissit amet risus a bibendum. Integer a nibh feugiat, congue
          nunc a
        </MyText>
        <MyText style={{ lineHeight: 20, color: 'gray' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          venenatissit amet risus a bibendum. Integer a nibh feugiat, congue
          nunc a
        </MyText>
        <MyText style={{ lineHeight: 20, color: 'gray' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          venenatissit amet risus a bibendum. Integer a nibh feugiat, congue
          nunc a
        </MyText>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  heading: {
    // fontWeight: '700',
    lineHeight: 30,
    color: '#232323',
    textAlign: 'left',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
  },

  requestBox: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 15,
    marginBottom: 16,
    backgroundColor: 'white',
    shadowColor: '#878787',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 15,
  },
  completedBadge: {
    marginHorizontal: 18,
    backgroundColor: '#8489FC',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 7.5,
    paddingBottom: 7.5,
    paddingHorizontal: 28.5,
    marginTop: 10,
  },
})

export default WarningReasonDetailScreen
