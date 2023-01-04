import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  TextInput,
  Image,
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

const TodoTaskView = () => {
  // slider hooks in
  const [range, setrange] = useState("50%");
  const [sliding, setsliding] = useState("Inactive");
  const {
    theme: { colors },
  } = useContext(Context);
  const [currentMileStone, setcurrentMileStone] = useState({
    Title: "MileStone 1",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis. orem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis. orem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis.  ",
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
          Title={currentMileStone.Title}
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
          {/* Title in */}
          <MileStoneViewBar
            Title={currentMileStone.Title}
            style={{ borderWidth: 0, elevation: 0 }}
          />
          {/* title out */}
          <MyText
            style={{
              color: colors.lighttext,
              paddingHorizontal: 8,
              fontSize: 13,

              marginTop: 0,
            }}
          >
            {currentMileStone.desc}
          </MyText>
          {/* Avatars View In */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingTop: 15,
              paddingHorizontal: 8,
            }}
          >
            <Image
              source={{ uri: "https://bit.ly/kent-c-dodds" }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                marginRight: 8,
              }}
            />
            <Image
              source={{ uri: "https://bit.ly/kent-c-dodds" }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                marginRight: 8,
              }}
            />
            <Image
              source={{ uri: "https://bit.ly/kent-c-dodds" }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                marginRight: 8,
              }}
            />
          </View>
          {/* Avatars View out */}
          {/* Attach Button View in */}
          <DynamicButton
            text="Complete"
            style={{
              backgroundColor: "#E8E8E8",
              width: "50%",
              paddingVertical: 15,
            }}
            textStyle={{ color: "#232323" }}
            handlePress={handlePress}
          />
        </View>

        {/* Inputs Out */}
      </View>
      {/* Buttons View In */}
      <View>
        <View
          style={{ borderWidth: 1, borderColor: "#00000014", marginBottom: 5 }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 15,
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          {/* Both Icons in */}
          <View
            style={{
              flexDirection: "row",

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
                height: "35%",

                borderLeftWidth: 1,
                borderColor: "#DEDEDE",
              }}
            ></View>
            <View style={{ marginLeft: 10 }}>
              <MaterialIcons name="edit" size={24} color="black" />
            </View>
          </View>
          {/* Both Icons Out */}
          <DynamicButton
            text="Complete"
            style={{
              backgroundColor: "#E8E8E8",
              width: "50%",
              paddingVertical: 15,
            }}
            textStyle={{ color: "#232323" }}
            handlePress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

export default TodoTaskView;

const styles = StyleSheet.create({});
