import { StyleSheet, Text, View } from "react-native";

import React, { useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";

const CustomHeader = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 30,
      }}
    >
      <Text> Hello</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
