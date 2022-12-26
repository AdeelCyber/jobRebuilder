import { Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Context from "../Context/Context";

export default function MyText(props) {
  const {
    theme: { colors },
  } = useContext(Context);
  const styles = StyleSheet.create({
    text: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "400",
    },
  });
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
}
