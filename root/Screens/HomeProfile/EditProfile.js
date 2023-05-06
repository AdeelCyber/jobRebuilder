import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
} from "react-native";
import axios from "../../http/axiosSet";

import Context from "../../Context/Context";
import MyText from "../../Components/Text";
import CustomHeader9 from "../../Components/CustomHeader9";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";

import CartProvider from "../../Context/CartProvider";
import Toast from "react-native-toast-message";
import { imageUpload } from "../Profile/services/fileServices";
import { editProfile } from "../Profile/services/ProfileServices";
import Loader from "../../Components/Loader";
import DropDownPicker from "react-native-dropdown-picker";

const EditProfile = ({ route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const { userinfo } = route.params;
  const [name, setname] = useState(userinfo.userInfo.name);
  const [job, setjob] = useState(userinfo.about.jobTitle);
  const [city, setcity] = useState(userinfo.about.city);
  const [country, setcountry] = useState(userinfo.about.country);

  const [language, setlanguage] = useState(userinfo.about.language);
  const [work, setwork] = useState(userinfo.services.hourlyRate);
  const [about, setabout] = useState(userinfo.about.aboutMe);
  const [image, setimage] = useState();
  const { accessToken } = useContext(CartProvider);
  const [getmodalvisible5, setmodalvisible5] = useState(false);
  const [preference, setpreference] = useState(
    "Fixed Rate " + userinfo.userInfo.role
  );
  const [logo, setlogo] = useState(userinfo.userInfo.avatar);
  const [getcondition, setcondition] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Join a business (equity)", value: "Equity" },
    { label: "Fixed Rate (Freelancer)", value: "Freelance" },
  ]);
  // const pickImg = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [10, 10],
  //     quality: 1,
  //   });
  //   console.log(result.assets);

  //   if (!result.canceled) {
  //     setimage(result.assets[0].uri);
  //   }
  // };

  const pickImg = async () => {
    setmodalvisible5(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    // console.log(result);

    if (!result.canceled) {
      setimage(result.assets[0].uri);
      setcondition(true);
      const img = await imageUpload(result.assets[0].uri);
      if (img.status == 200) {
        setcondition(false);
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Image Upated Successfully",
          text2: ".",
        });
      }
      console.log(img);
      setlogo(JSON.parse(img.body));
    }
  };
  const takeSelfie = async () => {
    setmodalvisible5(false);

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setimage(result.assets[0].uri);
      const img = await imageUpload(result.assets[0].uri);
      setlogo(JSON.parse(img.body));
    }
  };
  const profileedit = async () => {
    setcondition(true);
    console.log(value);

    if (logo.filename != undefined) {
      try {
        const res = await editProfile(
          accessToken,
          name,
          job,
          city,
          country,
          language,
          work,
          about,
          value == null ? userinfo.userInfo.role : value,
          logo.filename
        );
        console.log(res);
        if (res.status == 200) {
          setcondition(false);

          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Upated Successfully",
            text2: ".",
          });
          navigation.navigate("HomeService");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await editProfile(
          accessToken,
          name,
          job,
          city,
          country,
          language,
          work,
          value == null ? userinfo.userInfo.role : value,
          about,
          logo
        );
        console.log(res.status);
        if (res.status == 200) {
          setcondition(false);

          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Upated Successfully",
            text2: ".",
          });
          navigation.navigate("HomeService");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  if (getcondition) {
    return (
      <Loader visible={getcondition} color="white" indicatorSize="large" />
    );
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.container]}>
        <CustomHeader9 Title="" nav={navigation} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={getmodalvisible5}
        >
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
                  Choose Option
                </MyText>
                <Entypo
                  name="circle-with-cross"
                  size={20}
                  color="#232323AB"
                  onPress={() => {
                    setmodalvisible5(false);
                  }}
                />
              </View>
              <Pressable
                style={{
                  height: 25,
                  width: 90,
                  alignSelf: "center",
                  backgroundColor: colors.Bluish,
                  borderRadius: 5,
                  marginBottom: 5,
                }}
                onPress={() => {
                  takeSelfie();
                }}
              >
                <MyText
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    color: colors.white,
                    alignSelf: "center",
                  }}
                >
                  Camera
                </MyText>
              </Pressable>
              <Pressable
                style={{
                  height: 25,
                  width: 90,
                  alignSelf: "center",
                  backgroundColor: colors.Bluish,
                  borderRadius: 5,
                }}
                onPress={() => {
                  pickImg();
                }}
              >
                <MyText
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    alignSelf: "center",
                    color: colors.white,
                  }}
                >
                  Open Gallery
                </MyText>
              </Pressable>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={{ flexDirection: "row", marginTop: 20 }}
          onPress={() => {
            setmodalvisible5(true);
          }}
        >
          {image ? (
            <Image
              source={{
                uri: image,
              }}
              style={{
                height: 107,
                width: 107,
                borderRadius: 50,
                alignSelf: "center",
              }}
            />
          ) : (
            <Image
              source={{
                uri: axios.defaults.baseURL + "media/getimage/" + logo,
              }}
              style={{
                height: 107,
                width: 107,
                borderRadius: 50,
                alignSelf: "center",
              }}
            />
          )}

          <View
            style={{
              height: 31,
              width: 31,
              borderRadius: 50,
              padding: 8,
              marginLeft: 80,
              backgroundColor: colors.Bluish,
              alignSelf: "flex-end",
              position: "absolute",
            }}
          >
            <MaterialCommunityIcons
              name="camera"
              size={14}
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
        <MyText style={{ fontSize: 14, fontWeight: "500", margin: 10 }}>
          Change Profile Picture
        </MyText>
        <TouchableOpacity
          style={{
            backgroundColor: colors.Bluish,
            width: 150,
            height: 40,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            marginTop: 20,
          }}
          onPress={() => {
            profileedit();
          }}
        >
          <MyText
            style={{
              color: colors.white,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Save
          </MyText>
        </TouchableOpacity>
        <View style={styles.SectionStyle}>
          <TextInput
            style={[
              styles.inputStyle,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onChangeText={(name) => setname(name)}
            value={name}
          />
          <Pressable
            style={{
              padding: 14,
            }}
          >
            <MaterialCommunityIcons name="pencil" size={22} color="#ACA9A9" />
          </Pressable>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={[
              styles.inputStyle,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onChangeText={(job) => setjob(job)}
            value={job}
          />
          <Pressable
            style={{
              padding: 14,
            }}
          >
            <MaterialCommunityIcons name="pencil" size={22} color="#ACA9A9" />
          </Pressable>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={[
              styles.inputStyle,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onChangeText={(city) => setcity(city)}
            value={city}
          />
          <Pressable
            style={{
              padding: 14,
            }}
          >
            <MaterialCommunityIcons name="pencil" size={22} color="#ACA9A9" />
          </Pressable>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={[
              styles.inputStyle,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onChangeText={(country) => setcountry(country)}
            value={country}
          />
          <Pressable
            style={{
              padding: 14,
            }}
          >
            <MaterialCommunityIcons name="pencil" size={22} color="#ACA9A9" />
          </Pressable>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={[
              styles.inputStyle,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onChangeText={(language) => setlanguage(language)}
            value={language}
          />
          <Pressable
            style={{
              padding: 14,
            }}
          >
            <MaterialCommunityIcons name="pencil" size={22} color="#ACA9A9" />
          </Pressable>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={[
              styles.inputStyle,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onChangeText={(work) => setwork(work)}
            value={work.toString()}
          />
          <Pressable
            style={{
              padding: 14,
            }}
          >
            <MyText style={{ color: "#919191", margin: 6 }}>Hrs/week</MyText>
          </Pressable>
        </View>
        <View style={styles.SectionStyle}>
          <DropDownPicker
            dropDownDirection="TOP"
            style={[styles.inputStyle, { borderColor: "#EEEEEE" }]}
            textStyle={{ color: "#ACA9A9" }}
            placeholder={userinfo.userInfo.role}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        {/* <View style={styles.SectionStyle}>
          <TextInput
            style={[
              styles.inputStyle,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onChangeText={(preference) => setpreference(preference)}
            value={preference}
          />
          <Pressable
            style={{
              padding: 14,
            }}
          >
            <MaterialCommunityIcons name="pencil" size={22} color="#ACA9A9" />
          </Pressable>
        </View> */}
        <View style={[styles.SectionStyle, { height: 135 }]}>
          <TextInput
            style={[
              styles.inputStyle,
              { textAlignVertical: "top", paddingTop: 10 },
            ]}
            onChangeText={(about) => setabout(about)}
            value={about}
            placeholder="About me"
            placeholderTextColor={colors.black}
            multiline={true}
            numberOfLines={5}
          />
        </View>
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
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 58,
    borderWidth: 1,
    width: 350,
    borderRadius: 10,
    marginTop: 14,
    marginBottom: 5,
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

export default EditProfile;
