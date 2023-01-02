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

      <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 23 }}>
        <View style={{ marginHorizontal: 4 }}>
          <MyText
            style={{ paddingBottom: 10, fontWeight: '600', fontSize: 10 }}
          >
            Applied For
          </MyText>
          <MyText
            style={{
              fontSize: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name='compass' color='blue' /> Moto Mobiles
          </MyText>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <MyText
            style={{ paddingBottom: 10, fontWeight: '600', fontSize: 10 }}
          >
            Applied For
          </MyText>
          <MyText
            style={{
              fontSize: 10,
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
            style={{ paddingBottom: 10, fontWeight: '600', fontSize: 10 }}
          >
            Applied For
          </MyText>
          <MyText
            style={{
              fontSize: 10,
              display: 'flex',
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
          }}
          onPress={() => {
            navigation.navigate('JobDetails')
          }}
        >
          <MyText
            style={{
              fontSize: 10,
            }}
          >
            View Profile <Icon name='arrow-right' />
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
    <ScrollView>
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
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 15,
    marginBottom: 16,
    borderColor: 'lightgray',
  },
})

export default JobRequestScreen
