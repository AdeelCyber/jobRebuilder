import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'

import React, { useContext, useState } from 'react'
import Context from '../../Context/Context'
import CustomHeader from '../../Components/CustomHeader'
import { Searchbar } from 'react-native-paper'
import SvgImport from '../../Components/SvgImport'
import SettingIcon from '../../../assets/Svgs/SettingIcon'
import GraduationHat from '../../../assets/Svgs/GraduationHat'
import MyText from '../../Components/Text'
import HomeCategories from '../../Components/HomeCategories'
import HomePopular from '../../Components/HomePopular'
import Buildings from '../../../assets/img/Buildings.png'
import Logo from '../../../assets/Svgs/Logo'
import HeartIcon from '../../../assets/Svgs/HeartIcon'
import AIBrainIcon from '../../../assets/Svgs/AIBrainIcon'
import SoftwareCompanyIcon from '../../../assets/Svgs/SoftwareCompanyIcon'
import ConstructionIcon from '../../../assets/Svgs/ConstructionIcon'

const ExploreScreen = ({ navigation, routes }) => {
  //categories hook
  const [catgeories, setCategories] = useState([
    { icon: ConstructionIcon, text: 'Construction' },
    { icon: GraduationHat, text: 'Education' },
    { icon: SoftwareCompanyIcon, text: 'Software Company' },
    { icon: AIBrainIcon, text: 'Ai Tech' },
    { icon: HeartIcon, text: 'Liked' },
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
  //   React.useEffect(() => {
  //     navigation.setOptions({
  //       headerTitle: () => <CustomHeader />,
  //     });
  //   }, []);
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
          style={{ width: '80%', color: colors.placeHolder, borderRadius: 20 }}
        />
        <View
          style={{
            backgroundColor: colors.secondary,
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 15,
            height: 42,
            width: 48,
            marginLeft: 10,
          }}
        >
          <SvgImport svg={SettingIcon} style={{ alignSelf: 'center' }} />
        </View>
        {/* seatch bar icon out */}
      </View>
      {/* Categories In */}
      <View style={{ marginTop: 10, paddingLeft: 10 }}>
        <MyText style={{ fontSize: 24, fontWeight: '700' }}>Categories</MyText>
        <View style={{ width: '100%', marginTop: 10 }}>
          <FlatList
            horizontal
            data={catgeories}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <HomeCategories
                svg={item.icon}
                title={item.text}
                style={{
                  marginLeft: index != 0 ? 35 : 0,
                }}
              />
            )}
          />
        </View>
      </View>
      {/* Categories Out */}
      {/* popular In */}
      <View style={{ marginTop: '8%', paddingLeft: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 4,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: '700' }}>Recents</Text>
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
            renderItem={({ item, index }) => (
              <HomePopular
                Src={item.src}
                title={item.title}
                Logo={Logo}
                raisedFunds={item.raisedFunds}
                minInv={item.minInv}
                ShareHolders={item.ShareHolders}
                style={{
                  marginLeft: index != 0 ? 20 : 0,
                  width: 200,
                }}
              />
            )}
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
          <MyText style={{ fontSize: 24, fontWeight: '700' }}>Popular</MyText>
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
            renderItem={({ item, index }) => (
              <HomePopular
                Src={item.src}
                title={item.title}
                Logo={Logo}
                raisedFunds={item.raisedFunds}
                minInv={item.minInv}
                ShareHolders={item.ShareHolders}
                style={{
                  marginLeft: index != 0 ? 20 : 0,
                  width: 200,
                }}
              />
            )}
          />
        </View>
      </View>

      {/* Recents Out */}
    </ScrollView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  // container : {
  //     flex:1,
  // }
})
