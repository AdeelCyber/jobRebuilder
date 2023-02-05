import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";

import React, { useContext, useState, useEffect } from "react";
import Context from "../../Context/Context";
import CustomHeader2 from "../../Components/CustomHeader2";
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import MyText from "../../Components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DynamicButton from "../../Components/DynamicButton";
import questionMark from "../../../assets/Svgs/QuestionMark";
import { addRoles } from "../Profile/services/FreeLancerServices";

const AddRoles = ({ navigation, route }) => {
  const [data, setData] = useState(route.params.data);
  const {
    theme: { colors },
  } = useContext(Context);
  const [changed, setchanged] = useState({
    //title and description
    title: "",
    description: "",
    type: "Equity",
  });

  // Api call

  const getFreelancersData = async () => {
    const resp = await addRoles(data.startup._id, changed);

    if (resp.data.status === "OK") {
      route.params.set(resp.data.projectRoles.roles);
    }
  };
  function handlePress(text) {
    if (text === "Add Role") {
      getFreelancersData();
    }
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
      {/* 1st view in between */}
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
          Title="Add Roles"
          style={{ elevation: 0 }}
          nav={navigation}
        />
        {/* header out */}
        {/* heading */}
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: "94%" }}>
            <MyText
              style={{
                fontWeight: "700",
                fontSize: 16,
                marginTop: 15,
              }}
            >
              Enter the details
            </MyText>
          </View>
        </View>
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
            placeholder="Role Title"
            value={changed.title}
            style={{
              backgroundColor: "#EEEEEE",

              borderColor: "#000000",
              color: colors.text,
              padding: 8,
              width: "94%",
              fontWeight: "400",
              fontSize: 14,
              borderRadius: 10,
              paddingVertical: 12,
              paddingHorizontal: 14,
            }}
            onChangeText={(got) => {
              {
                setchanged({ ...changed, title: got });
              }
            }}
          />
          <View
            style={{
              width: "100%",

              alignItems: "center",
              position: "relative",
            }}
          >
            <TextInput
              multiline={true}
              placeholderTextColor="#ACA9A9"
              placeholder="Role Description"
              value={changed.description}
              style={{
                backgroundColor: "#EEEEEE",

                borderColor: "#000000",
                color: colors.lighttext,
                padding: 8,
                width: "94%",
                marginTop: 10,
                height: 200,
                fontWeight: "400",
                fontSize: 14,
                justifyContent: "flex-start",
                textAlignVertical: "top",
                borderRadius: 10,
                paddingHorizontal: 14,
              }}
              onChangeText={(got) => {
                {
                  setchanged({ ...changed, description: got });
                }
              }}
            />
            <Pressable style={{ right: 20, top: 20, position: "absolute" }}>
              <SvgImport svg={questionMark} />
            </Pressable>
          </View>
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
          text={"Add Role"}
          color={colors.secondary}
          textStyle={{ color: colors.white }}
          style={{ borderRadius: 10, paddingVertical: 18 }}
        />
        <DynamicButton
          handlePress={handlePress}
          text={"Cancel"}
          color={"#EBEBEB"}
          textStyle={{ color: colors.text }}
          style={{ marginTop: 15, borderRadius: 10, paddingVertical: 18 }}
        />
      </View>
    </View>
  );
};

export default AddRoles;

const styles = StyleSheet.create({});
