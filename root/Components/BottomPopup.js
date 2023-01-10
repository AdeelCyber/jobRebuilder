import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import { MaterialIcons } from "@expo/vector-icons";
const DeviceHeight = Dimensions.get("window").height;
const BottomPopup = (props) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [open, setopen] = React.useState(props.show);

  useEffect(() => {
    setopen(props.show);
  }, [props.show, open]);

  const handleit = (msg) => {
    alert(msg);
    setopen(props.show);
  };
  return (
    // modal in
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setopen(false);
        props.setshow((currents) => ({ ...currents, modal1: false }));
      }}
    >
      {/* dark shade in */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#232323B5",
          justifyContent: "flex-end",
        }}
      >
        {/* for canceling on press in dark shade */}
        <Pressable
          style={{ flex: 1, width: "100%" }}
          onPress={() => {
            setopen(false);
            props.setshow((currents) => ({ ...currents, modal1: false }));
          }}
        ></Pressable>
        {/* modal bottom component in */}
        <View
          style={{
            backgroundColor: colors.white,
            width: "100%",
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            paddingHorizontal: 10,
            maxHeight: DeviceHeight * 0.4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 53,
              height: 5,
              backgroundColor: "#8489FC",
              borderRadius: 5,
              marginTop: 10,
            }}
          ></View>
          <MyText
            style={{
              color: "#000",
              fontSize: 18,
              fontWeight: "700",
              marginVertical: 5,
            }}
          >
            Share
          </MyText>
          <View
            style={{
              width: "110%",
              borderTopWidth: 0.5,
              borderColor: "#00000030",
              marginVertical: 7,
              borderTopWidth: 1,
            }}
          ></View>
          {/* list component in */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <MyText style={{ fontSize: 16 }}>Copy Campaign Url</MyText>
            <Pressable onPress={() => handleit("copy")}>
              <MaterialIcons name="content-copy" size={24} color="#8489FC" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomPopup;

const styles = StyleSheet.create({});
