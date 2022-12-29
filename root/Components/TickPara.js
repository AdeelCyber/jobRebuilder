import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import tick from "../../assets/Svgs/Tick";
import SvgImport from "./SvgImport";

const TickPara = ({ para, ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{ paddingHorizontal: 23, flexDirection: "row", ...props.style }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: 7,
          }}
        >
          <SvgImport svg={tick} />
        </View>
        <View style={{}}>
          <MyText
            style={{
              color: colors.heighlight,
              fontWeight: "400",
              fontSize: 11,
              lineHeight: 14.32,
            }}
          >
            {para}
          </MyText>
        </View>
      </View>
      <View
        style={{
          width: "90%",
          borderWidth: 0.8,
          marginTop: 15,
          borderColor: "#C9CBCB9C",
        }}
      ></View>
    </View>
  );
};

export default TickPara;

const styles = StyleSheet.create({});
