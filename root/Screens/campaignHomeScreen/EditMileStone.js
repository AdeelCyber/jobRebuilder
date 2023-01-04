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
import TodoListItem from "../../Components/TodoListItem";
import MileStoneViewBar from "../../Components/MileStoneViewBar";
import Slider from "@react-native-community/slider";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const EditMileStone = () => {
  // slider hooks in
  const [range, setrange] = useState("50%");
  const [sliding, setsliding] = useState("Inactive");
  const {
    theme: { colors },
  } = useContext(Context);
  const [changed, setchanged] = useState({
    Title: "Graphic Designer",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis.amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis.amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis  ",
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
        />
        {/* header out */}
        {/* Inputs In */}
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
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
              marginTop: 20,
            }}
            onChangeText={(got) => {
              {
                setchanged({ ...changed, desc: got });
              }
            }}
          />
          <MyText
            style={{
              color: colors.text,
              paddingHorizontal: 8,
              fontSize: 16,
              fontWeight: "500",

              marginTop: 15,
              alignSelf: "flex-start",
            }}
          >
            Progress
          </MyText>
          {/* slider view in */}
          <View
            style={{
              alignSelf: "flex-start",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Slider
              style={{ height: 40, width: 250, marginLeft: 0 }}
              minimumTrackTintColor={colors.secondary}
              minimumValue={0.1}
              maximumValue={1}
              maximumTrackTintColor={"#D9D9D9"}
              thumbTintColor={colors.secondary}
              value={0.5}
              onValueChange={(value) => setrange(parseInt(value * 100) + "%")}
            />
            <MyText
              style={{ marginRight: 12, fontWeight: "500", fontSize: 16 }}
            >
              {range}
            </MyText>
          </View>
          {/* slider view out */}
          <MyText
            style={{
              color: colors.text,
              paddingHorizontal: 8,
              fontSize: 16,
              fontWeight: "500",

              marginTop: 15,
              alignSelf: "flex-start",
            }}
          >
            Due Date
          </MyText>
          <View
            style={{
              marginLeft: 8,
              backgroundColor: colors.secondary,
              alignSelf: "flex-start",
              borderRadius: 5,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
              paddingHorizontal: 8,
            }}
          >
            <Feather name="calendar" size={24} color="white" />
            <MyText style={{ color: colors.white, fontSize: 13 }}>
              Aug 9th, 2022
            </MyText>
          </View>
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

export default EditMileStone;

const styles = StyleSheet.create({});
