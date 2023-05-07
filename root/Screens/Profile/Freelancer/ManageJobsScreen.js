import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import Icon from '@expo/vector-icons/FontAwesome'

import { useNavigation } from '@react-navigation/native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import PendingJobsScreen from './PendingJobsScreen'
import CompletedJobsScreen from './CompletedJobsScreen'
import ActiveJobsScreen from './ActiveJobsScreen'
import CustomHeader from '../../../Components/CustomHeader2'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

const ManageJobsScreen = () => {
  const navigation = useNavigation()

  const {
    theme: { colors },
  } = useContext(Context)

  const [currentPage, setCurrentPage] = useState(1)

  const [totalActiveJobs, setTotalActiveJobs] = useState(0)
  const [totalPendingJobs, setTotalPendingJobs] = useState(0)
  const [totalCompletedJobs, setTotalCompletedJobs] = useState(0)
  const [buttons, setButtons] = useState(['Active', 'Pending', 'Completed'])

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
      <ScrollView style={{ backgroundColor: '#ffffff', height: '100%' }}>
        <CustomHeader
          nav={navigation}
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
            {buttons.map((button, index) => {
              return (
                <TouchableOpacity
                  key={button}
                  style={[
                    styles.btn,
                    {
                      backgroundColor:
                        currentPage === index + 1 ? colors.secondary : 'white',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    },
                  ]}
                  onPress={() => {
                    switchPage(index + 1)
                  }}
                >
                  <MyText
                    style={{
                      color: currentPage === index + 1 ? 'white' : colors.text,
                      fontSize: 14,
                    }}
                  >
                    {button}
                  </MyText>
                  <MyText
                    style={{
                      color: 'white',
                      fontSize: 12,
                      backgroundColor:
                        currentPage === index + 1 ? 'black' : colors.secondary,
                      paddingHorizontal: 7,
                      paddingTop: 2,
                      paddingBottom: 2,
                      borderRadius: 50,
                      marginLeft: 10,
                    }}
                  >
                    {index + 1 === 1
                      ? totalActiveJobs
                      : index + 1 === 2
                      ? totalPendingJobs
                      : totalCompletedJobs}
                  </MyText>
                </TouchableOpacity>
              )
            })}
          </View>

          {/* Page */}
          {currentPage === 3 && (
            <CompletedJobsScreen fun={setTotalActiveJobs} />
          )}
          {currentPage === 2 && <PendingJobsScreen fun={setTotalPendingJobs} />}
          {currentPage === 1 && (
            <ActiveJobsScreen fun={setTotalCompletedJobs} />
          )}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17,
    paddingHorizontal: 10,
  },
})

export default ManageJobsScreen
