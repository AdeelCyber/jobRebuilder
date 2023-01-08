import React, { useContext } from 'react'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import Icon from '@expo/vector-icons/FontAwesome'

import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import SvgImport from '../../../Components/SvgImport'
import MotoMobileIcon from '../../../../assets/Svgs/MotoMobileIcon'
import ArrowRightIcon from '../../../../assets/Svgs/ArrowRightIcon'
import SmallArrowRight from '../../../../assets/Svgs/SmallArrowRight'
import CustomHeader from '../../../Components/CustomHeader2'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const JobRequestScreen = () => {
  const navigation = useNavigation()

  const {
    theme: { colors },
  } = useContext(Context)

  const RequestBox = () => (
    <View style={styles.requestBox}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Image
          style={{ height: 45, width: 45, borderRadius: 5 }}
          source={{
            uri: 'https://img.freepik.com/premium-photo/portrait-handsome-anime-boy-avatar-computer-graphic-background-2d-illustration_67092-2000.jpg?w=2000',
          }}
        />

        <View style={{ paddingHorizontal: 15 }}>
          <MyText style={{ fontSize: 10 }}>Conor Murphy</MyText>
          <MyText
            style={{
              color: colors.secondaryText,
              fontSize: 9,
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            UX/UI Designer
          </MyText>
          <MyText
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 10,
              fontWeight: '600',
            }}
          >
            <Icon name='star' color='#FFB33E' /> 5.0
          </MyText>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingTop: 23,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ marginHorizontal: 4 }}>
          <MyText
            style={{ paddingBottom: 10, fontWeight: '600', fontSize: 12 }}
          >
            Applied For
          </MyText>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <SvgImport svg={MotoMobileIcon} />
            <MyText style={{ fontSize: 11 }}> Moto Mobiles</MyText>
            {/* <Icon name='compass' color='blue' />  */}
          </View>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <MyText
            style={{ paddingBottom: 10, fontWeight: '600', fontSize: 12 }}
          >
            Applied For
          </MyText>
          <MyText
            style={{
              fontSize: 11,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Moto Mobiles
          </MyText>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <MyText
            style={{ paddingBottom: 10, fontWeight: '600', fontSize: 12 }}
          >
            Applied For
          </MyText>
          <MyText
            style={{
              fontSize: 11,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Moto Mobiles
          </MyText>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('JobDetails')
          }}
        >
          <MyText
            style={{
              fontSize: 10,
              fontWeight: '600',
            }}
          >
            View Profile
          </MyText>
          <MyText style={{ fontWeight: '600', fontSize: 13 }}>
            {' '}
            &#x3e;&#x3e;
          </MyText>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            labelStyle={{ color: '#fff' }}
            style={{
              backgroundColor: '#8489FC',
              borderRadius: 4,
              width: 63,
              height: 19,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MyText
              style={{
                color: 'white',
                fontSize: 10,
              }}
            >
              Chat
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        Title='Job Requests'
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
        <RequestBox />
        <RequestBox />
        <RequestBox />
        <RequestBox />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})

export default JobRequestScreen
