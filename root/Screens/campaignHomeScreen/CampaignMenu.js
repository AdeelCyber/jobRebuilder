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

const CampaignMenu = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);

  const [handlePress, setHandlePress] = useState("");

  return (
    // main container
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      {/* header */}
      <CustomHeader2 nav={navigation} />
      {/* header out */}
      {/* card in */}
      <CampaignCard
        title={"MotoMobiles"}
        niche={"Mobile Making and selling company."}
        Logo={logo}
        Thumbnail={Thumbnail}
      />
      {/* card out */}
      {/* Little nav in */}
      <LittleNav
        style={{ marginTop: 10 }}
        title={"Milestones"}
        chevron={true}
      />
      {/* Little nav out */}
      <View>
        {/* 1 */}
        <Pressable
          onPress={() => navigation.navigate("OverView")}
          style={{
            backgroundColor: colors.listback,
            paddingVertical: 15,
            paddingHorizontal: 18,
          }}
        >
          <MyText
            style={{ color: colors.lighttext, fontWeight: "500", fontSize: 16 }}
          >
            Overview
          </MyText>
        </Pressable>
        {/* 2 */}
        <Pressable
          onPress={() => navigation.navigate("TeamRoles")}
          style={{
            backgroundColor: colors.listback,
            paddingVertical: 15,
            paddingHorizontal: 18,
          }}
        >
          <MyText
            style={{ color: colors.lighttext, fontWeight: "500", fontSize: 16 }}
          >
            Role
          </MyText>
        </Pressable>
        {/* 3 */}
        <Pressable
          onPress={() => navigation.navigate("PartnerShipTerms")}
          style={{
            backgroundColor: colors.listback,
            paddingVertical: 15,
            paddingHorizontal: 18,
          }}
        >
          <MyText
            style={{ color: colors.lighttext, fontWeight: "500", fontSize: 16 }}
          >
            Partnership Terms
          </MyText>
        </Pressable>
      </View>
      {/* Little nav in */}
      <LittleNav
        title={"Milestones"}
        hamburger={false}
        style={{ paddingHorizontal: 12 }}
      />
      {/* Little nav out */}
      <Pressable
        onPress={() => navigation.navigate("PitchDeck")}
        style={{
          backgroundColor: colors.listback,
          paddingVertical: 15,
          paddingHorizontal: 18,
        }}
      >
        <MyText
          style={{ color: colors.lighttext, fontWeight: "500", fontSize: 16 }}
        >
          Pitch deck
        </MyText>
      </Pressable>
    </ScrollView>
  );
};

export default CampaignMenu;

const styles = StyleSheet.create({});
