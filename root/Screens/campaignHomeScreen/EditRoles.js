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

const EditRoles = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [changed, setchanged] = useState({
    Title: "Graphic Designer",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis.  ",
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
            value={changed.Title}
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
                setchanged({ ...changed, Title: got });
              }
            }}
          />
          <TextInput
            multiline={true}
            placeholderTextColor="#232323BF"
            value={changed.desc}
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
                setchanged({ ...changed, desc: got });
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
