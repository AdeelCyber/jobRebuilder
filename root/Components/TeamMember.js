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
const TeamMember = ({ designation, image, text, ...props }) => {
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
          backgroundColor: colors.lightback,
          paddingVertical: 15,
          paddingHorizontal: 14,
          borderRadius: 10,
          justifyContent: "space-between",
          alignItems: "center",
        },
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          onPress={() => props.handlePress("Add", props.id, props.item)}
        >
          <AntDesign name="pluscircleo" size={21} color="black" />
        </Pressable>
        <Pressable
          onPress={() => props.handlePress("Sub", props.id, props.item)}
        >
          <MaterialCommunityIcons name="delete" size={24} color="#E50505" />
        </Pressable>
      </View>
    </View>
  );
};

export default TeamMember;

const styles = StyleSheet.create({});
