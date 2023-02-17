import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CrossSimple from "../../assets/Svgs/CrossSimple";
import CubeIcon from "../../assets/Svgs/CubeIcon";
import MobileIcon from "../../assets/Svgs/MobileIcon";
import RectangleIcon from "../../assets/Svgs/RectangleIcon";
import TabBarBagIcon from "../../assets/Svgs/TabBarBagIcon";
// import { CartProvider } from '../Context/CartProvider'
import SvgImport from "./SvgImport";
import MyText from "./Text";

import { BackHandler } from "react-native";

const icons = [CubeIcon, TabBarBagIcon, MobileIcon, CrossSimple];

const Tab = ({ title, selected, onSelect, index, selectedFun }) => {
  return (
    <View style={[styles.tab, { width: 60 }]}>
      {selected === index && <SvgImport svg={RectangleIcon} />}

      <View
        style={{
          marginTop: selected === index ? 8 : 13,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SvgImport svg={icons[index]} />

        <MyText style={{ marginTop: 4, fontSize: 10 }}>{title}</MyText>
      </View>
    </View>
  );
};
const UserTabBar = (props) => {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState(0);
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    getToken();
  });

  const getToken = async () => {
    const token = await AsyncStorage.getItem("@accessToken");
    if (token) {
      setIsToken(true);
    }
  };

  const goToPage = (index) => {
    if (index === 0) {
      navigation.navigate("Explore");
    } else if (index === 1) {
      navigation.navigate("CampaignHome");
    } else if (index === 2) {
      navigation.navigate("LoginScreen");
    } else if (index === 3) {
      BackHandler.exitApp();
    }
  };

  return (
    <View style={[styles.container, { display: props.show ? "flex" : "none" }]}>
      <TouchableOpacity
        onPress={() => {
          setSelectedTab(0);
          goToPage(0);
        }}
      >
        <Tab
          title="Campaign"
          selected={selectedTab}
          selectedFun={setSelectedTab}
          index={0}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedTab(1);
          goToPage(1);
        }}
      >
        <Tab
          title="Freelancers"
          selected={selectedTab}
          selectedFun={setSelectedTab}
          index={1}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelectedTab(2);
          goToPage(2);
        }}
      >
        <Tab
          title="Signup"
          selected={selectedTab}
          selectedFun={setSelectedTab}
          index={2}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedTab(3);
          goToPage(3);
        }}
      >
        <Tab
          title="Exit"
          selected={selectedTab}
          selectedFun={setSelectedTab}
          index={3}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    height: 60,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#fafafa",
    paddingBottom: 10,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },

  tabTitle: {},
});

export default UserTabBar;
