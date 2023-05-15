import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useState, useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import tick from "../../assets/Svgs/Tick";
import SvgImport from "./SvgImport";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const MileStoneViewBar = ({ Title, ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [open, setopen] = useState(false);
  const [select, setselected] = useState(true);
  return (
    <View
      style={[
        {
          width: "100%",

          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.2,

          paddingHorizontal: 8,
          paddingVertical: 14,
          borderRadius: 4,
          marginVertical: 8,
        },
        styles.shadow,
        { ...props.style },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={() => setselected(!select)}>
          <View
            style={{
              backgroundColor: colors.secondary,
              height: 17,
              width: 17,
              borderRadius: 20,
            }}
          ></View>
        </Pressable>
        <MyText style={{ marginLeft: 10, fontSize: 14, fontWeight: "500" }}>
          {Title}
        </MyText>
      </View>
      {
        <Pressable onPress={() => setopen(!open)}>
          <Feather name="more-vertical" size={20} color="#23232380" />
        </Pressable>
      }
    </View>
  );
};

export default MileStoneViewBar;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#D9D9D9",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 0.1,
  },
});
