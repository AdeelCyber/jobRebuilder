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
import calender from "../../../assets/Svgs/Calender";
import questionMark from "../../../assets/Svgs/QuestionMark";
import Link from "../../../assets/Svgs/Link";
import magnifine from "../../../assets/Svgs/GreyMagnifine";
import { SearchBar } from "react-native-paper";
import TeamMember from "../../Components/TeamMember";
import TeamMemberWarning from "../../Components/TeamMemberWarning";
import WarningHistoryComp from "../../Components/WarningHistory";
import {
  SendRequestWarning,
  SendWarning,
} from "../Profile/services/FreeLancerServices";
import { Ionicons } from "@expo/vector-icons";

const Warnings = ({ navigation, route }) => {
  const [show, setshow] = useState(route.params.show);
  const [data, setData] = useState(route.params.data);
  const [personData, setPersonData] = useState(route.params.personData); // this is the person data

  const {
    theme: { colors },
  } = useContext(Context);
  const TeamWarning = {
    image: personData.image,
    text: personData.name,
    designation: personData.designation,
  };

  function handlePress(text) {
    if (text === "Submit Warning") {
      getFreelancersData();
    }
    if (text === "Request") {
      getFreelancersData2();
    }
  }
  const [input, setinput] = useState("");

  // Api call

  const getFreelancersData = async () => {
    console.log(data.startup._id, personData.id, input);
    const resp = await SendWarning(data.startup._id, personData.id, input);
    console.log(resp.data);

    if (resp.data.status === "OK") {
      console.log("request send");
      navigation.goBack();
    } else {
      console.log("request not send");
    }
  };
  // Api call 2

  const getFreelancersData2 = async () => {
    console.log(data.startup._id, personData.id, input);
    const resp = await SendRequestWarning(
      data.startup._id,
      personData.id,
      input
    );
    console.log(resp.data);

    if (resp.data.status === "OK") {
      console.log("request send");
      navigation.goBack();
    } else {
      console.log("request not send");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "space-between",
      }}
    >
      <View>
        <CustomHeader2
          Title="Warnings"
          style={{ elevation: 0 }}
          nav={navigation}
        />
        <View
          style={{
            paddingHorizontal: 23,
          }}
        >
          {/* header in */}
          <View
            style={[
              {
                flexDirection: "row",
                backgroundColor: colors.white,
                paddingVertical: 15,

                borderRadius: 10,
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            {/* 1 */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: TeamWarning.image }}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 20,
                  marginRight: 8,
                }}
              />
              <View>
                <MyText
                  style={{
                    color: colors.text,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  {TeamWarning.text}
                </MyText>

                <MyText
                  style={{
                    color: "#232323AB",
                    fontSize: 10,
                    fontSize: 11,
                    fontWeight: "500",
                  }}
                >
                  {TeamWarning.designation}
                </MyText>
              </View>
            </View>
            {/* 2 */}
            {show ? (
              <Pressable
                style={{
                  backgroundColor: colors.secondary,
                  paddingVertical: 10,
                  paddingHorizontal: 26,
                  borderRadius: 4,
                  marginLeft: 3,
                }}
                onPress={() => handlePress("chat")}
              >
                <MyText
                  style={{
                    fontSize: 10,
                    fontWeight: "500",
                    color: colors.white,
                  }}
                >
                  Chat
                </MyText>
              </Pressable>
            ) : (
              <Ionicons name="warning" size={26} color="#F50303" />
            )}
          </View>
          {/* header out */}
          {/* Text box and heading */}
          <MyText style={{ fontSize: 16, fontWeight: "500" }}>
            The reason of warning
          </MyText>
          <TextInput
            multiline={true}
            placeholderTextColor="#ACA9A9"
            placeholder="Describe the issue clearly and how to solve it"
            value={input}
            style={{
              backgroundColor: "#EEEEEE",

              borderColor: "#000000",
              color: colors.lighttext,
              padding: 8,
              width: "100%",
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
                setinput(got);
              }
            }}
          />
          {show && (
            <DynamicButton
              handlePress={handlePress}
              text={"Submit Warning"}
              color={"#FF0000"}
              textStyle={{ color: colors.white, fontSize: 14 }}
              style={{ borderRadius: 10, marginTop: 35, paddingVertical: 20 }}
            />
          )}
        </View>
      </View>
      {!show && (
        <View style={{ paddingHorizontal: 23 }}>
          <DynamicButton
            handlePress={handlePress}
            text={"Request"}
            color={colors.secondary}
            textStyle={{ color: colors.white, fontSize: 14 }}
            style={{ borderRadius: 10, marginTop: 35, paddingVertical: 20 }}
          />
          <DynamicButton
            handlePress={handlePress}
            text={"Cancel"}
            color={"#EFEFEF"}
            textStyle={{ color: colors.text, fontSize: 14 }}
            style={{ borderRadius: 10, marginTop: 10, paddingVertical: 20 }}
          />
        </View>
      )}
    </View>
  );
};

export default Warnings;

const styles = StyleSheet.create({});
