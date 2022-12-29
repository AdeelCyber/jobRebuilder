import { Image, StyleSheet, Text, View } from "react-native";

import React, { useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const CustomHeader = ({
  icon = () => <MaterialIcons name="message" size={24} color="black" />,
  Title = "Moto Mobiles",
}) => {
  const {
    theme: { colors },
  } = useContext(Context);
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Entypo name="chevron-left" size={24} color="black" />
      </View>
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

    elevation: 2,
  },
});
