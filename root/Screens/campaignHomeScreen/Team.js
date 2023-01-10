import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";

import React, { useContext, useState } from "react";
import Context from "../../Context/Context";
import CustomHeader2 from "../../Components/CustomHeader2";
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import MyText from "../../Components/Text";
import CampaignCard from "../../Components/CampaignCard";
import logo from "../../../assets/Svgs/MotoMobileLogo";
import Thumbnail from "../../../assets/img/Thumbnail.png";
import LittleNav from "../../Components/LittleNav";
import TickPara from "../../Components/TickPara";
import { Feather } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";
import DynamicButton from "../../Components/DynamicButton";
import TeamItem from "../../Components/TeamItem";

const Team = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  function handlePress(text) {
    alert(text);
  }
  const menu = [
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Designer",
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Designer",
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
    },
  ];

  return (
    // main container
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      {/* header */}
      <CustomHeader2
        icon={() => <Feather name="menu" size={24} color={colors.black} />}
        Title="Team"
        nav={navigation}
      />
      {/* header out */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {menu.map(({ image, text, designation }, index) => (
          <TeamItem
            key={text}
            style={{
              marginVertical: 10,
              width: "45%",
              minWidth: "45%",
              maxWidth: "45%",
              marginRight: index % 2 === 0 ? 11 : 0,
            }}
            handleClick={handlePress}
            image={image}
            text={text}
            designation={designation}
          />
        ))}
      </View>
    </View>
  );
};

export default Team;

const styles = StyleSheet.create({});
