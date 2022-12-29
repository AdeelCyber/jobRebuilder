import { StyleSheet, Text, View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const Buttons = ({ color, arrow, text, ...props }) => {
  return (
    <Pressable
      style={{
        backgroundColor: color,
        width: "100%",
        // height: 57,
        borderRadius: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        position: "relative",
        ...props.style,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "400",
          fontSize: 15,
          alignSelf: "center",
        }}
      >
        {text}
      </Text>
      <View
        style={{
          position: "absolute",
          right: 10,
          display: arrow ? "flex" : "none",
        }}
      >
        <AntDesign name="arrowright" size={20} color="white" />
      </View>
    </Pressable>
  );
};

export default Buttons;

const styles = StyleSheet.create({});
