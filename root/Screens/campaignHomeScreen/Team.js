import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";

import React, { useContext, useState } from "react";
import Context from "../../Context/Context";
import CustomHeader2 from "../../Components/CustomHeader2";
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import MyText from "../../Components/Text";
import CampaignCard from "../../Components/CampaignCard";
import logo from "../../../assets/Svgs/MotoMobileLogo";
import Thumbnail from "../../../assets/img/Thumbnail.png";
import LittleNav from "../../Components/LittleNav";
import TickPara from "../../Components/TickPara";
import { Feather } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";
import DynamicButton from "../../Components/DynamicButton";
import TeamItem from "../../Components/TeamItem";
import ReactNativeModal from "react-native-modal";
import RoundQuestionMark from "../../../assets/Svgs/RoundQuestionMark";

const Team = ({ navigation, route }) => {
  const [show, setshow] = useState(route.params.show);
  const [data, setData] = useState(route.params.data);
  const [personData, setPersonData] = useState({});
  console.log(personData);

  const {
    theme: { colors },
  } = useContext(Context);
  function handlePress(text) {
    if (text == "View Profile") {
      setModalSecondVisible(true);
    } else if (text == "Send Warning") {
      setModalVisible(true);
    }
  }
  const [menu, setmenu] = useState(data.startup.members);
  // console.log(menu);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalSecondVisible, setModalSecondVisible] = useState(false);

  return (
    // main container
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      {/* header */}
      <CustomHeader2
        icon={() => <Feather name="menu" size={24} color={colors.black} />}
        Title="Team"
        nav={navigation}
      />
      {/* header out */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {menu.map(({ member, position, designation }, index) => (
          <TeamItem
            key={position}
            style={{
              marginVertical: 10,
              width: "45%",
              minWidth: "45%",
              maxWidth: "45%",
              marginRight: index % 2 === 0 ? 11 : 0,
            }}
            handleClick={handlePress}
            image={member.avatar}
            text={member.name}
            id={member._id}
            designation={position}
            personData={setPersonData}
            show={show}
          />
        ))}
      </View>
      {/* modal in */}
      <ReactNativeModal
        transparent
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 18,
            paddingBottom: 30,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{ marginVertical: 15, marginTop: 26 }}>
              <SvgImport svg={RoundQuestionMark} />
            </View>
            <View
              style={{
                paddingBottom: 20,
                paddingHorizontal: 28,
                marginBottom: 10,
              }}
            >
              <MyText
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  lineHeight: 20.83,
                  textAlign: "center",
                }}
              >
                Are tou sure you want to delete @shaheer from moto team?
              </MyText>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                style={{
                  backgroundColor: "#EAEAEA",
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 4,
                  marginRight: 3,
                }}
                onPress={() => setModalVisible(false)}
              >
                <MyText style={{ fontSize: 16, fontWeight: "400" }}>
                  Reject
                </MyText>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: colors.Red,
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 4,
                  marginLeft: 3,
                }}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Warnings", {
                    data: data,
                    personData: personData,
                    show: show,
                  });
                }}
              >
                <MyText
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    color: colors.white,
                  }}
                >
                  Warn
                </MyText>
              </Pressable>
            </View>
          </View>
        </View>
      </ReactNativeModal>
      {/* modal out */}
      {/* modal 2 in */}
      <ReactNativeModal
        transparent
        isVisible={isModalSecondVisible}
        onBackButtonPress={() => setModalSecondVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 18,
            paddingBottom: 30,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{ alignSelf: "flex-end", marginTop: 12, marginRight: 6 }}
            >
              <Feather name="more-vertical" size={25} color="#23232380" />
            </View>
            <View style={{ marginVertical: 15, marginTop: 10 }}>
              <Image
                source={{ uri: personData.image }}
                style={{
                  width: 124,
                  height: 124,
                  borderRadius: 80,
                  marginRight: 8,
                }}
              />
            </View>
            <View
              style={{
                paddingBottom: 20,
                paddingHorizontal: 28,
                marginBottom: 10,
              }}
            >
              <MyText
                style={{ textAlign: "center", fontWeight: "500", fontSize: 20 }}
              >
                {personData.name}
                {"\n"}
                <MyText
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: 14,
                    color: colors.lighttext,
                  }}
                >
                  {personData.designation}
                </MyText>
              </MyText>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                style={{
                  backgroundColor: colors.secondary,
                  paddingVertical: 15,
                  paddingHorizontal: 35,
                  borderRadius: 8,
                  marginRight: 6,
                }}
                onPress={() => setModalSecondVisible(false)}
              >
                <MyText
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color: colors.white,
                  }}
                >
                  View Profile
                </MyText>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: colors.text,
                  paddingVertical: 15,
                  paddingHorizontal: 55,
                  borderRadius: 8,
                  marginLeft: 6,
                }}
                onPress={() => setModalSecondVisible(false)}
              >
                <MyText
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color: colors.white,
                  }}
                >
                  Chat
                </MyText>
              </Pressable>
            </View>
          </View>
        </View>
      </ReactNativeModal>
      {/* modal 2 out */}
    </View>
  );
};

export default Team;

const styles = StyleSheet.create({});
