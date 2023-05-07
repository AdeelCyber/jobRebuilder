import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
// import SignIn from "./Screens/SignIn";
import React, { useContext, useEffect, useCallback } from 'react'
import { StatusBar } from 'expo-status-bar'
import Context from '../root/Context/Context'
import PinkButton from './Components/PinkButton'
import SignIn from './Screens/SignIn'
import Signup from './Screens/Signup'
import Offset from './GlobalStyles/Offset'
import initializeSocket from './hooks/sockethook'
//screens
import CampaignHome from './Screens/campaignHomeScreen/CampaignHome'
import SettingScreen from './Screens/Profile/Settings/SettingScreen'
import ProfileScreen from './Screens/Profile/ProfileScreen'
import JobRequestScreen from './Screens/Profile/Job/JobRequestScreen'
import PaymentMethodScreen from './Screens/Profile/PaymentMethodScreen'
import ChangeEmailScreen from './Screens/Profile/Settings/ChangeEmailScreen'
import ChangePhoneNumberScreen from './Screens/Profile/Settings/ChangePhoneNumberScreen'
import ChangePasswordScreen from './Screens/Profile/Settings/ChangePasswordScreen'
import DeleteAccountScreen from './Screens/Profile/Settings/DeleteAccountScreen'
import FinancialReportScreen from './Screens/Profile/FinancialReport/FinancialReportScreen'
import AddFinancialScreen from './Screens/Profile/FinancialReport/AddFinancialScreen'
import CampaignMenu from './Screens/campaignHomeScreen/CampaignMenu'
import OverView from './Screens/campaignHomeScreen/CampaignOverview'
import PartnerShipTerms from './Screens/campaignHomeScreen/PartnerShipTerms'
import TeamRoles from './Screens/campaignHomeScreen/TeamRoles'
import EditRoles from './Screens/campaignHomeScreen/EditRoles'
import AddRoles from './Screens/campaignHomeScreen/AddRole'
import AddMileStone from './Screens/campaignHomeScreen/AddMileStone'
import MileStone from './Screens/campaignHomeScreen/MileStone'
import PitchDeck from './Screens/campaignHomeScreen/PitchDeck'
import Team from './Screens/campaignHomeScreen/Team'
import Todo from './Screens/campaignHomeScreen/ToDo'
import StartScreen from './Screens/StartScreens/StartScreen'
import Login from './Screens/StartScreens/Login'
import CreateAccount from './Screens/StartScreens/Createaccount'
import Message from './Screens/Chat/Message'
import MessageBox from './Screens/Chat/MessageBox'
import CreateGroup from './Screens/Chat/CreateGroup'
import CreatingGroup from './Screens/Chat/CreatingGroup'
import CreatingGroup1 from './Screens/Chat/CreatingGroup1'
import GroupChat from './Screens/Chat/GroupChat'
import BuildingStartupScreen1 from './Screens/BuildingStartup/BuildingStartupScreen1'
import Progress from './Screens/CreatingProfile/Progress'
import HomeService from './Screens/HomeProfile/HomeService'
import EditService from './Screens/HomeProfile/EditService'
import Portfolio from './Screens/HomeProfile/Portfolio'
import ViewPortfolio from './Screens/HomeProfile/ViewPortfolio'
import EditProfile from './Screens/HomeProfile/EditProfile'
import CustomOffer from './Screens/Chat/CustomOffer'
import { io } from 'socket.io-client'
import OtpScreen2 from './Screens/StartScreens/OtpScreen2'
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Font from 'expo-font'

//screens out

//Navigation

import ExploreAll from './Screens/Profile/ExploreAll'
import Forget from './Screens/StartScreens/Forget'
import OtpScreen from './Screens/StartScreens/OtpScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import EditPortfolio from './Screens/HomeProfile/EditPortfolio'
import DashboardScreen from './Screens/Profile/Dashboard/DashboardScreen'
import ActiveOrderDetailScreen from './Screens/Profile/Orders/ActiveOrderDetailScreen'
import CancelledOrdersScreen from './Screens/Profile/Orders/CancelledOrdersScreen'
import CompletedOrderDetailScreen from './Screens/Profile/Orders/CompletedOrderDetailScreen'
import CancelledOrderDetailScreen from './Screens/Profile/Orders/CancelledOrderDetailScreen'
import PendingOrderDetailScreen from './Screens/Profile/Orders/PendingOrderDetailScreen'
import OrdersScreen from './Screens/Profile/Orders/OrdersScreen'
import ExploreScreen from './Screens/Profile/ExploreScreen'
import ManageJobsScreen from './Screens/Profile/Freelancer/ManageJobsScreen'
import DeliverProjectScreen from './Screens/Profile/Freelancer/DeliverProjectScreen'
import AppliedJobsScreen from './Screens/Profile/Freelancer/AppliedJobsScreen'
import WarningsScreen from './Screens/Profile/Freelancer/WarningsScreen'
import PaymentAccountsScreen from './Screens/Profile/PaymentAccountsScreen'
import WarningReasonDetailScreen from './Screens/Profile/Freelancer/WarningReasonDetailScreen'
import FreelancerProfileScreen from './Screens/Profile/FreelancerProfileScreen'
import FreelancerDashboardScreen from './Screens/Profile/Freelancer/FreelancerDashboardScreen'
import FreelancerEarningsScreen from './Screens/Profile/Freelancer/FreelancerEarningScreen'
import FreelancerEarningRecordScreen from './Screens/Profile/Freelancer/FreelancerEarningRecordScreen'
import ExploreFreelancerScreen from './Screens/Profile/Freelancer/ExploreFreelancerScreen'
import ViewMileStone from './Screens/campaignHomeScreen/ViewMileStone'
import EditMileStone from './Screens/campaignHomeScreen/EditMileStone'
import TodoTaskView from './Screens/campaignHomeScreen/TodoTaskView'
import AddNewTask from './Screens/campaignHomeScreen/AddNewTask'
import TeamWarnings from './Screens/campaignHomeScreen/TeamWarnings'
import Warnings from './Screens/campaignHomeScreen/Warnings'
import CampaignManagement from './Screens/campaignHomeScreen/CampaignManagement'
import ManagingCampaign from './Screens/campaignHomeScreen/ManagingCampaign'
import MessagesBox from './Screens/Chat/MessagesBox'
import TabBar from './Components/TabBar'
import NewMessage from './Screens/Chat/NewMessage'
import CartProvider from './Context/CartProvider'
import EditTask from './Screens/campaignHomeScreen/EditTask'
import FreeLancerProfile from './Screens/Hiring/FreelancerProfile'
import ViewPortfolioScreen from './Screens/Hiring/ViewPortfolio'
import FreelancerTabBar from './Components/FreelancerTabBar'
import AvailableJobs from './Screens/Profile/Vacancy/AvailableJobs'
import JobCareerDetailScreen from './Screens/Profile/Vacancy/JobCareerDetailScreen'
import UserTabBar from './Components/UserTabBar'
import ChangeProfileScreen from './Screens/Profile/ChangeProfileScreen'
import CheckoutSheet from './Screens/Chat/paymentsheet'
import CartContext from './Context/CartProvider'
import axios from './http/axiosSet'
import AmountSpendScreen from './Screens/Profile/Dashboard/AmountSpentScreen'
import PaymentLinkStatus from "./Screens/Profile/Freelancer/PaymentLinkStatus";
import StripeWebView from "./Screens/Profile/Freelancer/StripeWebView";
import ActiveJobDetailScreen from "./Screens/Profile/Freelancer/ActiveJobDetailScreen";
import ViewAll from "./Screens/campaignHomeScreen/viewAll";
//Navigation outA

// Creating Stacks
const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()

// All stack Pages goes here
const MyStack = (props) => {
  console.log('props', props.screen)

  if (!props.bool) {
    return null
  }
  return (
    props.bool && (
      <>
        <Stack.Navigator
          initialRouteName={props.screen.current}
          screenOptions={{ headerShown: false}}

        >
          <Stack.Screen name='CampaignHome' component={CampaignHome} />
          <Stack.Screen
            name='CampaignManagement'
            component={CampaignManagement}
          />
          <Stack.Screen name='AvailableJobs' component={AvailableJobs} />
          <Stack.Screen
            name='JobCareerDetailScreen'
            component={JobCareerDetailScreen}
          />

          <Stack.Screen name='ManagingCampaign' component={ManagingCampaign} />
          <Stack.Screen name='ExploreAll' component={ExploreAll} />
          <Stack.Screen name='viewAll' component={ViewAll}
                        options={{
                            animationEnabled: false,
                            animation:"none"
                        }}
          />
          <Stack.Screen name='ChangeProfile' component={ChangeProfileScreen} />

          <Stack.Screen
            name='CampaignMenu'
            component={CampaignMenu}
            options={{
              animationEnabled: false,
              animation:"none"
            }}
          />
          <Stack.Screen name='OverView' component={OverView}
                        options={{
                          animationEnabled: false,
                          animation:"none"
                        }}
          />
          <Stack.Screen name='PartnerShipTerms' component={PartnerShipTerms}
                        options={{
                          animationEnabled: false,
                          animation:"none"
                        }}
          />
          <Stack.Screen name='TeamRoles' component={TeamRoles}
                        options={{
                          animationEnabled: false,
                          animation:"none"
                        }}
          />
          <Stack.Screen name='EditRoles' component={EditRoles}
                        options={{
                          animationEnabled: false,
                          animation:"none"
                        }}
          />
          <Stack.Screen name='AddRoles' component={AddRoles} options={{
            animationEnabled: false,
            animation:"none"
          }} />
          <Stack.Screen name='MileStone' component={MileStone} options={{
            animationEnabled: false,
            animation:"none"
          }} />
          <Stack.Screen name='AddMileStone' component={AddMileStone} options={{
            animationEnabled: false,
            animation:"none"
          }} />
          <Stack.Screen name='PitchDeck' component={PitchDeck} options={{
            animationEnabled: false,
            animation:"none"
          }} />
          <Stack.Screen name='Team' component={Team} />
          <Stack.Screen name='Todo' component={Todo} />
          <Stack.Screen name='ViewMileStone' component={ViewMileStone} />
          <Stack.Screen name='EditMileStone' component={EditMileStone} />
          <Stack.Screen name='TodoTaskView' component={TodoTaskView} />
          <Stack.Screen name='AddNewTask' component={AddNewTask} />
          <Stack.Screen name='TeamWarnings' component={TeamWarnings} />
          <Stack.Screen name='Warnings' component={Warnings} />
          <Stack.Screen name='EditTask' component={EditTask} />

          <Stack.Screen name='SignIn' component={SignIn} />
          <Stack.Screen name='SignUp' component={Signup} />
          <Stack.Screen name='Settings' component={SettingScreen} />
          <Stack.Screen name='Profile' component={ProfileScreen} />
          <Stack.Screen name='JobRequests' component={JobRequestScreen} />
          <Stack.Screen
            name='FinancialReport'
            component={FinancialReportScreen}
          />
          <Stack.Screen name='PaymentMethod' component={PaymentMethodScreen} />
          <Stack.Screen name='ChangeEmail' component={ChangeEmailScreen} />
          <Stack.Screen
            name='AddFinancialDetail'
            component={AddFinancialScreen}
          />

          <Stack.Screen name='AmountSpent' component={AmountSpendScreen} />

          <Stack.Screen name='StartScreen' component={StartScreen} />
          <Stack.Screen name='LoginScreen' component={Login} />
          <Stack.Screen name='CreateAccount' component={CreateAccount} />
          <Stack.Screen name='OtpScreen' component={OtpScreen} />
          <Stack.Screen name='OtpScreen2' component={OtpScreen2} />
          <Stack.Screen name='Forget' component={Forget} />

          <Stack.Screen name='Message' component={Message} />
          <Stack.Screen name='MessageBox' component={MessageBox} />
          <Stack.Screen name='MessagesBox' component={MessagesBox} />
          <Stack.Screen name='NewMessage' component={NewMessage} />

          <Stack.Screen name='CreateGroup' component={CreateGroup} />
          <Stack.Screen name='CreatingGroup' component={CreatingGroup} />
          <Stack.Screen name='CreatingGroup1' component={CreatingGroup1} />
          <Stack.Screen name='GroupChat' component={GroupChat} />
          <Stack.Screen name='CustomOffer' component={CustomOffer} />
          <Stack.Screen name='CheckoutSheet' component={CheckoutSheet} />

          <Stack.Screen
            name='ViewDetailPorfolio'
            component={ViewPortfolioScreen}
          />

          <Stack.Screen
            name='BuildingStartupScreen1'
            component={BuildingStartupScreen1}
          />

          <Stack.Screen name='ProgressScreen' component={Progress} />

          <Stack.Screen name='HomeService' component={HomeService} />
          <Stack.Screen name='EditService' component={EditService} />
          <Stack.Screen name='Portfolio' component={Portfolio} />
          <Stack.Screen name='ViewPortfolio' component={ViewPortfolio} />
          <Stack.Screen name='EditProfile' component={EditProfile} />
          <Stack.Screen name='EditPortfolio' component={EditPortfolio} />

          <Stack.Screen
            name='ActiveOrderDetail'
            component={ActiveOrderDetailScreen}
          />
          <Stack.Screen
            name='ActiveJobDetail'
            component={ActiveJobDetailScreen}
          />
          <Stack.Screen
            name='CancelledOrders'
            component={CancelledOrdersScreen}
          />
          <Stack.Screen
            name='CompletedOrderDetail'
            component={CompletedOrderDetailScreen}
          />
          <Stack.Screen
            name='ChangePhoneNumber'
            component={ChangePhoneNumberScreen}
          />

          <Stack.Screen
            name='CancelledOrderDetail'
            component={CancelledOrderDetailScreen}
          />
          <Stack.Screen
            name='PendingOrderDetail'
            component={PendingOrderDetailScreen}
          />

          <Stack.Screen
            name='ChangePassword'
            component={ChangePasswordScreen}
          />
          <Stack.Screen name='DeleteAccount' component={DeleteAccountScreen} />
          <Stack.Screen name='Dashboard' component={DashboardScreen} />

          <Stack.Screen name='MyOrders' component={OrdersScreen} />
          <Stack.Screen name='Explore' component={ExploreScreen} />
          <Stack.Screen name='ManageJobs' component={ManageJobsScreen} />
          <Stack.Screen
            name='DeliverProject'
            component={DeliverProjectScreen}
          />
          <Stack.Screen name='AppliedJobs' component={AppliedJobsScreen} />
          <Stack.Screen name='FreelancerWarnings' component={WarningsScreen} />
          <Stack.Screen
            name='PaymentAccounts'
            component={PaymentAccountsScreen}
          />

          <Stack.Screen
            name='WarningDetail'
            component={WarningReasonDetailScreen}
          />

          <Stack.Screen
            name='FreelancerProfile'
            component={FreelancerProfileScreen}
          />
          <Stack.Screen
            name='FreelancerDashboard'
            component={FreelancerDashboardScreen}
          />
          <Stack.Screen
            name='LinkStatus'
            component={PaymentLinkStatus}
          /><Stack.Screen
            name='StripeWebView'
            component={StripeWebView}
          />
          <Stack.Screen name='Earnings' component={FreelancerEarningsScreen} />
          <Stack.Screen
            name='EarningsRecords'
            component={FreelancerEarningRecordScreen}
          />
          <Stack.Screen
            name='ExploreFreelancers'
            component={ExploreFreelancerScreen}
          />
          <Stack.Screen name='ShowFreelancer' component={FreeLancerProfile} />
        </Stack.Navigator>
      </>
    )
  )
}

// All bottom tabs pages goes here
const MyBottomTabs = () => {
  return (
    <Tab.Navigator  
    screenOptions={{
      tabBarHideOnKeyboard: true
   }}     >
      <Tab.Screen name='HomeService' component={HomeService} />
      <Tab.Screen name='GroupChat' component={GroupChat} />
      <Tab.Screen name='Dashboard' component={DashboardScreen} />
      <Tab.Screen name='CampaignHome' component={CampaignHome} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const Main = () => {
  /////////

  //////
  const {
    theme: { colors },
  } = useContext(Context)
  const { accessToken, socket, setsocket, userdetails, userTab, setUserTab,isComplete,setComplete } =
    useContext(CartProvider)

  const startsocket = () => {
    setsocket(() => {
      const s = io(axios.defaults.baseURL, {
        autoConnect: false,
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log('Socket server', s)
      return s
    })
  }

  useEffect(() => {
    startsocket(accessToken)
    console.log(userdetails)
  }, [])

  ////////////
  const mainScreen = React.useRef('StartScreen')
  const [isLogin, setIsLogin] = React.useState(false)
  const contest = useContext(CartContext)
  const fontsLoaded = {
    DMSANS: require('../assets/fonts/DMSans-Regular.ttf'),
  }

  React.useLayoutEffect(() => {}, [])
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync(fontsLoaded)
        const token = await AsyncStorage.getItem('@accessToken')
        const Refreshtoken = await AsyncStorage.getItem('@refreshToken')
        const user = await AsyncStorage.getItem('@userDetail')
        const isComplete = await AsyncStorage.getItem('@isComplete')
        const userDetail = JSON.parse(user)

        if (token) {
          contest.setaccessToken(token)
          contest.setrefreshToken(Refreshtoken)
          contest.setuserdetails(userDetail)
          console.log('U', userDetail)
          contest.setislogin(true)
        }
        await new Promise((r) => setTimeout(r, 1000))
        if (token !== '') {
          if (userDetail.role === 'Freelancer')
          {
            mainScreen.current = 'HomeService'
            }
          else mainScreen.current = 'CampaignHome'
        }
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setIsLogin(true)
      }
    }

    prepare()
  }, [])
  const onLayoutRootView = useCallback(async () => {
    if (isLogin) {
      await SplashScreen.hideAsync()
    }
  }, [isLogin])

  if (!isLogin) {
    return null
  }

  return (
    <SafeAreaView
      style={[
        Offset.AndroidSafeArea,
        styles.container,
        { backgroundColor: colors.background },
      ]}
      onLayout={onLayoutRootView}
    >
      <StatusBar style='auto' />
      {/* <SignIn /> */}
      <NavigationContainer>
        <MyStack screen={mainScreen} bool={isLogin} />
        {userdetails?.role === 'Freelancer' ? (
          <FreelancerTabBar />
        ) : userdetails?.role?.includes('Startup') ? (
          <TabBar show={accessToken} />
        ) : (
          <UserTabBar show={userTab} />
        )}
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth:1,
    // backgroundColor: "#fff",

    // alignItems: "center",
    // justifyContent: "center",
  },
})
// in Patnership terms heading and fonts
// 18 15 13 managing campaign remove dots and ticks
// Team roles headnings
// Todo headings 3 dots removed
// Calender heading
// Todo Calender heading
// fix warning pop up
