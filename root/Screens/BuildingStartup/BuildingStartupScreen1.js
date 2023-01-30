import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Image,
  Modal,
} from "react-native";

import Context from "../../Context/Context";
import CustomHeader6 from "../../Components/CustomHeader6";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import MyText from "../../Components/Text";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";

const BuildingStartupScreen1 = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const { accessToken } = useContext(CartProvider);

  const progressStepsStyle = {
    activeStepIconBorderColor: colors.Bluish,
    activeLabelColor: colors.text,
    activeStepNumColor: colors.text,
    activeStepIconColor: colors.white,
    completedStepIconColor: colors.Bluish,
    completedProgressBarColor: colors.Bluish,
    completedCheckColor: colors.white,
    labelFontSize: 9,
  };

  const buttonTextStyle = {
    color: colors.white,
    fontSize: 14,
  };

  const buttonStyle = {
    backgroundColor: colors.Bluish,
    width: "111%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginRight: 233,
  };
  const [startupid, setstartupid] = useState();

  const Screen1 = () => {
    const [businessName, setbusinessName] = useState();
    const [problemstatement, setproblemstatement] = useState();
    const [impactstatement, setimpactstatement] = useState();
    const [competition, setCompetition] = useState();
    const [story, setstory] = useState();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: "Agriculture", value: "Agriculture" },
      { label: "Art and design", value: "Art and design" },
      { label: "Automotive", value: "Automotive" },
      { label: "Aviation", value: "Aviation" },
      { label: "Construction", value: "Construction" },
      { label: "Education", value: "Education" },
      { label: "Energy and utilities", value: "Energy and utilities" },
      { label: "Entertainment", value: "Entertainment" },
      { label: "Finance", value: "Finance" },
      { label: "Food and beverage", value: "Food and beverage" },
      {
        label: "Government and public sector",
        value: "Government and public sector",
      },
      { label: "Health", value: "Health" },
      { label: "Hospitality", value: "Hospitality" },
      { label: "Manufacturing", value: "Manufacturing" },
      {
        label: "Marketing and advertising",
        value: "Marketing and advertising",
      },
      { label: "Nonprofit organizations", value: "Nonprofit organizations" },
      { label: "Personal care and beauty", value: "Personal care and beauty" },
      { label: "Professional services", value: "Professional services" },
      { label: "Real estate", value: "Real estate" },
      { label: "Retail", value: "Retail" },
      { label: "Shipping and logistics", value: "Shipping and logistics" },
      { label: "Software", value: "Software" },
      { label: "Technology", value: "Technology" },
      { label: "Telecommunications", value: "Telecommunications" },
      { label: "Transportation", value: "Transportation" },
      { label: "Travel and tourism", value: "Travel and tourism" },
      { label: "E-commerce", value: "E-commerce" },
      { label: "Environmental services", value: "Environmental services" },
      { label: "Fitness", value: "Fitness" },
      { label: "Other", value: "Other" },
    ]);
    const [location, setLocation] = useState();
    const [budget, setBudget] = useState();
    const [userimg, setimg] = useState();
    const [getScreen, setScreen] = useState(false);
    const [getmedia, setmedia] = useState(false);
    const [getmediatype, setmediatype] = useState(false);
    const [getmodalvisible1, setModalVisible1] = useState(false);
    const [getmodalvisible2, setModalVisible2] = useState(false);
    const [getmodalvisible3, setModalVisible3] = useState(false);
    const [getmodalvisible4, setModalVisible4] = useState(false);

    const pickImg = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [10, 10],
        quality: 1,
        base64: true,
      });
      console.log(result);

      if (!result.canceled) {
        setimg(result.assets[0].uri);
      }
    };
    const pickMedia = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [10, 10],
        quality: 1,
        base64: true,
      });
      console.log(result);

      if (!result.canceled) {
        setmedia(result.assets[0].uri);
        setmediatype(result.assets[0].type);
      }
    };

    const step1 = () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
      };

      axios
        .post(
          "https://stepdev.up.railway.app/startup/saveOnboarding",
          {
            formStep: "1",
            businessName: businessName,
            problemStatement: problemstatement,
            impactStatement: impactstatement,
            competition: competition,
            story: story,
            budget: budget,
            category: value,
            location: location,
            promoMedia: {
              mediatype: getmediatype,
              url: getmedia,
            },
            logo: userimg,
          },
          config
        )
        .then((res) => {
          console.log(res.data);
          setstartupid(res.data.startUp._id);
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Your Information is successfully saved",
            text2: "Press Proceed to continue",
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    if (getScreen == false) {
      return (
        <ScrollView>
          <View
            style={[
              styles.container,
              { backgroundColor: colors.background, margin: 30 },
            ]}
          >
            <Modal animationType="fade" visible={getmodalvisible1}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      padding: 5,
                      marginBottom: 20,
                      borderColor: "#23232380",

                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <MyText
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        marginRight: 50,
                        color: "#23232380",
                      }}
                    >
                      More Info (Problem Statement)
                    </MyText>
                    <Entypo
                      name="circle-with-cross"
                      size={20}
                      color="#232323AB"
                      onPress={() => {
                        setModalVisible1(false);
                      }}
                    />
                  </View>
                  <MyText
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    What problem is your product/service solving?
                  </MyText>
                  <MyText
                    style={{
                      fontSize: 11,
                      fontWeight: "500",
                      marginTop: 6,
                      marginBottom: 6,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam venenatis sit amet risus a bibendum. Integer a nibh
                    feugiat, congue nunc ac, auctor tortor. Nam luctus libero
                    sed tortor luctus, sit amet porttitor ex dignissim. Nam
                    vitae sem tortor. Etiam in risus egestas, ultricies dui nec,
                    tempor ante. Vestibulum eu imperdiet velit,
                  </MyText>
                  <MyText
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      marginTop: 6,
                      marginBottom: 6,
                      alignSelf: "flex-start",
                      color: colors.Bluish,
                    }}
                  >
                    Describe the specific need of your customer’s problem and
                    how your product/service solves it.
                  </MyText>
                </View>
              </View>
            </Modal>
            <Modal animationType="fade" visible={getmodalvisible2}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      padding: 5,
                      marginBottom: 20,
                      borderColor: "#23232380",

                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <MyText
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        marginRight: 50,
                        color: "#23232380",
                      }}
                    >
                      More Info (Impact Statement)
                    </MyText>
                    <Entypo
                      name="circle-with-cross"
                      size={20}
                      color="#232323AB"
                      onPress={() => {
                        setModalVisible2(false);
                      }}
                    />
                  </View>
                  <MyText
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      alignSelf: "flex-start",
                    }}
                  >
                    How big is the market?
                  </MyText>
                  <MyText
                    style={{
                      fontSize: 11,
                      fontWeight: "500",
                      marginTop: 6,
                      marginBottom: 6,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam venenatis sit amet risus a bibendum. Integer a nibh
                    feugiat, congue nunc ac, auctor tortor. Nam luctus libero
                    sed tortor luctus, sit amet porttitor ex dignissim. Nam
                    vitae sem tortor. Etiam in risus egestas, ultricies dui nec,
                    tempor ante. Vestibulum eu imperdiet velit,
                  </MyText>
                  <MyText
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      marginTop: 6,
                      marginBottom: 6,
                      alignSelf: "flex-start",
                      color: colors.Bluish,
                    }}
                  >
                    How strong is the demand? How saturated is the market?
                  </MyText>
                </View>
              </View>
            </Modal>
            <Modal animationType="fade" visible={getmodalvisible3}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      padding: 5,
                      marginBottom: 20,
                      borderColor: "#23232380",

                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <MyText
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        marginRight: 50,
                        color: "#23232380",
                      }}
                    >
                      More Info (Competition)
                    </MyText>
                    <Entypo
                      name="circle-with-cross"
                      size={20}
                      color="#232323AB"
                      onPress={() => {
                        setModalVisible3(false);
                      }}
                    />
                  </View>
                  <MyText
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      alignSelf: "flex-start",
                    }}
                  >
                    Competition details. SWOT analysis. Pros and cons of
                    competitors.
                  </MyText>
                  <MyText
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      alignSelf: "flex-start",
                    }}
                  >
                    What's unique about competitors and your business?
                  </MyText>
                  <MyText
                    style={{
                      fontSize: 11,
                      fontWeight: "500",
                      marginTop: 6,
                      marginBottom: 6,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam venenatis sit amet risus a bibendum. Integer a nibh
                    feugiat, congue nunc ac, auctor tortor. Nam luctus libero
                    sed tortor luctus, sit amet porttitor ex dignissim. Nam
                    vitae sem tortor. Etiam in risus egestas, ultricies dui nec,
                    tempor ante. Vestibulum eu imperdiet velit,
                  </MyText>
                  <MyText
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      marginTop: 6,
                      marginBottom: 6,
                      alignSelf: "flex-start",
                      color: colors.Bluish,
                    }}
                  >
                    Why would the customer choose you over your competitors?
                  </MyText>
                </View>
              </View>
            </Modal>
            <Modal animationType="fade" visible={getmodalvisible4}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      padding: 5,
                      marginBottom: 20,
                      borderColor: "#23232380",

                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <MyText
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        marginRight: 50,
                        color: "#23232380",
                      }}
                    >
                      More Info (Tell a story)
                    </MyText>
                    <Entypo
                      name="circle-with-cross"
                      size={20}
                      color="#232323AB"
                      onPress={() => {
                        setModalVisible4(false);
                      }}
                    />
                  </View>
                  <MyText
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      alignSelf: "flex-start",
                    }}
                  >
                    Who's you Target audience? What are Price points of your
                    products/services?
                  </MyText>

                  <MyText
                    style={{
                      fontSize: 11,
                      fontWeight: "500",
                      marginTop: 6,
                      marginBottom: 6,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam venenatis sit amet risus a bibendum. Integer a nibh
                    feugiat, congue nunc ac, auctor tortor. Nam luctus libero
                    sed tortor luctus, sit amet porttitor ex dignissim. Nam
                    vitae sem tortor. Etiam in risus egestas, ultricies dui nec,
                    tempor ante. Vestibulum eu imperdiet velit,
                  </MyText>
                  <MyText
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      marginTop: 6,
                      marginBottom: 6,
                      alignSelf: "flex-start",
                      color: colors.Bluish,
                    }}
                  >
                    Criteria and constraints. Brief Business plan. Projections.
                  </MyText>
                </View>
              </View>
            </Modal>
            <MyText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: colors.text,
                alignSelf: "flex-start",
                marginBottom: 10,
              }}
            >
              Enter the details
            </MyText>
            <MyText
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#ACA9A9",
                alignSelf: "flex-start",
                marginBottom: 10,
              }}
            >
              Leave boxes empty that doesn’t apply you.
            </MyText>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(businessName) => setbusinessName(businessName)}
                placeholder="Business Name"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
              />
            </View>

            <View style={styles.SectionStyle2}>
              <TextInput
                style={styles.inputStyle2}
                onChangeText={(problemstatement) =>
                  setproblemstatement(problemstatement)
                }
                placeholder="Problem Statement"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
                multiline={true}
                numberOfLines={5}
              />
              <Pressable
                style={{
                  backgroundColor: "#EEEEEE",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                }}
                onPress={() => {
                  setModalVisible1(true);
                }}
              >
                <AntDesign name="questioncircleo" size={20} color="#232323AB" />
              </Pressable>
            </View>

            <View style={styles.SectionStyle2}>
              <TextInput
                style={styles.inputStyle2}
                onChangeText={(impactstatement) =>
                  setimpactstatement(impactstatement)
                }
                placeholder="Impact Statement"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
                multiline={true}
                numberOfLines={5}
              />
              <Pressable
                style={{
                  backgroundColor: "#EEEEEE",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                }}
                onPress={() => {
                  setModalVisible2(true);
                }}
              >
                <AntDesign name="questioncircleo" size={20} color="#232323AB" />
              </Pressable>
            </View>

            <View style={styles.SectionStyle2}>
              <TextInput
                style={styles.inputStyle2}
                onChangeText={(competition) => setCompetition(competition)}
                placeholder="Competition"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
                multiline={true}
                numberOfLines={5}
              />
              <Pressable
                style={{
                  backgroundColor: "#EEEEEE",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                }}
                onPress={() => {
                  setModalVisible3(true);
                }}
              >
                <AntDesign name="questioncircleo" size={20} color="#232323AB" />
              </Pressable>
            </View>

            <View style={styles.SectionStyle2}>
              <TextInput
                style={styles.inputStyle2}
                onChangeText={(story) => setstory(story)}
                placeholder="Tell a story to attract investors"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
                multiline={true}
                numberOfLines={5}
              />
              <Pressable
                style={{
                  backgroundColor: "#EEEEEE",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                }}
                onPress={() => {
                  setModalVisible4(true);
                }}
              >
                <AntDesign name="questioncircleo" size={20} color="#232323AB" />
              </Pressable>
            </View>

            <View style={styles.SectionStyle}>
              <DropDownPicker
                style={[styles.inputStyle, { borderColor: "#EEEEEE" }]}
                textStyle={{ color: "#ACA9A9" }}
                placeholder="Category"
                autoScroll={true}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(location) => setLocation(location)}
                placeholder="Location"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(budget) => setBudget(budget)}
                placeholder="Budget"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
              />
            </View>

            <MyText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: colors.text,
                alignSelf: "flex-start",
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              Upload Business Plan
            </MyText>

            <Pressable
              style={{
                backgroundColor: colors.white,
                width: "100%",
                height: 50,
                borderRadius: 10,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {}}
            >
              <View style={{ flexDirection: "row" }}>
                <MyText
                  style={{
                    fontSize: 14,
                    margin: 9,
                  }}
                >
                  Upload in .PDF
                </MyText>

                <MyText
                  style={{
                    fontSize: 11,
                    margin: 9,
                    color: "#2323235E",
                  }}
                >
                  Select from storage
                </MyText>
                <Image
                  source={require("../../../assets/img/pdf.png")}
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: "center",
                    margin: 6,
                  }}
                />
              </View>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: "#EEEEEE",
                width: "100%",
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {
                setScreen(true);
              }}
            >
              <MyText
                style={{
                  fontSize: 14,
                }}
              >
                Save
              </MyText>
            </Pressable>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View
            style={[
              styles.container,
              { backgroundColor: colors.background, margin: 30 },
            ]}
          >
            <MyText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: colors.text,
                alignSelf: "flex-start",
                marginBottom: 10,
              }}
            >
              Upload your Logo
            </MyText>

            <Pressable
              onPress={() => {
                pickImg();
              }}
            >
              {userimg ? (
                <View>
                  <Image
                    style={{
                      height: 124,
                      width: 124,
                      alignSelf: "center",
                      borderRadius: 100,
                    }}
                    source={{ uri: userimg }}
                  />
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../../../assets/img/upload.png")}
                    style={{ height: 124, width: 124, alignSelf: "center" }}
                  />
                  <Entypo
                    name="camera"
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      marginLeft: 44,
                    }}
                    size={37}
                    color="#23232380"
                  />
                </View>
              )}
            </Pressable>

            <MyText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: colors.text,
                alignSelf: "flex-start",
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              Add Cover Image or Video
            </MyText>

            {getmedia ? (
              <Pressable
                style={{
                  backgroundColor: "#00FF00",
                  width: 180,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  alignSelf: "flex-start",
                }}
                onPress={() => {}}
              >
                <View style={{ flexDirection: "row" }}>
                  <Entypo
                    name="check"
                    style={{ marginRight: 5 }}
                    size={20}
                    color={colors.white}
                  />
                  <MyText
                    style={{
                      fontSize: 14,
                    }}
                  >
                    Uploaded
                  </MyText>
                </View>
              </Pressable>
            ) : (
              <Pressable
                style={{
                  backgroundColor: "#EEEEEE",
                  width: 180,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  alignSelf: "flex-start",
                }}
                onPress={() => {
                  pickMedia();
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Entypo
                    name="image"
                    style={{ marginRight: 5 }}
                    size={20}
                    color={colors.Bluish}
                  />
                  <MyText
                    style={{
                      fontSize: 14,
                    }}
                  >
                    Upload Media
                  </MyText>
                </View>
              </Pressable>
            )}
            <Pressable
              style={{
                backgroundColor: "#EEEEEE",
                width: "100%",
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {
                step1();
              }}
            >
              <MyText
                style={{
                  fontSize: 14,
                }}
              >
                Save
              </MyText>
            </Pressable>
          </View>
        </ScrollView>
      );
    }
  };

  const Screen2 = () => {
    const [getScreen2, setScreen2] = useState(false);
    const [search, setsearch] = useState();
    const [positionn, setposition] = useState();
    const [role, setrole] = useState();
    const [getusers, setusers] = useState([
      //   {
      //     id: 1,
      //     name: "Michael",
      //     role: "Designer",
      //     img: require("../../../assets/img/user.png"),
      //   },
      //   {
      //     id: 1,
      //     name: "Michael",
      //     role: "Designer",
      //     img: require("../../../assets/img/user.png"),
      //   },
    ]);
    const [showuser, setshowuser] = useState(false);
    const [image, setimage] = useState();

    const pickMedia = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [10, 10],
        quality: 1,
        base64: true,
      });
      console.log(result);

      if (!result.canceled) {
        setimage(result.assets[0].uri);
      }
    };

    const step2 = () => {
      console.log("hello");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
      };

      axios
        .post(
          "https://stepdev.up.railway.app/startup/saveOnboarding",
          {
            startupid: startupid,
            formStep: "2",
            members: [
              {
                member: "63babb1954b661431a0519b5",
                position: positionn,
                role: role,
              },
            ],
          },
          config
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    if (getScreen2 == false) {
      return (
        <ScrollView>
          <View
            style={[
              styles.container,
              { backgroundColor: colors.background, margin: 30 },
            ]}
          >
            <Pressable
              style={{
                width: 160,
                height: 150,
                borderRadius: 10,
                borderWidth: 3,
                borderStyle: "dotted",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                alignSelf: "flex-start",
              }}
              onPress={() => {
                setScreen2(true);
              }}
            >
              <AntDesign
                name="addusergroup"
                style={{ marginRight: 5 }}
                size={55}
              />
              <MyText
                style={{
                  fontSize: 14,
                }}
              >
                Add Member
              </MyText>
            </Pressable>

            {showuser ? (
              <View style={{ flex: 1 }}>
                <FlatList
                  data={getusers}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  columnWrapperStyle={{ flexWrap: "wrap" }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        width: 160,
                        height: 150,
                        borderRadius: 10,
                        justifyContent: "center",
                        marginTop: 20,
                        marginRight: 6,
                        alignItems: "center",
                        alignSelf: "flex-start",
                        backgroundColor: "#EEEEEEEE",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        backgroundColor: "#ffff",
                        marginBottom: 90,
                      }}
                    >
                      <Image
                        source={item.img}
                        style={{
                          height: 73,
                          width: 73,
                          borderRadius: 50,
                          alignSelf: "center",
                        }}
                      />

                      <MyText
                        style={{
                          fontSize: 14,
                          fontWeight: "500",
                          color: colors.text,
                        }}
                      >
                        {item.name}
                      </MyText>
                      <MyText
                        style={{
                          fontSize: 10,
                          fontWeight: "400",
                          color: "#232323BF",
                        }}
                      >
                        {item.role}
                      </MyText>
                      <Ionicons
                        name="chatbubble-ellipses"
                        size={20}
                        color="#B2B1FF"
                      />
                    </View>
                  )}
                />
                <Pressable
                  style={{
                    backgroundColor: "#EEEEEE",
                    height: 50,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                  onPress={() => {}}
                >
                  <MyText
                    style={{
                      fontSize: 14,
                    }}
                  >
                    Save
                  </MyText>
                </Pressable>
              </View>
            ) : null}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View
            style={[
              styles.container,
              { backgroundColor: colors.background, margin: 30 },
            ]}
          >
            <MyText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: colors.text,
                alignSelf: "flex-start",
                marginBottom: 10,
              }}
            >
              Add Team Member
            </MyText>

            <Pressable
              onPress={() => {
                pickMedia();
              }}
            >
              {image ? (
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: image }}
                    style={{
                      height: 124,
                      width: 124,
                      alignSelf: "center",
                      borderRadius: 100,
                    }}
                  />
                  <Entypo
                    name="camera"
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      marginLeft: 44,
                    }}
                    size={37}
                    color="#23232380"
                  />
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../../../assets/img/upload.png")}
                    style={{ height: 124, width: 124, alignSelf: "center" }}
                  />
                  <Entypo
                    name="camera"
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      marginLeft: 44,
                    }}
                    size={37}
                    color="#23232380"
                  />
                </View>
              )}
            </Pressable>

            <View style={styles.SectionStyle}>
              <TextInput
                style={[
                  styles.inputStyle,
                  { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                ]}
                onChangeText={(search) => setsearch(search)}
                placeholder="Search from users" //12345
                placeholderTextColor="#ACA9A9"
                keyboardType="default"
              />
              <Pressable
                onPress={() => {}}
                style={{
                  backgroundColor: "#EEEEEE",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  padding: 8,
                }}
              >
                <AntDesign name="search1" size={18} color={colors.Bluish} />
              </Pressable>
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(positionn) => setposition(positionn)}
                placeholder="Position" //12345
                placeholderTextColor="#ACA9A9"
                keyboardType="default"
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(role) => setrole(role)}
                placeholder="Role" //12345
                placeholderTextColor="#ACA9A9"
                keyboardType="default"
              />
            </View>

            <Pressable
              style={{
                backgroundColor: colors.Bluish,
                width: "100%",
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {
                setshowuser(true);
                setScreen2(false);
                //step2();
              }}
            >
              <MyText
                style={{
                  color: colors.white,
                  fontSize: 14,
                }}
              >
                Add Member
              </MyText>
            </Pressable>
          </View>
        </ScrollView>
      );
    }
  };

  const Screen3 = () => {
    const [roles, setroles] = useState();
    const [rolesbrokendown, setrolesbrokendown] = useState();
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
      {
        label: "Looking for partner to join business",
        value: "Looking for partner to join business",
      },
      {
        label: "Looking for freelancer to hire",
        value: "Looking for freelancer to hire",
      },
    ]);
    const [rolescreen, setrolescreen] = useState(false);
    const [teamroleScreen, setteamroleScreen] = useState(true);
    const [termsScreen, setTermScreen] = useState(false);
    const [getcheck, setcheck] = useState(false);
    const [getcheck2, setcheck2] = useState(false);
    const [getcheck3, setcheck3] = useState(false);
    const [partnershipTerms, setpartnershipTerms] = useState();
    const step3 = () => {
      console.log("hello");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
      };

      axios
        .post(
          "https://stepdev.up.railway.app/startup/saveOnboarding",
          {
            startupid: startupid,
            formStep: "3",
            partnershipTerms: partnershipTerms,
          },
          config
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    if (teamroleScreen == true) {
      return (
        <ScrollView>
          <View
            style={[
              styles.container,
              { backgroundColor: colors.background, margin: 30 },
            ]}
          >
            <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
              <Pressable
                style={{
                  backgroundColor: colors.Bluish,
                  width: 104,
                  height: 24,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  alignSelf: "flex-start",
                  marginRight: 10,
                }}
                onPress={() => {
                  setTermScreen(false);
                  setrolescreen(false);
                  setteamroleScreen(true);
                }}
              >
                <MyText
                  style={{
                    color: colors.white,
                    fontSize: 8,
                    fontWeight: "500",
                  }}
                >
                  Team Roles
                </MyText>
              </Pressable>

              <Pressable
                style={{
                  width: 104,
                  height: 24,
                  borderRadius: 5,
                  justifyContent: "center",
                  borderWidth: 1,
                  alignItems: "center",
                  marginTop: 20,
                  alignSelf: "flex-start",
                }}
                onPress={() => {
                  setteamroleScreen(false);
                  setrolescreen(false);
                  setTermScreen(true);
                  console.log(termsScreen);
                }}
              >
                <MyText
                  style={{
                    fontSize: 8,
                    fontWeight: "500",
                  }}
                >
                  Partnership Terms
                </MyText>
              </Pressable>
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(roles) => setroles(roles)}
                placeholder="Role" //12345
                placeholderTextColor="#ACA9A9"
                keyboardType="default"
              />
            </View>

            <View style={styles.SectionStyle2}>
              <TextInput
                style={styles.inputStyle2}
                onChangeText={(rolesbrokendown) =>
                  setrolesbrokendown(rolesbrokendown)
                }
                placeholder="Role Broken Down"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
                multiline={true}
                numberOfLines={5}
              />
              <Pressable
                style={{
                  backgroundColor: "#EEEEEE",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                }}
                onPress={() => {}}
              >
                <AntDesign name="questioncircleo" size={20} color="#232323AB" />
              </Pressable>
            </View>

            <MyText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: colors.text,
                alignSelf: "flex-start",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              For this Role
            </MyText>

            <View style={styles.SectionStyle}>
              <DropDownPicker
                style={[styles.inputStyle, { borderColor: "#EEEEEE" }]}
                textStyle={{ color: "#ACA9A9" }}
                placeholder="Looking for partner to join business"
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
              />
            </View>
            <Pressable
              style={{
                backgroundColor: "#232323",
                height: 50,
                width: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {
                setTermScreen(false);
                setteamroleScreen(false);
                setrolescreen(true);
              }}
            >
              <MyText
                style={{
                  fontSize: 14,
                  color: colors.white,
                }}
              >
                Add Role
              </MyText>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#EEEEEE",
                height: 50,
                width: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {}}
            >
              <MyText
                style={{
                  fontSize: 14,
                }}
              >
                Save
              </MyText>
            </Pressable>
          </View>
        </ScrollView>
      );
    }
    if (rolescreen == true) {
      return (
        <ScrollView>
          <View
            style={[
              styles.container,
              { backgroundColor: colors.background, margin: 30 },
            ]}
          >
            <View style={styles.SectionStyle3}>
              <Checkbox
                style={{ margin: 14 }}
                value={getcheck}
                onValueChange={setcheck}
                color={getcheck ? colors.Bluish : undefined}
              />
              <MyText
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: colors.text,
                  ustifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                Graphic Designer
              </MyText>
            </View>

            <View style={styles.SectionStyle3}>
              <Checkbox
                style={{ margin: 14 }}
                value={getcheck2}
                onValueChange={setcheck2}
                color={getcheck2 ? colors.Bluish : undefined}
              />
              <MyText
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: colors.text,
                  ustifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                Project Manager
              </MyText>
            </View>

            <View style={styles.SectionStyle3}>
              <Checkbox
                style={{ margin: 14 }}
                value={getcheck3}
                onValueChange={setcheck3}
                color={getcheck3 ? colors.Bluish : undefined}
              />
              <MyText
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: colors.text,
                  ustifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                Content Writers
              </MyText>
            </View>

            <Pressable
              style={{
                height: 50,
                borderWidth: 2,
                borderStyle: "dotted",
                width: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {}}
            >
              <MyText
                style={{
                  fontSize: 14,
                }}
              >
                + Add Team Role
              </MyText>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#EEEEEE",
                height: 50,
                width: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {
                setteamroleScreen(true);
                setrolescreen(false);
                setTermScreen(false);
              }}
            >
              <MyText
                style={{
                  fontSize: 14,
                }}
              >
                Save
              </MyText>
            </Pressable>
          </View>
        </ScrollView>
      );
    }

    if (termsScreen == true) {
      return (
        <ScrollView>
          <View
            style={[
              styles.container,
              { backgroundColor: colors.background, margin: 30 },
            ]}
          >
            <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
              <Pressable
                style={{
                  backgroundColor: colors.Bluish,
                  width: 104,
                  height: 24,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  alignSelf: "flex-start",
                  marginRight: 10,
                }}
                onPress={() => {
                  setTermScreen(false);
                  setrolescreen(false);
                  setteamroleScreen(true);
                }}
              >
                <MyText
                  style={{
                    color: colors.white,
                    fontSize: 8,
                    fontWeight: "500",
                  }}
                >
                  Team Roles
                </MyText>
              </Pressable>

              <Pressable
                style={{
                  width: 104,
                  height: 24,
                  borderRadius: 5,
                  justifyContent: "center",
                  borderWidth: 1,
                  alignItems: "center",
                  marginTop: 20,
                  alignSelf: "flex-start",
                }}
                onPress={() => {
                  setteamroleScreen(false);
                  setrolescreen(false);
                  setTermScreen(true);
                  console.log(termsScreen);
                }}
              >
                <MyText
                  style={{
                    fontSize: 8,
                    fontWeight: "500",
                  }}
                >
                  Partnership Terms
                </MyText>
              </Pressable>
            </View>

            <View style={styles.SectionStyle2}>
              <TextInput
                style={styles.inputStyle2}
                onChangeText={(partnershipTerms) =>
                  setpartnershipTerms(partnershipTerms)
                }
                placeholder="General Partnership Terms"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
                multiline={true}
                numberOfLines={5}
              />
              <Pressable
                style={{
                  backgroundColor: "#EEEEEE",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                }}
                onPress={() => {}}
              >
                <AntDesign name="questioncircleo" size={20} color="#232323AB" />
              </Pressable>
            </View>

            <Pressable
              style={{
                backgroundColor: "#EEEEEE",
                height: 50,
                width: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {
                step3();
              }}
            >
              <MyText
                style={{
                  fontSize: 14,
                }}
              >
                Save
              </MyText>
            </Pressable>
          </View>
        </ScrollView>
      );
    }
  };

  const Screen4 = () => {
    const [milestone, setmilestone] = useState(false);
    const [milestonetitle, setmilestonetitle] = useState();
    const [description, setDescription] = useState();
    const [duedate, setduedate] = useState();
    const [milestonelist, setmilestonelist] = useState([
      {
        title: null,
        description: null,
        date: null,
      },
    ]);
    const step4 = () => {
      console.log("hello");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
      };

      axios
        .post(
          "https://stepdev.up.railway.app/startup/saveOnboarding",
          {
            startupid: startupid,
            formStep: "4",
            milestones: {
              title: milestonetitle,
              description: description,
              dueDate: duedate,
            },
          },
          config
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    if (milestone == false) {
      return (
        <ScrollView>
          <View
            style={[
              styles.container,
              { backgroundColor: colors.background, margin: 30 },
            ]}
          >
            <MyText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: colors.text,
                alignSelf: "flex-start",
                marginBottom: 10,
              }}
            >
              Creating Milestones
            </MyText>
            <FlatList
              data={milestonelist}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: "#D9D9D947",
                    height: 98,
                    width: 334,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#D1D1D1",
                        borderRadius: 50,
                        height: 38,
                        width: 38,
                        alignSelf: "flex-start",
                      }}
                    >
                      <MyText
                        style={{
                          fontSize: 11,
                          fontWeight: "500",
                          alignSelf: "center",
                          marginTop: 9,
                        }}
                      >
                        0%
                      </MyText>
                    </View>
                    <View>
                      <MyText
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          margin: 4,
                        }}
                      >
                        {item.title}
                      </MyText>
                      <MyText
                        style={{
                          fontSize: 12,
                          fontWeight: "400",
                          marginRight: 5,
                        }}
                      >
                        {item.description}
                      </MyText>
                    </View>

                    <Entypo
                      name="dots-three-horizontal"
                      size={17}
                      color="#A1A1A1"
                    />
                  </View>
                </View>
              )}
            />

            <Pressable
              style={{
                height: 50,
                borderWidth: 2,
                borderStyle: "dotted",
                width: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {
                setmilestone(true);
              }}
            >
              <MyText
                style={{
                  fontSize: 14,
                }}
              >
                + Add Milestones
              </MyText>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: "#EEEEEE",
                height: 50,
                width: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {
                step4();
              }}
            >
              <MyText
                style={{
                  fontSize: 14,
                }}
              >
                Save
              </MyText>
            </Pressable>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View
            style={[
              styles.container,
              { backgroundColor: colors.background, margin: 30 },
            ]}
          >
            <MyText
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: colors.text,
                alignSelf: "flex-start",
                marginBottom: 10,
              }}
            >
              Creating Milestones
            </MyText>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(milestonetitle) =>
                  setmilestonetitle(milestonetitle)
                }
                placeholder="Milestone Title" //12345
                placeholderTextColor="#ACA9A9"
                keyboardType="default"
              />
            </View>

            <View style={styles.SectionStyle2}>
              <TextInput
                style={styles.inputStyle2}
                onChangeText={(description) => setDescription(description)}
                placeholder="Description"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
                multiline={true}
                numberOfLines={5}
              />
              <Pressable
                style={{
                  backgroundColor: "#EEEEEE",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                }}
                onPress={() => {}}
              >
                <AntDesign name="questioncircleo" size={20} color="#232323AB" />
              </Pressable>
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle2}
                onChangeText={(duedate) => setduedate(duedate)}
                placeholder="Due Date"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
              />
              <Pressable
                style={{
                  backgroundColor: "#EEEEEE",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                }}
                onPress={() => {}}
              >
                <AntDesign name="calendar" size={20} color="#969696" />
              </Pressable>
            </View>

            <Pressable
              style={{
                backgroundColor: "#EEEEEE",
                height: 50,
                width: "100%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => {
                var obj = {};
                obj["title"] = milestonetitle;
                obj["description"] = description;
                obj["date"] = duedate;

                setmilestonelist([...milestonelist, obj]);
                setmilestone(false);
              }}
            >
              <MyText
                style={{
                  fontSize: 14,
                }}
              >
                Save
              </MyText>
            </Pressable>
          </View>
        </ScrollView>
      );
    }
  };

  const Screen5 = () => {
    const [getmodalvisible, setModalVisible] = React.useState(false);

    return (
      <ScrollView>
        <View
          style={[
            styles.container,
            { backgroundColor: colors.background, margin: 30 },
          ]}
        >
          <Modal animationType="fade" visible={getmodalvisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <AntDesign
                    name="questioncircleo"
                    size={34}
                    color="#232323AB"
                  />
                </View>
                <MyText
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  Some fields are missing in the forms. do you want to save it
                  for later?
                </MyText>
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    style={{
                      width: 138,
                      height: 41,
                      borderWidth: 1,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 7,
                      marginRight: 5,
                    }}
                    onPress={() => {}}
                  >
                    <MyText
                      style={{
                        fontSize: 16,
                        fontWeight: "400",
                      }}
                    >
                      Cancel
                    </MyText>
                  </Pressable>

                  <Pressable
                    style={{
                      width: 138,
                      height: 41,
                      backgroundColor: colors.Bluish,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 7,
                    }}
                    onPress={() => {}}
                  >
                    <MyText
                      style={{
                        fontSize: 16,
                        fontWeight: "400",
                        color: colors.white,
                      }}
                    >
                      Save
                    </MyText>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <MyText
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: colors.text,
              alignSelf: "flex-start",
              marginBottom: 10,
            }}
          >
            Upload Pitch Deck
          </MyText>

          <Pressable
            style={{
              backgroundColor: colors.white,
              width: "100%",
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={() => {}}
          >
            <View style={{ flexDirection: "row" }}>
              <MyText
                style={{
                  fontSize: 14,
                  margin: 9,
                }}
              >
                Upload in .PDF
              </MyText>

              <MyText
                style={{
                  fontSize: 11,
                  margin: 9,
                  color: "#2323235E",
                }}
              >
                Select from storage
              </MyText>
              <Image
                source={require("../../../assets/img/pdf.png")}
                style={{
                  height: 25,
                  width: 25,
                  alignSelf: "center",
                  margin: 6,
                }}
              />
            </View>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#EEEEEE",
              height: 50,
              width: "100%",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <MyText
              style={{
                fontSize: 14,
              }}
            >
              Save
            </MyText>
          </Pressable>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader6 />
      <View style={{ flex: 1 }}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Idea"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            nextBtnText="Proceed"
            previousBtnDisabled={true}
          >
            <Screen1 />
          </ProgressStep>
          <ProgressStep
            label="Team"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            nextBtnText="Proceed"
            previousBtnDisabled={true}
          >
            <Screen2 />
          </ProgressStep>
          <ProgressStep
            label="Needed Roles"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            nextBtnText="Proceed"
            previousBtnDisabled={true}
          >
            <Screen3 />
          </ProgressStep>
          <ProgressStep
            label="Milestones"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            nextBtnText="Proceed"
            previousBtnDisabled={true}
          >
            <Screen4 />
          </ProgressStep>
          <ProgressStep
            label="Pitch Deck"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            nextBtnText="Finish"
            previousBtnDisabled={true}
          >
            <Screen5 />
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};

export default BuildingStartupScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
  },
  inputStyle2: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#EEEEEE",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    textAlignVertical: "top",
    paddingTop: 10,
  },

  SectionStyle: {
    flexDirection: "row",
    height: 47,
    marginTop: 14,
    marginBottom: 5,
  },
  SectionStyle2: {
    flexDirection: "row",
    height: 239,
    marginTop: 14,
    marginBottom: 5,
    flexDirection: "row",
  },
  SectionStyle3: {
    backgroundColor: "#EEEEEE",
    height: 50,
    width: "100%",
    borderRadius: 10,
    alignSelf: "flex-start",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
