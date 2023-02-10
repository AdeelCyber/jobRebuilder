import { Image, StyleSheet, Text, View, Pressable } from "react-native";

import React, { useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const CustomHeader9 = ({
  icon1 = () => (
    <MaterialCommunityIcons name="bell-circle" size={30} color="black" />
  ),
  Title = "Edit Services",
  ...props
}) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const handleNav = () => {
    props.nav.goBack();
  };
  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          width: "100%",

          backgroundColor: colors.white,

          padding: 6,
          paddingVertical: 10,
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
          borderRadius: 10,
        },
        styles.shadow,
      ]}
    >
      <Pressable
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={handleNav}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Entypo name="chevron-left" size={24} color="black" />
        </View>
      </Pressable>
      {/* Text View in */}
      <View>
        <MyText style={{ fontWeight: "700", fontSize: 16 }}>{Title}</MyText>
      </View>

      <View>{icon1()}</View>
    </View>
  );
};

export default CustomHeader9;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
});
