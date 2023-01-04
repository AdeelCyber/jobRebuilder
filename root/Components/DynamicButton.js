import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useState, useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import tick from "../../assets/Svgs/Tick";
import SvgImport from "./SvgImport";
const DynamicButton = ({ color = "#8489FC", text = "Update", ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Pressable
      style={{
        backgroundColor: color,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        ...props.style,
      }}
      onPress={() => {
        props.handlePress(text);
      }}
    >
      <MyText
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: colors.white,
          ...props.textStyle,
        }}
      >
        {text}
      </MyText>
    </Pressable>
  );
};

export default DynamicButton;

const styles = StyleSheet.create({});
