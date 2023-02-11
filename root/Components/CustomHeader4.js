import { Image, StyleSheet, Text, View, Pressable } from "react-native";

import React, { useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign, Entypo } from "@expo/vector-icons";

const CustomHeader4 = ({
  icon1 = () => <Entypo name="dots-three-vertical" size={24} color="black" />,
  icon2 = () => <Entypo name="dots-three-vertical" size={24} color="black" />,
  Title = "Select User",
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
          <AntDesign name="arrowleft" size={24} color="black" />
        </View>
      </Pressable>
      {/* Text View in */}
      <View>
        <MyText style={{ fontWeight: "700", fontSize: 16 }}>{Title}</MyText>
      </View>
      <View style={{ flexDirection: "row" }}>
        {icon1()}
        {icon2()}
      </View>
    </View>
  );
};

export default CustomHeader4;

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
