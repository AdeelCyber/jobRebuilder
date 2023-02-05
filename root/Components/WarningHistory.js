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
import { Ionicons } from "@expo/vector-icons";
import msg from "../../assets/Svgs/Message";
const WarningHistory = ({ designation, image, text, ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [open, setopen] = useState(false);
  const [select, setselected] = useState(true);
  return (
    // main Container
    <View
      style={[
        {
          backgroundColor: colors.white,
          paddingVertical: 15,
          paddingHorizontal: 14,
          borderRadius: 10,
        },
        styles.shadow,
        { ...props.style },
      ]}
    >
      {/* head */}
      <View
        style={[
          {
            flexDirection: "row",

            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        {/* 1 */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: image }}
            style={{ width: 35, height: 35, borderRadius: 20, marginRight: 8 }}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MyText
                style={{
                  color: colors.text,
                  fontSize: 14,
                  fontWeight: "500",
                  marginRight: 5,
                }}
              >
                {text}
              </MyText>
              <SvgImport svg={msg} style={{ marginTop: 4 }} />
            </View>

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
          <Ionicons name="ios-warning" size={24} color={colors.Red} />
        </View>
      </View>
      {/* desc */}
      <View style={{ marginVertical: 13 }}>
        <MyText style={{ color: "#232323BF", textAlign: "left" }}>
          {props.desc}
        </MyText>
      </View>
      {/* footer */}
      <View>
        <MyText
          style={{ color: colors.secondary, fontSize: 10, fontWeight: "500" }}
        >
          Requested By
        </MyText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 7,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: props.requesterImage }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 20,
                marginRight: 5,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MyText
                style={{
                  color: colors.text,
                  fontSize: 12,
                  fontWeight: "400",
                  marginRight: 0,
                }}
              >
                {props.requestedBy}
              </MyText>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              style={{
                backgroundColor: "#EAEAEA",
                paddingVertical: 7,
                paddingHorizontal: 25,
                borderRadius: 4,
              }}
            >
              <MyText style={{ fontSize: 10, fontWeight: "500" }}>
                Reject
              </MyText>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: colors.Red,
                paddingVertical: 7,
                paddingHorizontal: 26,
                borderRadius: 4,
                marginLeft: 3,
              }}
            >
              <MyText
                style={{ fontSize: 10, fontWeight: "500", color: colors.white }}
              >
                Warn
              </MyText>
            </Pressable>
          </View>
        </View>
        {/* end */}
      </View>
    </View>
  );
};

export default WarningHistory;

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
