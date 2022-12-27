import { Image, StyleSheet, Text, View } from "react-native";

import React, { useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SvgImport from "./SvgImport";
import { Entypo } from "@expo/vector-icons";
// import Video from "react-native-video";
const CampaignCard = ({ ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <View>
      {/* card header in */}
      <View
        style={{
          paddingHorizontal: 23,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SvgImport svg={props.Logo} style={{ width: "100%" }} />
          <View style={{ marginLeft: 8 }}>
            <MyText
              style={{ color: colors.text, fontSize: 12, fontWeight: "700" }}
            >
              {props.title}
            </MyText>
            <MyText style={{ color: colors.lighttext, fontSize: 10 }}>
              {props.niche}
            </MyText>
          </View>
        </View>
        <View>
          <Entypo name="share" size={24} color={colors.Bluish} />
        </View>
      </View>
      {/* card header out */}
      {/* video in */}
      <View>
        {/* <Video
          source={{ uri: "https://www.youtube.com/watch?v=mpSmBuco6I0" }}
          style={{ width: "100%", height: "30%" }}
        /> */}
      </View>
    </View>
  );
};

export default CampaignCard;

const styles = StyleSheet.create({});
