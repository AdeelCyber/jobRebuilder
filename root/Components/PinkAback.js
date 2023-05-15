import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const PinkAback = () => {
  const [dimensions, setDimensions] = useState({ window, screen });
  return (
    <View
      style={{
        width: "97%",
        height: 41,
        borderRadius: 15,
        backgroundColor: "#C38BFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="chevron-back" size={24} color="white" />
    </View>
  );
};

export default PinkAback;

const styles = StyleSheet.create({});
