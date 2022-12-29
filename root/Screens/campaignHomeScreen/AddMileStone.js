import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";

import React, { useContext, useState } from "react";
import Context from "../../Context/Context";
import CustomHeader2 from "../../Components/CustomHeader2";
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import MyText from "../../Components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DynamicButton from "../../Components/DynamicButton";
import calender from "../../../assets/Svgs/Calender";

const AddMileStone = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [changed, setchanged] = useState({
    //title and description
    Title: "",
    desc: "",
    date: "",
  });
  function handlePress(text) {
    alert(text);
  }

  return (
    // main container

    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "space-between",
      }}
    >
      <View style={{ justifyContent: "flex-start" }}>
        {/* header */}
        <CustomHeader2
          icon={() => {
            return (
              <MaterialCommunityIcons
                name="bell-circle"
                size={28}
                color="black"
              />
            );
          }}
          Title="Add Milestone"
        />
        {/* header out */}
        {/* heading */}
        <MyText
          style={{
            marginLeft: 15,
            fontWeight: "700",
            fontSize: 16,
            marginTop: 15,
          }}
        >
          Enter the details
        </MyText>
        {/* Inputs In */}
        <View
          style={{
            width: "100%",

            alignItems: "center",
            marginTop: 15,
          }}
        >
          <TextInput
            placeholderTextColor="#ACA9A9"
            placeholder="Mile Stone"
            value={changed.Title}
            style={{
              backgroundColor: "#EEEEEE",

              borderColor: "#000000",
              color: colors.text,
              padding: 8,
              width: "94%",
              fontWeight: "400",
              fontSize: 14,
              borderRadius: 10,
            }}
            onChangeText={(got) => {
              {
                setchanged({ ...changed, Title: got });
              }
            }}
          />
          <TextInput
            multiline={true}
            placeholderTextColor="#ACA9A9"
            placeholder="Description"
            value={changed.desc}
            style={{
              backgroundColor: "#EEEEEE",

              borderColor: "#000000",
              color: colors.lighttext,
              padding: 8,
              width: "94%",
              marginTop: 20,
              height: "48%",
              fontWeight: "400",
              fontSize: 14,
              justifyContent: "flex-start",
              textAlignVertical: "top",
              borderRadius: 10,
            }}
            onChangeText={(got) => {
              {
                setchanged({ ...changed, desc: got });
              }
            }}
          />
          {/* Date View In */}
          <View style={{ marginTop: 10, width: "94%" }}>
            <View
              style={{
                backgroundColor: "#EEEEEE",
                flexDirection: "row",
                borderRadius: 10,
                paddingVertical: 10,
                width: "30%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                style={{ width: "70%", height: "100%", padding: 5 }}
                placeholderTextColor="#ACA9A9"
                placeholder="Due Date"
                value={changed.date}
                onChangeText={(got) => {
                  {
                    setchanged({ ...changed, date: got });
                  }
                }}
              />
              <SvgImport svg={calender} />
            </View>
          </View>
          {/* Date View Out */}
        </View>
        {/* Inputs Out */}
      </View>
      {/* Buttons View In */}
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <DynamicButton
          handlePress={handlePress}
          text={"Add Mile Stone"}
          color={colors.secondary}
          textStyle={{ color: colors.white }}
          style={{ borderRadius: 10 }}
        />
        <DynamicButton
          handlePress={handlePress}
          text={"Cancel"}
          color={"#EBEBEB"}
          textStyle={{ color: colors.text }}
          style={{ marginTop: 15, borderRadius: 10 }}
        />
      </View>
    </View>
  );
};

export default AddMileStone;

const styles = StyleSheet.create({});
