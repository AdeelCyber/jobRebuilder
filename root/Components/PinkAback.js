import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const PinkAback = () => {
  return (
    <View
      style={{
        width: 41,
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
