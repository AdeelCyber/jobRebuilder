import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useState, useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import tick from "../../assets/Svgs/Tick";
import SvgImport from "./SvgImport";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const RolesDropDown = ({ Title, desc, ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [open, setopen] = useState(false);
  const [select, setselected] = useState(true);
  return (
    <View>
      <View
        style={[
          {
            width: "100%",

            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 0.2,
            paddingHorizontal: 8,
            paddingVertical: 14,
            borderRadius: 7,
            marginVertical: 8,
            ...props.style,
          },
          styles.shadow,
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => setselected(!select)}>
            {select ? (
              <SvgImport svg={tick} />
            ) : (
              <Pressable
                style={{
                  backgroundColor: "#D9D9D9",
                  height: 17,
                  width: 17,
                  borderRadius: 20,
                }}
                onPress={() => setselected(!select)}
              ></Pressable>
            )}
          </Pressable>
          <MyText style={{ marginLeft: 10, fontSize: 14, fontWeight: "500" }}>
            {Title}
          </MyText>
        </View>
        {
          <Pressable onPress={() => setopen(!open)}>
            {open ? (
              <Entypo name="chevron-small-up" size={24} color="black" />
            ) : (
              <Entypo name="chevron-small-down" size={24} color="black" />
            )}
          </Pressable>
        }
      </View>
      {open && (
        <View style={{ marginTop: 10, paddingLeft: 10 }}>
          <MyText
            style={{
              color: colors.heighlight,
              fontWeight: "400",
              fontSize: 11,
              lineHeight: 14.32,
            }}
          >
            {desc}
          </MyText>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,

              alignItems: "center",
            }}
          >
            <View style={{ marginRight: 10 }}>
              <AntDesign name="delete" size={24} color="black" />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "90%",

                borderLeftWidth: 1,
                borderColor: "#DEDEDE",
              }}
            ></View>
            <View style={{ marginLeft: 10 }}>
              <MaterialIcons name="edit" size={24} color="black" />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default RolesDropDown;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#D9D9D9",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 0.1,
  },
});
