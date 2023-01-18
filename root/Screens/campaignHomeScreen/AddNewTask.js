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
import questionMark from "../../../assets/Svgs/QuestionMark";
import Link from "../../../assets/Svgs/Link";
import magnifine from "../../../assets/Svgs/GreyMagnifine";
import { SearchBar } from "react-native-paper";
import TeamMember from "../../Components/TeamMember";

const AddNewTask = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const menu = [
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
    },
  ];
  const [changed, setchanged] = useState({
    //title and description
    Title: "",
    desc: "",
    date: "",
    Assign: "",
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
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* View 1 */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 5,
        }}
      >
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
          Title="Add New Task"
          style={{ elevation: 0 }}
          nav={navigation}
        />
        {/* header out */}
        {/* heading */}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled
        >
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
                paddingVertical: 12,
                paddingHorizontal: 14,
              }}
              onChangeText={(got) => {
                {
                  setchanged({ ...changed, Title: got });
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
                value={changed.desc}
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
                    setchanged({ ...changed, desc: got });
                  }
                }}
              />
              <Pressable style={{ right: 20, top: 20, position: "absolute" }}>
                <SvgImport svg={questionMark} />
              </Pressable>
              {/* Date and attach View In */}
              <View
                style={{
                  marginTop: 10,
                  width: "94%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* 1 */}
                <View
                  style={{
                    backgroundColor: "#EEEEEE",
                    flexDirection: "row",
                    borderRadius: 10,
                    paddingVertical: 10,
                    width: "48%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SvgImport svg={Link} />
                  <Pressable
                    style={{ width: "70%", marginLeft: 5 }}
                    onPress={() => handlePress("Attachfiles")}
                  >
                    <MyText
                      style={{
                        color: "#ACA9A9",
                        fontSize: 14,
                        fontWeight: "400",
                      }}
                    >
                      Attach Files
                    </MyText>
                  </Pressable>
                </View>
                {/* 2 */}
                <View
                  style={{
                    backgroundColor: "#EEEEEE",
                    flexDirection: "row",
                    borderRadius: 10,
                    paddingVertical: 10,
                    width: "48%",
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
              {/* date and attach out view above */}
              {/* Search Bar in */}
              {/* below view for icon */}
              <View
                style={{
                  backgroundColor: "#EEEEEE",
                  flexDirection: "row",
                  borderRadius: 10,
                  paddingVertical: 10,
                  width: "94%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 19,
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{ width: "70%", height: "100%", padding: 5 }}
                  placeholderTextColor="#ACA9A9"
                  placeholder="Assign Team Member"
                  value={changed.Assign}
                  onChangeText={(got) => {
                    {
                      setchanged({ ...changed, Assign: got });
                    }
                  }}
                />
                <SvgImport svg={magnifine} />
              </View>
            </View>

            {/* Date View Out */}
            <MyText
              style={{
                marginLeft: 15,
                fontWeight: "700",
                fontSize: 16,
                marginTop: 15,
                alignSelf: "flex-start",
              }}
            >
              Members
            </MyText>
            {/* Component in */}
            {menu.map((item) => (
              <TeamMember
                designation={item.designation}
                image={item.image}
                text={item.text}
                style={{ width: "94%", marginVertical: 5 }}
              />
            ))}
          </View>
          {/* Inputs Out */}
        </ScrollView>
      </View>
      {/* Buttons View In */}
      {/* View 2 */}
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          paddingHorizontal: 13,

          marginBottom: 15,
        }}
      >
        <DynamicButton
          handlePress={handlePress}
          text={"Add Task"}
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

export default AddNewTask;

const styles = StyleSheet.create({});
