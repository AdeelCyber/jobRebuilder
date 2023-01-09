import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import Context from "../Context/Context";
import SvgImport from "./SvgImport";
import MyText from "./Text";
import { Entypo } from "@expo/vector-icons";
import GoldenStar from "../../assets/Svgs/GolderStart";
import { AntDesign } from "@expo/vector-icons";
const RateComp = (props) => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <View
      style={[
        {
          padding: 10,
          backgroundColor: colors.white,
          borderRadius: 10,
          width: "100%",
        },
        styles.shadow,
        props.style,
      ]}
    >
      {/* image heart in */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* name  */}
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{
              uri: props.Image,
            }}
            style={{ width: 60, height: 64, borderRadius: 5 }}
          />
          {/* dinplay col */}
          <View style={{ flexDirection: "column", marginLeft: 13 }}>
            <MyText style={{ fontWeight: "400", fontSize: 14 }}>
              {props.name}
            </MyText>
            <MyText
              style={{
                color: colors.lighttext,
                fontSize: 12,
                fontWeight: "400",
              }}
            >
              {props.designation}
            </MyText>
            {/* bottom View */}
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
                marginTop: 13,
              }}
            >
              <Entypo name="star" size={15} color="#FFB33E" />
              <MyText
                style={{
                  fontWeight: "700",
                  fontSize: 12.5,
                  alignItems: "center",
                }}
              >
                {props.Rating}
              </MyText>
            </View>
          </View>
        </View>
        <View
          style={{ justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <Entypo name="heart" size={22} color="#D1D1D1" />
          <MyText style={{ fontSize: 13, marginTop: 3, fontWeight: "700" }}>
            {props.Price}$
            <MyText
              style={{
                color: colors.lighttext,
                fontSize: 13,
                fontWeight: "400",
              }}
            >
              /Hr
            </MyText>
          </MyText>
        </View>
      </View>
      {/* image heart out*/}
    </View>
  );
};

export default RateComp;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 8,
  },
});
