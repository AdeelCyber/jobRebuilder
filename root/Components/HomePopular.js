import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useState } from "react";
import Context from "../Context/Context";
import SvgImport from "./SvgImport";
import { AntDesign } from "@expo/vector-icons";
import MyText from "./Text";

const HomePopular = ({
  Src,
  title,
  label = "IT Company",
  Logo = { Logo },
  ...props
}) => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",

          elevation: 10,
          shadowColor: "#000",
          borderRadius: 10,
          paddingBottom: 5,
          marginVertical: 17,
        },
        {
          backgroundColor: colors.white,
          ...props.style,
        },
      ]}
    >
      <Image source={Src} style={{ maxWidth: "100%" }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 5,
        }}
      >
        {/* label title view in */}
        <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
          <MyText style={{ fontWeight: "700", fontSize: 16 }}>{title}</MyText>
          <MyText
            style={{ fontWeight: "500", fontSize: 7, color: colors.lighttext }}
          >
            {label}
          </MyText>
        </View>
        {/* label title view out */}
        <View>
          <SvgImport svg={Logo} />
        </View>
      </View>
      {/* All investment paramenters in */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 10,
          paddingHorizontal: 5,
        }}
      >
        {/* 1 */}
        <View>
          <MyText
            style={{ fontWeight: "500", fontSize: 7, color: colors.lighttext }}
          >
            Raised Funds
          </MyText>
          <MyText style={{ fontWeight: "700", fontSize: 16 }}>
            {props.raisedFunds}
          </MyText>
        </View>
        {/* 2 */}
        <View>
          <MyText
            style={{ fontWeight: "500", fontSize: 7, color: colors.lighttext }}
          >
            Min.inv
          </MyText>
          <MyText style={{ fontWeight: "700", fontSize: 16 }}>
            {props.minInv}
          </MyText>
        </View>
        {/* 3 */}
        <View>
          <MyText
            style={{ fontWeight: "500", fontSize: 7, color: colors.lighttext }}
          >
            Share Holders
          </MyText>
          <MyText style={{ fontWeight: "700", fontSize: 16 }}>
            {props.ShareHolders}
          </MyText>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          right: 8,
          backgroundColor: colors.white,
          top: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <AntDesign name="arrowright" size={20} color="black" />
      </View>
    </View>
  );
};

export default HomePopular;

const styles = StyleSheet.create({});
