import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useState, useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import SvgImport from "./SvgImport";
import msg from "../../assets/Svgs/Message";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const TeamItem = (props) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const handleClick = () => {
    props.handleClick(props.text);
  };

  const [open, setopen] = React.useState(false);

  return (
    <View style={[styles.container, props.style]}>
      <Image
        resizeMethod="auto"
        source={{ uri: props.image }}
        style={{ width: 70, height: 70, borderRadius: 40 }}
      />
      <MyText
        style={{
          marginTop: 20,
          fontWeight: "400",
          fontSize: 16,
          lineHeight: 24,
          textAlign: "center",
        }}
      >
        {props.text}
        {"\n"}
        <MyText style={{ color: colors.lighttext, fontSize: 13 }}>
          {" "}
          {props.designation}{" "}
        </MyText>
      </MyText>
      <SvgImport svg={msg} style={{ marginTop: 10 }} />
      <Pressable
        style={{ position: "absolute", top: 10, right: 5 }}
        onPress={() => setopen(!open)}
      >
        <Feather name="more-vertical" size={20} color="#23232380" />
      </Pressable>
      {open && (
        <View
          style={{
            position: "absolute",
            top: 25,
            right: 20,
            backgroundColor: "#232323",
            borderRadius: 7,
          }}
        >
          <Pressable
            onPress={handleClick}
            style={{ flexDirection: "row", padding: 5 }}
          >
            <Ionicons name="warning" size={15} color="#F50303" />
            <MyText
              style={{
                color: "#fff",
                marginLeft: 5,
                fontWeight: "400",
                fontSize: 10,
              }}
            >
              Send Warning
            </MyText>
          </Pressable>
          <Pressable
            onPress={handleClick}
            style={{ flexDirection: "row", padding: 5 }}
          >
            <Ionicons name="person-circle" size={15} color="#8489FC" />
            <MyText
              style={{
                color: "#fff",
                marginLeft: 5,
                fontWeight: "400",
                fontSize: 10,
              }}
            >
              View Profile
            </MyText>
          </Pressable>
          <Pressable
            onPress={handleClick}
            style={{ flexDirection: "row", padding: 5 }}
          >
            <Ionicons name="remove-circle" size={15} color="#F50303" />
            <MyText
              style={{
                color: "#fff",
                marginLeft: 5,
                fontWeight: "400",
                fontSize: 10,
              }}
            >
              Remove
            </MyText>
          </Pressable>
          <Pressable
            onPress={handleClick}
            style={{ flexDirection: "row", padding: 5 }}
          >
            <Ionicons name="link" size={15} color="#8489FC" />
            <MyText
              style={{
                color: "#fff",
                marginLeft: 5,
                fontWeight: "400",
                fontSize: 10,
              }}
            >
              Copy Profile Url
            </MyText>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default TeamItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    elevation: 10,
    borderRadius: 9,
    alignItems: "center",
  },
});
