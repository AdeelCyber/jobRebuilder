import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import Context from "../Context/Context";
import SvgImport from "./SvgImport";
import MyText from "./Text";
const HomeCategories = ({ svg, title, ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <ImageBackground
      source={props.img}
      resizeMode="cover"
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          height: 200,
          width: 200,
          borderWidth: 2,
        },
        {
          backgroundColor: colors.white,
          ...props.style,
        },
      ]}
    >
      <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
        <SvgImport svg={svg} />
        <MyText style={{ fontWeight: "500", fontSize: 10 }}> {title} </MyText>
      </Pressable>
    </ImageBackground>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({});
