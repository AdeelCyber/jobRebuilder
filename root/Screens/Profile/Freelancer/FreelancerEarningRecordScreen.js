import React, { useContext, useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../Components/CustomHeader2'
import Earning from '../../../Components/Earning'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { getFunds, getWalletDetail } from '../services/walletServices'
import Loader from '../../../Components/Loader'
import Error from '../../../Components/Error'

const FreelancerEarningRecordScreen = () => {
  const navigation = useNavigation()

  const isFocused = useIsFocused()

  const {
    theme: { colors },
  } = useContext(Context)

  const [walletDetail, setWalletDetail] = useState({})
  const [funds, setFunds] = useState([])

  useEffect(() => {
    fetchData()
  }, [isFocused])

  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const resp = await getWalletDetail()
    const resp2 = await getFunds()
    setLoading(false)
    if (resp.status === 200) {
      setWalletDetail(resp.data.data)
      setFunds(resp2.data.data.clearedFunds)

      console.log('wallet', resp.data.data)
    } else if (resp.status === 401 || resp.status === 400) {
      navigation.navigate('LoginScreen')
    }
  }

  const EarningItem = ({ fund }) => (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate('ActiveOrderDetail')
      }}
      style={styles.orderItem}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            backgroundColor: colors.secondary,
            borderRadius: 8,
            width: 53,
            paddingTop: 6,
            paddingBottom: 7,
            paddingHorizontal: 9,
          }}
        >
          <MyText
            style={{ color: colors.white, fontSize: 15, textAlign: 'center' }}
          >
            &nbsp; {new Date(fund.clearedOn).getDay()} &nbsp;
            {new Date(fund.clearedOn)
              .toLocaleString('default', {
                month: 'short',
              })
              .substring(0, 4)}
            {new Date(fund.clearedOn).getFullYear().toString().substr(-2)}
            {/* &nbsp;2&nbsp; Jan 22 */}
          </MyText>
        </View>
        <View
          style={{
            padding: 9,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
            width: '85%',
          }}
        >
          <View>
            <MyText style={{ fontSize: 16 }}>{fund.orderTitle}</MyText>
            <TouchableOpacity
              labelStyle={{ color: '#fff' }}
              disabled={true}
              style={styles.cancelledBadge}
              onPress={() => {}}
            >
              <MyText
                style={{
                  fontSize: 11,
                  color: 'white',
                }}
              >
                Funds Cleared
              </MyText>
            </TouchableOpacity>
          </View>
          <View>
            <MyText style={{ fontSize: 15, textAlign: 'right' }}>
              ${fund.orderAmount}
            </MyText>
            <MyText style={{ fontSize: 15, color: 'rgba(35, 35, 35, 0.7)' }}>
              Amount
            </MyText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader
        nav={navigation}
        Title='Earnings Record'
        style={{ marginBottom: 10 }}
        icon={() => {
          return <Feather name='info' size={20} color='black' />
        }}
      />
      <Loader visible={loading} color='white' indicatorSize='large' />
      {!loading && (
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.background,
              paddingTop: 30,
              padding: 23,
            },
          ]}
        >
          <Earning
            title='Net Income'
            subHeadingsDescriptions={[
              `Earning this month`,
              'Active Jobs',
              'Pending Clearance',
              'Jobs Completed',
            ]}
            style={{ marginTop: 0, marginBottom: 28 }}
            total={walletDetail.netIncome}
            subHeadings={[
              `$ ${walletDetail.earningsThisMonth}`,
              walletDetail.activeJobs,
              `$ ${walletDetail.pendingClearence}`,
              walletDetail.jobsCompleted,
            ]}
          />

          {funds?.length === 0 && (
            <View>
              <Error message='No Funds Found' />
            </View>
          )}

          {funds?.map((fund, index) => {
            return <EarningItem key={index} fund={fund} />
          })}
        </View>
      )}
    </ScrollView>
  )
}

export default FreelancerEarningRecordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  heading: {
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'left',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
  },
  orderItem: {
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 9,
    backgroundColor: 'white',
    shadowColor: '#878787',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 15,
  },

  subheading: {
    textAlign: 'center',
  },

  subheadingdescription: {
    color: 'rgba(35, 35, 35, 0.36);',
  },
  btn: {
    backgroundColor: '#8489FC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 11,
  },
  cancelledBadge: {
    marginTop: 11,
    width: 104,
    backgroundColor: '#13B887',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 15,
  },
})
