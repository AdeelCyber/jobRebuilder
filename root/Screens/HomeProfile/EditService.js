import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  FlatList,
} from "react-native";

import Context from "../../Context/Context";
import MyText from "../../Components/Text";

import Icon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import CustomHeader9 from "../../Components/CustomHeader9";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import { editServices } from "../Profile/services/ProfileServices";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../../Components/Loader";
const EditService = ({ route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const { userinfo, screen } = route.params != undefined ? route.params : {};

  const navigation = useNavigation();
  const [description, setdescription] = useState(false);
  const [skills, setskills] = useState(false);
  const [rates, setrates] = useState(false);
  //const [open, setOpen] = useState(false);
  const [value2, setValue] = useState(`${userinfo?.services.hourlyRate}`);
  const [userdesc, setuserdesc] = useState(userinfo?.services.description);

  const [skillsofuser, setskillsofuser] = useState(userinfo?.services.skills);

  const { accessToken } = useContext(CartProvider);
  const [userskill, setuserskill] = useState();
  const [getcondition, setcondition] = useState(false);
  const deleteItem = (index) => {
    const r = skillsofuser.filter((i, e) => e != index);

    setskillsofuser(r);
  };
  const edit = async (n) => {
    setcondition(true);
    const res = await editServices(accessToken, userdesc, value2, skillsofuser);
    console.log(res.status);
    console.log(res.data);
    if (res.status == 201) {
      setcondition(false);
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Updated Successfully",
        text2: ".",
      });
      navigation.navigate("HomeService");
    }
    setcondition(false);
  };
  useEffect(() => {
    console.log(screen);
    if (screen === "skill") {
      setskills(true);
    }
    if (screen === "desc") {
      setdescription(true);
    }
    if (screen === "rate") {
      setrates(true);
    }
  }, []);
  if (getcondition) {
    return (
      <Loader visible={getcondition} color="white" indicatorSize="large" />
    );
  }
  return (
    <View style={{ backgroundColor: colors.background }}>
      <CustomHeader9 nav={navigation} />
      <ScrollView style={{ backgroundColor: colors.background }}>
        <View style={[styles.container, { marginTop: 30 }]}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            {description ? (
              <TouchableOpacity style={styles.btnstyle} onPress={() => {}}>
                <MyText style={styles.btntext}>Description</MyText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.btnstyle,
                  { backgroundColor: colors.white, borderWidth: 1 },
                ]}
                onPress={() => {
                  setdescription(true);
                  setrates(false);
                  setskills(false);
                }}
              >
                <MyText style={[styles.btntext, { color: colors.black }]}>
                  Description
                </MyText>
              </TouchableOpacity>
            )}

            {rates ? (
              <TouchableOpacity style={styles.btnstyle} onPress={() => {}}>
                <MyText style={styles.btntext}>Rates</MyText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.btnstyle,
                  { backgroundColor: colors.white, borderWidth: 1 },
                ]}
                onPress={() => {
                  setdescription(false);
                  setrates(true);
                  setskills(false);
                }}
              >
                <MyText style={[styles.btntext, { color: colors.black }]}>
                  Rates
                </MyText>
              </TouchableOpacity>
            )}

            {skills ? (
              <TouchableOpacity style={styles.btnstyle}>
                <MyText style={styles.btntext}>Skills</MyText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.btnstyle,
                  { backgroundColor: colors.white, borderWidth: 1 },
                ]}
                onPress={() => {
                  setdescription(false);
                  setrates(false);
                  setskills(true);
                }}
              >
                <MyText style={[styles.btntext, { color: colors.black }]}>
                  Skills
                </MyText>
              </TouchableOpacity>
            )}
          </View>

          {description && (
            <View style={{ marginTop: 30 }}>
              <View style={styles.box}>
                <TextInput
                  style={{
                    fontSize: 11,
                    fontWeight: "400",
                    margin: 20,
                    textAlign: "justify",
                  }}
                  value={userdesc}
                  onChangeText={(userdesc) => setuserdesc(userdesc)}
                  multiline={true}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.Bluish,
                  width: 345,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
                onPress={() => {
                  setuserdesc(userdesc);
                  edit("description");
                }}
              >
                <MyText
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  Update
                </MyText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.red,
                  width: 345,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
                onPress={() => {
                  navigation.navigate("HomeService");
                }}
              >
                <MyText
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  Cancel
                </MyText>
              </TouchableOpacity>
            </View>
          )}
          {rates && (
            <View style={{ marginTop: 30 }}>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  keyboardType="number-pad"
                  value={value2}
                  onChangeText={(value2) => setValue(value2)}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.Bluish,
                  width: 345,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
                onPress={() => {
                  edit("rates");
                }}
              >
                <MyText
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  Update
                </MyText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.red,
                  width: 345,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
                onPress={() => {
                  navigation.navigate("HomeService");
                }}
              >
                <MyText
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  Cancel
                </MyText>
              </TouchableOpacity>
            </View>
          )}
          {skills && (
            <View style={{ marginTop: 30 }}>
              <View
                style={[
                  styles.box,
                  { shadowColor: colors.Bluish, padding: 10 },
                ]}
              >
                <FlatList
                  data={skillsofuser}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  style={{ height: 60 }}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        marginTop: 15,
                        marginLeft: 10,
                        height: 22,
                        width: 90,
                        backgroundColor: colors.Bluish,
                        borderRadius: 5,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <MyText
                          style={{
                            color: colors.white,
                            fontSize: 11,
                            fontWeight: "400",
                            alignSelf: "center",
                            margin: 3,
                            marginLeft: 5,
                          }}
                        >
                          {item}
                        </MyText>
                        <TouchableOpacity
                          style={{
                            position: "absolute",
                            left: 70,
                            top: 3,
                          }}
                          onPress={() => {
                            deleteItem(index);
                          }}
                        >
                          <Entypo
                            name="circle-with-cross"
                            size={15}
                            color={colors.white}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
                <TextInput
                  style={[
                    styles.inputStyle,
                    {
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      height: 100,
                    },
                  ]}
                  onChangeText={(userskill) => setuserskill(userskill)}
                  value={userskill}
                  onSubmitEditing={() => {
                    setskillsofuser([...skillsofuser, userskill]);
                    setuserskill("");
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.Bluish,
                  width: 345,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
                onPress={() => {
                  edit("skills");
                }}
              >
                <MyText
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  Update
                </MyText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.red,
                  width: 345,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
                onPress={() => {
                  navigation.navigate("HomeService");
                }}
              >
                <MyText
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  Cancel
                </MyText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnstyle: {
    height: 35,
    width: 107,
    borderRadius: 5,
    backgroundColor: "#232323",
    margin: 5,
  },
  btntext: {
    fontSize: 12,
    fontWeight: "400",
    color: "white",
    margin: 10,
    alignSelf: "center",
  },
  header: {
    fontSize: 16,
    fontWeight: "700",
    color: "#232323",
    alignSelf: "flex-start",
    marginTop: 30,
    marginBottom: 10,
  },
  box: {
    height: 150,
    width: 345,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 47,
    width: 345,
    marginTop: 14,
    marginBottom: 5,
  },
});

export default EditService;
