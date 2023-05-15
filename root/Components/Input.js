import { StyleSheet, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import React from "react";

const Input = () => {
  return (
    <View
      style={{
        paddingVertical: 13,
        width: "100%",

        borderWidth: 0.8,
        borderColor: "#222222",
        borderRadius: 15,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingRight: 14,

        alignItems: "center",
      }}
    >
      <View
        style={{
          alignSelf: "center",
          marginBottom: 12,
          flexDirection: "row",
        }}
      >
        <FontAwesome name="sort-down" size={28} color="black" />
      </View>
      <Text style={{ fontSize: 15, lineHeight: 20, fontWeight: "300" }}>
        +92
      </Text>
      <TextInput
        placeholder="Phone no here"
        style={{
          paddingLeft: 15,
          marginLeft: 4,
          borderLeftWidth: 1,
          borderLeftColor: "#CECECE",
          flex: 1,
          border: "none",
        }}
      />
      <View
        style={{
          alignSelf: "center",
          marginBottom: 6,
          flexDirection: "row",
        }}
      >
        <Zocial name="call" size={22} color="#BB85F5" />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
