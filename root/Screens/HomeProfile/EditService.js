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

const EditService = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const [description, setdescription] = useState(true);
  const [skills, setskills] = useState(false);
  const [rates, setrates] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [userdesc, setuserdesc] = useState(
    "Im a professional designer specialist in logo and identity design. I guarantee you the quality in a short time.  Deliverables: 1- Presentation file which shows you how your logo will appear in many applications (Mockups). 2- Vector files / Open sources: (Ai, EPS, and PDF). 3- JPEGs files of the logo in many different colored backgrounds."
  );
  const [items, setItems] = useState([
    { label: "100$", value: "100" },
    { label: "200$", value: "200" },
  ]);
  const [skillsofuser, setskillsofuser] = useState([
    "UI/UX Design",
    "Logo Design",
    "Video Editing",
    "Animations",
    "Post Designs",
  ]);

  const { accessToken } = useContext(CartProvider);

  const deleteItem = (index) => {
    const r = skillsofuser.filter((i, e) => e != index);

    setskillsofuser(r);
  };
  const edit = async (n) => {
    const res = await editServices(accessToken, userdesc, value, skillsofuser);
    // console.log(res.data);
    if (res.status == 201) {
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Updated Successfully",
        text2: ".",
      });
    }
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <CustomHeader9 />
      <View style={[styles.container, { marginTop: 30 }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
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
            <Pressable
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
            </Pressable>
            <Pressable
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
            </Pressable>
          </View>
        )}
        {rates && (
          <View style={{ marginTop: 30 }}>
            <View style={styles.SectionStyle}>
              <DropDownPicker
                style={[styles.inputStyle, { borderColor: "#EEEEEE" }]}
                textStyle={{ color: "#ACA9A9" }}
                placeholder="100$"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            </View>
            <Pressable
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
            </Pressable>
            <Pressable
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
            </Pressable>
          </View>
        )}
        {skills && (
          <View style={{ marginTop: 30 }}>
            <View
              style={[
                styles.box,
                { height: 100, shadowColor: colors.Bluish, padding: 10 },
              ]}
            >
              <FlatList
                data={skillsofuser}
                keyExtractor={(item) => item.id}
                numColumns={3}
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
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                        onPress={() => {
                          deleteItem(index);
                        }}
                      >
                        <MyText
                          style={{
                            color: colors.white,
                            fontSize: 9,
                            margin: 5,
                          }}
                        >
                          X
                        </MyText>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
            <Pressable
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
            </Pressable>
            <Pressable
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
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
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
    height: 190,
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
