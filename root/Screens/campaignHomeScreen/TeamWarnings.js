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
import calender from "../../../assets/Svgs/Calender";
import questionMark from "../../../assets/Svgs/QuestionMark";
import Link from "../../../assets/Svgs/Link";
import magnifine from "../../../assets/Svgs/GreyMagnifine";
import { SearchBar } from "react-native-paper";
import TeamMember from "../../Components/TeamMember";
import TeamMemberWarning from "../../Components/TeamMemberWarning";
import WarningHistoryComp from "../../Components/WarningHistory";
import {
  getRequestedWarnings,
  getWarnings,
} from "../Profile/services/FreeLancerServices";

const TeamWarnings = ({ navigation, route }) => {
  const [id, setid] = useState(route.params.id);
  const {
    theme: { colors },
  } = useContext(Context);
  const [TeamWarning, setTeamWarning] = useState([
    {
      avatar: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      Warnings: 2,
    },
    {
      avatar: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      Warnings: 2,
    },
    {
      avatar: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      Warnings: 2,
    },
    {
      avatar: "https://bit.ly/kent-c-dodds",
      Warnings: 2,
      text: "Mike Dean",
      designation: "Ceo",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur in nostrum molestiae obcaecati sapiente sequi, facere modi possimus labore et!",
    },
  ]);
  const [WarningHistory, setWaringHistory] = useState([
    {
      avatar: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur in nostrum molestiae obcaecati sapiente sequi, facere modi possimus labore et!",
    },
    {
      avatar: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur in nostrum molestiae obcaecati sapiente sequi, facere modi possimus labore et!",
    },
  ]);
  function handlePress(text) {
    alert(text);
  }
  const [TeamWarnings, setTeamWarnings] = useState(true);
  //Loading use State
  const [loading, setLoading] = useState(false);
  //Api call
  useEffect(() => {
    const getFreelancersData = async () => {
      const resp = await getWarnings(id);
      const resp2 = await getRequestedWarnings(id);
      console.log(resp.data.warnings);
      if (resp.data.status === "OK" && resp2.data.status === "OK") {
        setTeamWarning(resp.data.warnings);
        // setWaringHistory(resp.data.warnings);

        // console.log("responded", resp.data.warnings[0].warnings);
        setLoading(true);
      }
    };

    getFreelancersData();
  }, []);
  return (
    loading && (
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
                  designation={item.warnings.warnedTo.jobTitle}
                  image={item.warnings.warnedTo.avatar}
                  text={item.warnings.warnedTo.name}
                  Warnings={item.WarningCount}
                  style={{ marginVertical: 12, marginHorizontal: 20 }}
                />
              ))}
            </ScrollView>
          )}

          <ScrollView showsVerticalScrollIndicator={false}>
            {!TeamWarnings && (
              <View style={{ marginTop: 30 }}>
                {/* {WarningHistory.map((item) => (
                  <WarningHistoryComp
                    designation={item.designation}
                    image={item.warnedTo.avatar}
                    text={item.warnedTo.name}
                    requestedBy={item.warnedBy.name}
                    requesterImage={item.warnedBy.avatar}
                    desc={item.reason}
                    style={{ marginVertical: 12, marginHorizontal: 20 }}
                  />
                ))} */}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    )
  );
};

export default TeamWarnings;

const styles = StyleSheet.create({});
