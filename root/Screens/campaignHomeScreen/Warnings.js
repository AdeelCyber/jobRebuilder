import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";

import React, { useContext, useState } from "react";
import Context from "../../Context/Context";
import CustomHeader2 from "../../Components/CustomHeader2";
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import MyText from "../../Components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DynamicButton from "../../Components/DynamicButton";
import calender from "../../../assets/Svgs/Calender";
import questionMark from "../../../assets/Svgs/QuestionMark";
import Link from "../../../assets/Svgs/Link";
import magnifine from "../../../assets/Svgs/GreyMagnifine";
import { SearchBar } from "react-native-paper";
import TeamMember from "../../Components/TeamMember";
import TeamMemberWarning from "../../Components/TeamMemberWarning";
import WarningHistoryComp from "../../Components/WarningHistory";

const Warnings = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const TeamWarning = {
    image: "https://bit.ly/kent-c-dodds",
    text: "Mike Dean",
    designation: "Ceo",
  };

  function handlePress(text) {
    alert(text);
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 23,
      }}
    >
      {/* header in */}
      <View
        style={[
          {
            flexDirection: "row",
            backgroundColor: colors.white,
            paddingVertical: 15,
            paddingHorizontal: 14,
            borderRadius: 10,
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.shadow,
          { ...props.style },
        ]}
      >
        {/* 1 */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: TeamWarning.image }}
            style={{ width: 35, height: 35, borderRadius: 20, marginRight: 8 }}
          />
          <View>
            <MyText
              style={{ color: colors.text, fontSize: 14, fontWeight: "500" }}
            >
              {TeamWarning.text}
            </MyText>

            <MyText
              style={{
                color: "#232323AB",
                fontSize: 10,
                fontSize: 11,
                fontWeight: "500",
              }}
            >
              {TeamWarning.designation}
            </MyText>
          </View>
        </View>
        {/* 2 */}
        <View
          style={{
            height: 25,
            width: 25,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            backgroundColor: colors.Red,
          }}
        >
          <MyText style={{ color: colors.white, fontWeight: "500" }}></MyText>
        </View>
      </View>
      {/* header out */}
    </View>
  );
};

export default Warnings;

const styles = StyleSheet.create({});
