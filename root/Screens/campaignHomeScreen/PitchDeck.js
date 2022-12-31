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
import pdf from "../../../assets/Svgs/pdf";

const PitchDeck = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  function handlePress(text) {
    alert(text);
  }
  const [MileStones, setMileStone] = useState("");
  return (
    // main container
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",

          height: "100%",
        }}
      >
        <View>
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
          {/* Little nav in */}
          <LittleNav style={{ marginTop: 10 }} title={"Pitch Deck"} />
          {/* Little nav out */}
          {/* Upload View */}

          <View style={{ padding: 20 }}>
            <Pressable
              style={{
                backgroundColor: "#30F2F852",
                padding: 20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                flexDirection: "row",
              }}
              onPress={() => handlePress("download")}
            >
              <SvgImport svg={pdf} />
              <MyText
                style={{ color: "#232323B0", fontSize: 16, fontWeight: "500" }}
              >
                Download in PDF
              </MyText>
            </Pressable>
          </View>

          {/* Updload Out */}
        </View>

        {/* Buttons in */}
        {/* Buttons View In */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 10,
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <DynamicButton
            handlePress={handlePress}
            text={"Cancel"}
            color={"#FF0000"}
            textStyle={{ color: colors.white }}
            style={{ width: "48%", borderRadius: 15 }}
          />
          <DynamicButton
            handlePress={handlePress}
            text={"Updload New"}
            color={colors.text}
            textStyle={{ color: colors.white }}
            style={{ width: "48%", borderRadius: 15 }}
          />
        </View>
      </View>

      {/* Buttons out */}
    </View>
  );
};

export default PitchDeck;

const styles = StyleSheet.create({});
