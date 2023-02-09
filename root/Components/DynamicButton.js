import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useState, useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import tick from "../../assets/Svgs/Tick";
import Link from "../../assets/Svgs/Link";
import SvgImport from "./SvgImport";
const DynamicButton = ({
  color = "#8489FC",
  text = "Update",
  logo = false,

  ...props
}) => {
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
        flexDirection: "row",
        ...props.style,
      }}
      onPress={() => {
        props.handlePress(text);
      }}
    >
      {logo && (
        <View style={{ marginRight: 10 }}>
          <SvgImport svg={Link} />
        </View>
      )}
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
