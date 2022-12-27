import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

import React, { useContext, useState } from "react";
import Context from "../../Context/Context";
import CustomHeader2 from "../../Components/CustomHeader2";
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import MyText from "../../Components/Text";
import CampaignCard from "../../Components/CampaignCard";
import logo from "../../../assets/Svgs/MotoMobileLogo";
import Thumbnail from "../../../assets/img/Thumbnail.png";
const CampaignMenu = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    // main container
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      {/* header */}
      <CustomHeader2 />
      {/* header out */}
      {/* card in */}
      <CampaignCard
        title={"MotoMobiles"}
        niche={"Mobile Making and selling company."}
        Logo={logo}
        Thumbnail={Thumbnail}
      />
      {/* card out */}
    </ScrollView>
  );
};

export default CampaignMenu;

const styles = StyleSheet.create({});
