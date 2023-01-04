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

const ViewMileStone = () => {
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

export default ViewMileStone;

const styles = StyleSheet.create({});
