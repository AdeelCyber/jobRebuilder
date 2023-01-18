import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const CustomHeader = ({
  icon = () => <MaterialIcons name="message" size={24} color="black" />,
  Title = "Moto Mobiles",

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
          paddingVertical: 15,
          paddingHorizontal: 10,
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          paddingRight: 19,
        },
        styles.shadow,

        props.style,
      ]}
    >
      <Pressable
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={handleNav}
      >
        <Entypo name="chevron-left" size={22} color="black" />
      </Pressable>
      {/* Text View in */}
      <View>
        <MyText style={{ fontWeight: "700", fontSize: 16 }}>{Title}</MyText>
      </View>

      <View>{icon()}</View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 6,
  },
});
