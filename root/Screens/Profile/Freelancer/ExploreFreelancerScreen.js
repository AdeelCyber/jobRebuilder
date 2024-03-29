import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'

import React, { useContext, useState } from 'react'
import Context from '../../../Context/Context'
import CustomHeader from '../../../Components/CustomHeader'
import { Searchbar } from 'react-native-paper'
import SvgImport from '../../../Components/SvgImport'
import SettingIcon from '../../../../assets/Svgs/SettingIcon'
import GraduationHat from '../../../../assets/Svgs/GraduationHat'
import MyText from '../../../Components/Text'
import HomeCategories from '../../../Components/HomeCategories'
import HomePopular from '../../../Components/HomePopular'
import Buildings from '../../../../assets/img/Buildings.png'
import Logo from '../../../../assets/Svgs/Logo'
import HeartIcon from '../../../../assets/Svgs/HeartIcon'
import AIBrainIcon from '../../../../assets/Svgs/AIBrainIcon'
import SoftwareCompanyIcon from '../../../../assets/Svgs/SoftwareCompanyIcon'
import ConstructionIcon from '../../../../assets/Svgs/ConstructionIcon'
import Category1 from '../../../Components/Category1'
import Posts from '../../../Components/Posts'
import RateComp from '../../../Components/RateComp'

const ExploreFreelancerScreen = ({ navigation, routes }) => {
  //categories hook
  const [catgeories, setCategories] = useState([
    { icon: ConstructionIcon, text: 'Construction' },
    { icon: GraduationHat, text: 'Education' },
    { icon: SoftwareCompanyIcon, text: 'Software Company' },
    { icon: AIBrainIcon, text: 'Ai Tech' },
    { icon: HeartIcon, text: 'Liked' },
  ])

  const [RateData, setRateData] = useState([
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
    {
      name: 'Abdullah',
      designation: 'Ceo',
      Price: '70.00',
      Rating: '5.0',
      Image:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    },
  ])
  //Popular hook
  const [popularCards, setPopularCards] = useState([
    {
      src: Buildings,
      title: 'Beyond',
      desc: '',
      raisedFunds: '$250 M',
      minInv: '$124.0',
      ShareHolders: 2560,
    },
    {
      src: Buildings,
      title: 'Beyond',
      desc: '',
      raisedFunds: '$250 M',
      minInv: '$124.0',
      ShareHolders: 2560,
    },
    {
      src: Buildings,
      title: 'Beyond',
      desc: '',
      raisedFunds: '$250 M',
      minInv: '$124.0',
      ShareHolders: 2560,
    },
  ])

  const [searchQuery, setSearchQuery] = React.useState('') //searchbar query hook

  const onChangeSearch = (query) => setSearchQuery(query)
  const {
    theme: { colors },
  } = useContext(Context)
  const numCols = catgeories.length //for categories gapping
  return (
    // main container
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        paddingLeft: 15,
      }}
    >
      {/* header */}
      <CustomHeader />
      {/* header out */}

      {/*Seacrch bar and setting icon in  */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          marginTop: 20,
          paddingLeft: 10,
        }}
      >
        <Searchbar
          placeholder='Search'
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={[
            {
              width: '80%',
              backgroundColor: 'white',
              color: colors.placeHolder,
              fontSize: 10,
              borderRadius: 6,

              elevation: 20,
            },
            styles.shadow,
          ]}
        />
        <View
          style={[
            {
              backgroundColor: colors.white,
              justifyContent: 'center',
              alignContent: 'center',
              borderRadius: 6,
              height: 52,
              width: 52,
              marginLeft: 10,

              elevation: 10,
            },
            styles.shadow,
          ]}
        >
          <SvgImport svg={SettingIcon} style={{ alignSelf: 'center' }} />
        </View>
        {/* seatch bar icon out */}
      </View>
      {/* Categories In */}
      <View style={{ marginTop: 10 }}>
        <MyText
          style={{
            fontSize: 24,
            fontWeight: '700',
            paddingLeft: 10,
            marginBottom: 16,
          }}
        >
          Categories
        </MyText>
        <View
          style={{
            width: '100%',
            marginLeft: 10,
          }}
        >
          <FlatList
            horizontal
            data={catgeories}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => <Category1 />}
          />
        </View>
      </View>
      {/* Categories Out */}
      {/* popular In */}
      <View style={{ marginTop: '2%', paddingLeft: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 4,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: '700' }}>Popular Posts</Text>
          <MyText
            style={{ fontWeight: '500', fontSize: 10, color: colors.lighttext }}
          >
            See All
          </MyText>
        </View>

        <View style={{ width: '100%', marginTop: 10 }}>
          <FlatList
            horizontal
            data={popularCards}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => <Posts />}
          />
        </View>
      </View>
      {/* popular Out */}
      {/* Recents In  */}
      <View style={{ marginTop: '8%', paddingLeft: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 4,
          }}
        >
          <MyText style={{ fontSize: 24, fontWeight: '700' }}>
            Most Popular
          </MyText>
          <MyText
            style={{ fontWeight: '500', fontSize: 10, color: colors.lighttext }}
          >
            See All
          </MyText>
        </View>

        <View style={{ width: '100%', marginTop: 10 }}>
          {RateData.map((item, index) => (
            <RateComp
              key={index}
              name={item.name}
              Price={item.Price}
              designation={item.designation}
              Rating={item.Rating}
              Image={item.Image}
              style={{ marginVertical: 11 }}
            />
          ))}
        </View>
      </View>

      {/* Recents Out */}
    </ScrollView>
  )
}

export default ExploreFreelancerScreen

const styles = StyleSheet.create({
  // container : {
  //     flex:1,
  // }
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
})
