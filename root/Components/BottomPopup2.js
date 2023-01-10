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
import { AntDesign } from "@expo/vector-icons";
import { Svg } from "react-native-svg";
import SvgImport from "./SvgImport";
import Eye from "../../assets/Svgs/Eye";
const DeviceHeight = Dimensions.get("window").height;
const BottomPopup2 = (props) => {
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
        props.setshow((currents) => ({ ...currents, modal2: false }));
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
            props.setshow((currents) => ({ ...currents, modal2: false }));
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
            Options
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
          {/* 1 */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5,
              marginVertical: 5,
            }}
          >
            <MyText style={{ fontSize: 16, color: colors.Red }}>Delete</MyText>
            <Pressable onPress={() => handleit("Delete")}>
              <AntDesign name="delete" size={24} color={colors.Red} />
            </Pressable>
          </View>
          {/* 2 */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5,
              marginVertical: 5,
            }}
          >
            <MyText style={{ fontSize: 16 }}>Edit Milestones</MyText>
            <Pressable onPress={() => handleit("Edit")}>
              <MaterialIcons name="edit" size={24} color="black" />
            </Pressable>
          </View>
          {/* 3 */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5,
              marginVertical: 5,
            }}
          >
            <MyText style={{ fontSize: 16 }}>View Details</MyText>
            <Pressable onPress={() => handleit("View")}>
              <SvgImport svg={Eye} />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomPopup2;

const styles = StyleSheet.create({});
