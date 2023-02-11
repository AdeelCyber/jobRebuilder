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
import { EditRole } from "../Profile/services/FreeLancerServices";

const EditRoles = ({ navigation, route }) => {
  const [data, setData] = useState(route.params.data);
  const [item, setitem] = useState(route.params.item);
  const {
    theme: { colors },
  } = useContext(Context);
  const [changed, setchanged] = useState({
    title: item.title,
    description: item.description,
    type: "Equity",
  });

  // Api call

  const getFreelancersData = async () => {
    const resp = await EditRole(data.startup._id, item._id, changed);
    console.log(data.startup._id, item._id, changed);

    console.log(resp.data.projectRoles.roles);
    if (resp.data.status === "OK") {
      route.params.set(resp.data.projectRoles.roles);
    }
  };

  function handlePress(text) {
    if ((text = "Update")) {
      getFreelancersData();
      navigation.goBack();
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
      <View>
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
          Title="Team Roles"
          nav={navigation}
        />
        {/* header out */}
        {/* Inputs In */}
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <TextInput
            placeholderTextColor="#232323BF"
            value={changed.title}
            style={{
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: "#000000",
              color: colors.text,
              padding: 8,
              width: "94%",
              fontWeight: "500",
              fontSize: 16,
              borderRadius: 5,
              paddingHorizontal: 14,
            }}
            onChangeText={(got) => {
              {
                setchanged({ ...changed, title: got });
              }
            }}
          />
          <TextInput
            multiline={true}
            placeholderTextColor="#232323BF"
            value={changed.description}
            style={{
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: "#000000",
              color: colors.lighttext,
              padding: 8,
              width: "94%",
              marginTop: 7,
              borderRadius: 5,
              paddingLeft: 14,
            }}
            onChangeText={(got) => {
              {
                setchanged({ ...changed, description: got });
              }
            }}
          />
        </View>
        {/* Inputs Out */}
      </View>
      {/* Buttons View In */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <DynamicButton
          handlePress={handlePress}
          text={"Cancel"}
          color={"#EBEBEB"}
          textStyle={{ color: colors.text }}
          style={{ width: "48%" }}
        />
        <DynamicButton
          handlePress={handlePress}
          text={"Update"}
          color={colors.secondary}
          textStyle={{ color: colors.white }}
          style={{ width: "48%" }}
        />
      </View>
    </View>
  );
};

export default EditRoles;

const styles = StyleSheet.create({});
