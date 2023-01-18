import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import Icon from '@expo/vector-icons/FontAwesome'

import { useNavigation } from '@react-navigation/native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import PendingJobsScreen from './PendingJobsScreen'
import CancelledJobsScreen from './CompletedJobsScreen'
import ActiveJobsScreen from './ActiveJobsScreen'
import CustomHeader from '../../../Components/CustomHeader2'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

const ManageJobsScreen = () => {
  const navigation = useNavigation()

  const {
    theme: { colors },
  } = useContext(Context)

  const [currentPage, setCurrentPage] = useState(1)

  const switchPage = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const swipePage = (direction) => {
    if (direction === 'Right') {
      if (currentPage === 3) {
        setCurrentPage(2)
      } else if (currentPage === 2) {
        setCurrentPage(1)
      }
    } else if (direction === 'Left') {
      if (currentPage === 2) {
        setCurrentPage(3)
      } else if (currentPage === 1) {
        setCurrentPage(2)
      }
    }
  }

  return (
    <GestureRecognizer
      onSwipeLeft={(state) => swipePage('Left')}
      onSwipeRight={(state) => swipePage('Right')}
      config={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 60,
      }}
    >
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        <CustomHeader
          Title='Manage Jobs'
          style={{
            elevation: 0,
          }}
          icon={() => {
            return <Entypo name='dots-three-vertical' size={20} color='black' />
          }}
        />
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.background,
              paddingTop: 10,
              padding: 23,
              shadowColor: '#000',
              elevation: 10,
              borderTopColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
            },
          ]}
        >
          {/* Header buttons */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor:
                    currentPage === 1 ? colors.secondary : 'white',
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => {
                switchPage(1)
              }}
            >
              <MyText
                style={{
                  color: currentPage === 1 ? 'white' : colors.text,
                  fontSize: 14,
                }}
              >
                Active
              </MyText>
              <MyText
                style={{
                  color: 'white',
                  fontSize: 12,
                  backgroundColor:
                    currentPage === 1 ? 'black' : colors.secondary,
                  paddingHorizontal: 7,
                  paddingTop: 2,
                  paddingBottom: 2,
                  borderRadius: 50,
                  marginRight: -15,
                  marginLeft: 10,
                }}
              >
                7
              </MyText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor:
                    currentPage === 2 ? colors.secondary : 'white',
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => {
                switchPage(2)
              }}
            >
              <MyText
                style={{
                  color: currentPage === 2 ? 'white' : colors.text,
                  fontSize: 14,
                }}
              >
                Pending
              </MyText>
              <MyText
                style={{
                  color: 'white',
                  fontSize: 12,
                  backgroundColor:
                    currentPage === 2 ? 'black' : colors.secondary,
                  paddingHorizontal: 7,
                  paddingTop: 2,
                  paddingBottom: 2,
                  borderRadius: 50,
                  marginRight: -15,
                  marginLeft: 10,
                }}
              >
                7
              </MyText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor:
                    currentPage === 3 ? colors.secondary : 'white',
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => {
                switchPage(3)
              }}
            >
              <MyText
                style={{
                  color: currentPage === 3 ? 'white' : colors.text,
                  fontSize: 14,
                }}
              >
                Completed
              </MyText>
              <MyText
                style={{
                  color: 'white',
                  fontSize: 12,
                  backgroundColor:
                    currentPage === 3 ? 'black' : colors.secondary,
                  paddingHorizontal: 7,
                  paddingTop: 2,
                  paddingBottom: 2,
                  borderRadius: 50,
                  marginRight: -15,
                  marginLeft: 10,
                }}
              >
                7
              </MyText>
            </TouchableOpacity>
          </View>

          {/* Page */}
          {currentPage === 3 && <CancelledJobsScreen />}
          {currentPage === 2 && <PendingJobsScreen />}
          {currentPage === 1 && <ActiveJobsScreen />}
        </View>
      </ScrollView>
    </GestureRecognizer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    borderRadius: 20,
    paddingTop: 9,
    paddingBottom: 9,
    width: '32%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17,
  },
})

export default ManageJobsScreen
