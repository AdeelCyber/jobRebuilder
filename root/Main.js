import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
// import SignIn from "./Screens/SignIn";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import Context from "../root/Context/Context";
import PinkButton from "./Components/PinkButton";
import SignIn from "./Screens/SignIn";
import Signup from "./Screens/Signup";
import Offset from "./GlobalStyles/Offset";

//screens
import Home from "./Screens/campaignHomeScreen/Home";
import SettingScreen from "./Screens/Profile/Settings/SettingScreen";
import ProfileScreen from "./Screens/Profile/ProfileScreen";
import JobRequestScreen from "./Screens/Profile/JobRequestScreen";
import PaymentMethodScreen from "./Screens/Profile/PaymentMethodScreen";
import ChangeEmailScreen from "./Screens/Profile/Settings/ChangeEmailScreen";
import ChangePhoneNumberScreen from "./Screens/Profile/Settings/ChangePhoneNumberScreen";
import ChangePasswordScreen from "./Screens/Profile/Settings/ChangePasswordScreen";
import DeleteAccountScreen from "./Screens/Profile/Settings/DeleteAccountScreen";
import FinancialReportScreen from "./Screens/Profile/FinancialReport/FinancialReportScreen";
import AddFinancialScreen from "./Screens/Profile/FinancialReport/AddFinancialScreen";
import CampaignMenu from "./Screens/campaignHomeScreen/CampaignMenu";
import OverView from "./Screens/campaignHomeScreen/CampaignOverview";
import PartnerShipTerms from "./Screens/campaignHomeScreen/PartnerShipTerms";
import TeamRoles from "./Screens/campaignHomeScreen/TeamRoles";
import EditRoles from "./Screens/campaignHomeScreen/EditRoles";
import AddRoles from "./Screens/campaignHomeScreen/AddRole";
import AddMileStone from "./Screens/campaignHomeScreen/AddMileStone";
import MileStone from "./Screens/campaignHomeScreen/MileStone";
import PitchDeck from "./Screens/campaignHomeScreen/PitchDeck";
import Team from "./Screens/campaignHomeScreen/Team";
import Todo from "./Screens/campaignHomeScreen/ToDo";
//screens out

//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//Navigation out

// Creating Stacks
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// All stack Pages goes here
const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Todo"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CampaignHome" component={CampaignHome} />
      <Stack.Screen name="CampaignMenu" component={CampaignMenu} />
      <Stack.Screen name="OverView" component={OverView} />
      <Stack.Screen name="PartnerShipTerms" component={PartnerShipTerms} />
      <Stack.Screen name="TeamRoles" component={TeamRoles} />
      <Stack.Screen name="EditRoles" component={EditRoles} />
      <Stack.Screen name="AddRoles" component={AddRoles} />
      <Stack.Screen name="MileStone" component={MileStone} />
      <Stack.Screen name="AddMileStone" component={AddMileStone} />
      <Stack.Screen name="PitchDeck" component={PitchDeck} />
      <Stack.Screen name="Team" component={Team} />
      <Stack.Screen name="Todo" component={Todo} />
      <Stack.Screen name="ViewMileStone" component={ViewMileStone} />
      <Stack.Screen name="EditMileStone" component={EditMileStone} />
      <Stack.Screen name="TodoTaskView" component={TodoTaskView} />
      <Stack.Screen name="AddNewTask" component={AddNewTask} />
      <Stack.Screen name="TeamWarnings" component={TeamWarnings} />
      <Stack.Screen name="Warnings" component={Warnings} />
      <Stack.Screen name="CampaignManagement" component={CampaignManagement} />
      <Stack.Screen name="ManagingCampaign" component={ManagingCampaign} />

      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="JobRequests" component={JobRequestScreen} />
      <Stack.Screen name="FinancialReport" component={FinancialReportScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
      <Stack.Screen name="AddFinancialDetail" component={AddFinancialScreen} />

      <Stack.Screen
        name="ActiveOrderDetail"
        component={ActiveOrderDetailScreen}
      />
      <Stack.Screen name="CancelledOrders" component={CancelledOrdersScreen} />
      <Stack.Screen
        name="CompletedOrderDetail"
        component={CompletedOrderDetailScreen}
      />
      <Stack.Screen
        name="ChangePhoneNumber"
        component={ChangePhoneNumberScreen}
      />

      <Stack.Screen
        name="CancelledOrderDetail"
        component={CancelledOrderDetailScreen}
      />
      <Stack.Screen
        name="PendingOrderDetail"
        component={PendingOrderDetailScreen}
      />

      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      <Stack.Screen name="MyOrders" component={OrdersScreen} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="ManageJobs" component={ManageJobsScreen} />
      <Stack.Screen name="DeliverProject" component={DeliverProjectScreen} />
      <Stack.Screen name="AppliedJobs" component={AppliedJobsScreen} />
      <Stack.Screen name="FreelancerWarnings" component={WarningsScreen} />
      <Stack.Screen name="PaymentAccounts" component={PaymentAccountsScreen} />

      <Stack.Screen
        name="WarningDetail"
        component={WarningReasonDetailScreen}
      />

      <Stack.Screen
        name="FreelancerProfile"
        component={FreelancerProfileScreen}
      />
      <Stack.Screen
        name="FreelancerDashboard"
        component={FreelancerDashboardScreen}
      />
      <Stack.Screen name="Earnings" component={FreelancerEarningsScreen} />
      <Stack.Screen
        name="EarningsRecords"
        component={FreelancerEarningRecordScreen}
      />
      <Stack.Screen
        name="ExploreFreelancers"
        component={ExploreFreelancerScreen}
      />
    </Stack.Navigator>
  );
};

// All bottom tabs pages goes here
const MyBottomTabs = () => {
  return <Tab.Navigator></Tab.Navigator>;
};

const Main = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <SafeAreaView
      style={[
        Offset.AndroidSafeArea,
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar style="auto" />
      {/* <SignIn /> */}
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth:1,
    // backgroundColor: "#fff",

    // alignItems: "center",
    // justifyContent: "center",
  },
});
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
