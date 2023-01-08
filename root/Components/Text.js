import { Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Context from "../Context/Context";
import { useFonts } from "expo-font";

export default function MyText(props) {
  const [loaded] = useFonts({
    DMSANS: require("../../assets/fonts/DMSans-Regular.ttf"),
  });
  const {
    theme: { colors },
  } = useContext(Context);
  if (!loaded) {
    return null;
  }
  const styles = StyleSheet.create({
    text: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "400",
      fontFamily: "DMSANS",
    },
  });
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
}
