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
import TeamMemberWarning from "../../Components/TeamMemberWarning";
import WarningHistoryComp from "../../Components/WarningHistory";

const TeamWarnings = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const TeamWarning = [
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      Warnings: 2,
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      Warnings: 2,
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      Warnings: 2,
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      Warnings: 2,
      text: "Mike Dean",
      designation: "Ceo",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur in nostrum molestiae obcaecati sapiente sequi, facere modi possimus labore et!",
    },
  ];
  const WarningHistory = [
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur in nostrum molestiae obcaecati sapiente sequi, facere modi possimus labore et!",
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur in nostrum molestiae obcaecati sapiente sequi, facere modi possimus labore et!",
    },
  ];
  function handlePress(text) {
    alert(text);
  }
  const [TeamWarnings, setTeamWarnings] = useState(true);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <CustomHeader2
        Title="Warnings"
        style={{ elevation: 0 }}
        nav={navigation}
      />
      {/* main View */}
      <View style={{ flex: 1 }}>
        {/* Toggle */}
        <View
          style={{
            backgroundColor: "#EFEFEF",
            paddingVertical: 5,

            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            flexDirection: "row",

            marginHorizontal: 20,
          }}
        >
          <Pressable
            style={{
              width: "48.5 %",

              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 18,
              borderRadius: 50,
              backgroundColor: TeamWarnings ? "#8489FC" : "#EFEFEF",
            }}
            onPress={() => setTeamWarnings(true)}
          >
            <MyText
              style={{
                color: TeamWarnings ? colors.white : "#23232380",
                fontWeight: "400",
                fontSize: 14,
              }}
            >
              Team Warning
            </MyText>
          </Pressable>
          <Pressable
            style={{
              width: "48.5%",

              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 18,
              borderRadius: 50,
              backgroundColor: !TeamWarnings ? "#8489FC" : "#EFEFEF",
            }}
            onPress={() => setTeamWarnings(false)}
          >
            <MyText
              style={{
                color: !TeamWarnings ? colors.white : "#23232380",
                fontWeight: "400",
                fontSize: 14,
              }}
            >
              Warning History
            </MyText>
          </Pressable>
        </View>
        {/* Toggle out  */}

        {TeamWarnings && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 30 }}
          >
            {TeamWarning.map((item) => (
              <TeamMemberWarning
                designation={item.designation}
                image={item.image}
                text={item.text}
                Warnings={item.Warnings}
                style={{ marginVertical: 12, marginHorizontal: 20 }}
              />
            ))}
          </ScrollView>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          {!TeamWarnings && (
            <View style={{ marginTop: 30 }}>
              {WarningHistory.map((item) => (
                <WarningHistoryComp
                  designation={item.designation}
                  image={item.image}
                  text={item.text}
                  desc={item.desc}
                  style={{ marginVertical: 12, marginHorizontal: 20 }}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default TeamWarnings;

const styles = StyleSheet.create({});
