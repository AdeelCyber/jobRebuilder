// TeamMembersCampaign
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useState, useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import tick from "../../assets/Svgs/Tick";
import SvgImport from "./SvgImport";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const TeamMembersCampaign = ({ designation, image, text, ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [open, setopen] = useState(false);
  const [select, setselected] = useState(true);
  return (
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
          source={{ uri: image }}
          style={{ width: 35, height: 35, borderRadius: 20, marginRight: 8 }}
        />
        <View>
          <MyText
            style={{ color: colors.text, fontSize: 14, fontWeight: "500" }}
          >
            {text}
          </MyText>

          <MyText
            style={{
              color: "#232323AB",
              fontSize: 10,
              fontSize: 11,
              fontWeight: "500",
            }}
          >
            {designation}
          </MyText>
        </View>
      </View>
      {/* 2 */}
      <View>
        <Feather name="more-vertical" size={24} color="#A1A1A1" />
      </View>
    </View>
  );
};

export default TeamMembersCampaign;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
