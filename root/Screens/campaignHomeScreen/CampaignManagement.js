import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native'

import React, { useContext, useState, useEffect } from 'react'
import Context from '../../Context/Context'

import CustomHeader2 from '../../Components/CustomHeader2'
import Logo from '../../../assets/Svgs/Logo'
import Buildings from '../../../assets/img/Buildings.png'

import CampaignPopular from '../../Components/CampaignPopular'
import { getStartups } from '../Profile/services/FreeLancerServices'
import CartContext from '../../Context/CartProvider'
import Loader from '../../Components/Loader'
import MyText from '../../Components/Text'
import Error from '../../Components/Error'

const CampaignManagement = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context)

  function handlePress(text) {
    alert(text)
  }
  const [MileStones, setMileStone] = useState('')
  const [popularCards, setPopularCards] = useState([
    {
      src: Buildings,
      businessName: 'Beyond',
      desc: '',
      Stage: 'Idea',
      Team: 'Complete',
      Budget: 2560,
      status: 'Approved',
    },
    {
      src: Buildings,
      title: 'Beyond',
      desc: '',
      Stage: 'Idea',
      Team: 'Complete',
      Budget: 2560,
      status: 'Pending',
    },
    {
      src: Buildings,
      title: 'Beyond',
      desc: '',
      Stage: 'Idea',
      Team: 'Complete',
      Budget: 2560,
      status: 'Draft',
    },
  ])
  // console.log(popularCards);
  const [loaded, setLoaded] = useState(false)

  // Api call
  useEffect(() => {
    const getFreelancersData = async () => {
      const resp = await getStartups()
      // console.log(resp.data);
      if (resp.data.status === 'OK') {
        // console.log("done");
        setPopularCards(resp.data.startUps)
        // userDetails.setmilestone(resp.data.startUps);
        setLoaded(true)
      }
    }

    getFreelancersData()
  }, [])
  const userDetails = useContext(CartContext)
  // console.log(userDetails.userdetails.role);
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (userDetails.userdetails.role === 'Startup Owner') {
      setShow(true)
    }
  }, [])
  return loaded ? (
    // main container
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <CustomHeader2
        Title='Campaign Management'
        style={{ elevation: 0 }}
        nav={navigation}
      />
      {popularCards.length !== 0 ? (
        <FlatList
          data={popularCards}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{}}
          renderItem={({ item, index }) => (
            <CampaignPopular
              Src={Buildings}
              title={item.businessName}
              Logo={item.logo}
              Stage={item.stage}
              Team={'Complete'}
              Budget={item.budget}
              status={item.status}
              navigation={navigation}
              label={item.category}
              show={show}
              id={item._id}
              style={{
                width: '90%',
                marginHorizontal: 23,
                marginVertical: 14,
              }}
            />
          )}
        />
      ) : (
        <View style={{ marginTop: 300 }}>
          <Error message='No Campaigns Found' />
        </View>
      )}
    </View>
  ) : (
    <Loader visible={!loaded} color='white' indicatorSize='large' />
  )
}

export default CampaignManagement

const styles = StyleSheet.create({})
