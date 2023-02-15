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

//screens out

//Navigation

import OtpScreen from './Screens/StartScreens/OtpScreen'
import CheckoutSheet from './Screens/Chat/paymentsheet'
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
//Navigation out

// Creating Stacks
const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()

// All stack Pages goes here
const MyStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName='StartScreen'
        screenOptions={{ headerShown: false }}
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
        <Stack.Screen name='CampaignMenu' component={CampaignMenu} />
        <Stack.Screen name='OverView' component={OverView} />
        <Stack.Screen name='PartnerShipTerms' component={PartnerShipTerms} />
        <Stack.Screen name='TeamRoles' component={TeamRoles} />
        <Stack.Screen name='EditRoles' component={EditRoles} />
        <Stack.Screen name='AddRoles' component={AddRoles} />
        <Stack.Screen name='MileStone' component={MileStone} />
        <Stack.Screen name='AddMileStone' component={AddMileStone} />
        <Stack.Screen name='PitchDeck' component={PitchDeck} />
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
        <Stack.Screen name='StartScreen' component={StartScreen} />
        <Stack.Screen name='LoginScreen' component={Login} />
        <Stack.Screen name='CreateAccount' component={CreateAccount} />

        <Stack.Screen name='Message' component={Message} />
        <Stack.Screen name='MessageBox' component={MessageBox} />
        <Stack.Screen name='MessagesBox' component={MessagesBox} />
        <Stack.Screen name='NewMessage' component={NewMessage} />

        <Stack.Screen name='CreateGroup' component={CreateGroup} />
        <Stack.Screen name='CreatingGroup' component={CreatingGroup} />
        <Stack.Screen name='CreatingGroup1' component={CreatingGroup1} />
        <Stack.Screen name='GroupChat' component={GroupChat} />
        <Stack.Screen name='CustomOffer' component={CustomOffer} />
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

        <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} />
        <Stack.Screen name='DeleteAccount' component={DeleteAccountScreen} />
        <Stack.Screen name='Dashboard' component={DashboardScreen} />

        <Stack.Screen name='MyOrders' component={OrdersScreen} />
        <Stack.Screen name='Explore' component={ExploreScreen} />
        <Stack.Screen name='ManageJobs' component={ManageJobsScreen} />
        <Stack.Screen name='DeliverProject' component={DeliverProjectScreen} />
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
}

// All bottom tabs pages goes here
const MyBottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='HomeService' component={HomeService} />
      <Tab.Screen name='GroupChat' component={GroupChat} />
      <Tab.Screen name='Dashboard' component={DashboardScreen} />
      <Tab.Screen name='CampaignHome' component={CampaignHome} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const Main = () => {
  const {
    theme: { colors },
  } = useContext(Context)
  const { accessToken, socket, setsocket, userdetails, userTab, setUserTab } =
    useContext(CartProvider)

  const startsocket = useCallback(
    (accessToken) => {
      setsocket(
        io('https://stepdev.up.railway.app', {
          autoConnect: false,
          extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      )
    },
    [socket]
  )

  useEffect(() => {
    startsocket(accessToken)
    console.log(userdetails)
  }, [accessToken])

  return (
    <SafeAreaView
      style={[
        Offset.AndroidSafeArea,
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar style='auto' />
      {/* <SignIn /> */}
      <NavigationContainer>
        <MyStack />
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
// text boxes in edit screen
// Role Title ?  +  padding
// Correct header
// mileStone plus more icon color
// Add mile Stone ? include
// Ceo in Cards
// ViewMile Stone padding
// team roles padding + border radius  , paddingVertical in first input
// TodoTaskView
// Horizontal Calendar line
