import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import tick from "../../assets/Svgs/Tick";
import SvgImport from "./SvgImport";

const TickPara = ({ para, logo = tick, ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          paddingHorizontal: 23,

          flexDirection: "row",
          width: "100%",
          ...props.style,
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          {/* <SvgImport svg={logo} /> */}
        </View>
        <View style={{}}>
          <MyText
            style={{
              color: colors.heighlight,
              fontWeight: "400",
              fontSize: 11,
              lineHeight: 20.32,
              textAlign: "left",
              ...props.textStyle,
            }}
          >
            {para}
          </MyText>
        </View>
      </View>
      <View
        style={{
          width: "90%",
          borderBottomWidth: 0.8,
          marginVertical: 17,
          borderColor: "#C9CBCB9C",
        }}
      ></View>
    </View>
  );
};

export default TickPara;

const styles = StyleSheet.create({});
