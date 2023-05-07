import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const LittleNav = ({
  Switch = false,
  chevron = false,
  hamburger = true,
  ...props
}) => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Pressable
      style={[
        {
          backgroundColor: colors.secondary,
          paddingHorizontal: 23,
          paddingVertical: 17,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        props.style,
      ]}
      onPress={() => {
        Switch
          ? props.navigation.navigate(props.page, {
              data: props.data,
              show: props.show,
              isPart: props.isPart,
              undefinedd: props.undefinedd,
            })
          : props.navigation.goBack();
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {hamburger && <Feather name="menu" size={24} color={colors.white} />}
        <MyText
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: colors.white,
            marginLeft: 8,
          }}
        >
          {props.title}
        </MyText>
      </View>
      {chevron && (
        <View>
          {Switch ? (
            <Entypo name="chevron-small-up" size={24} color={colors.white} />
          ) : (
            <Entypo name="chevron-small-down" size={24} color={colors.white} />
          )}
        </View>
      )}
    </Pressable>
  );
};

export default LittleNav;

const styles = StyleSheet.create({});
