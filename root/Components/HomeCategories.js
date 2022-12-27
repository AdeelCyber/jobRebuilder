import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import Context from "../Context/Context";
import SvgImport from "./SvgImport";
import MyText from "./Text";
const HomeCategories = ({ svg, title, ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Pressable
      style={[
        { justifyContent: "center", alignItems: "center" },
        {
          backgroundColor: colors.white,
          ...props.style,
        },
      ]}
    >
      <SvgImport svg={svg} />
      <MyText style={{ fontWeight: "500", fontSize: 10 }}> {title} </MyText>
    </Pressable>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({});
