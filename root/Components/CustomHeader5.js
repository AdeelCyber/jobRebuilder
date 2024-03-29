import { Image, StyleSheet, Text, View } from "react-native";

import React, { useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign, Entypo } from "@expo/vector-icons";

const CustomHeader5 = ({
  icon1 = () => <AntDesign name="search1" size={24} color="black" />,
  Title = "Creating Group",
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

          backgroundColor: "white",
          marginBottom: 10,

          padding: 6,
          justifyContent: "space-between",
          paddingHorizontal: 13,
        },
        styles.shadow,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </View>
      {/* Text View in */}
      <View>
        <MyText style={{ fontWeight: "700", fontSize: 16 }}>{Title}</MyText>
      </View>

      <View>{icon1()}</View>
    </View>
  );
};

export default CustomHeader5;

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
