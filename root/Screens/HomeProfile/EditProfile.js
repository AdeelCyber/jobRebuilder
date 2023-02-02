import React, { useContext, useState } from "react";
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
import CustomHeader8 from "../../Components/CustomHeader8";
import Icon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import CartProvider from "../../Context/CartProvider";
import Toast from "react-native-toast-message";
import { editProfile } from "../Profile/services/ProfileServices";
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
  const [work, setwork] = useState(userinfo.about.responseTime);
  const [about, setabout] = useState(userinfo.about.aboutMe);
  const [image, setimage] = useState(userinfo.userInfo.avatar);
  const { accessToken } = useContext(CartProvider);

  const [preference, setpreference] = useState(
    "Fixed Rate " + userinfo.userInfo.role
  );
  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1,
    });
    console.log(result.assets);

    if (!result.canceled) {
      setimage(result.assets[0].uri);
    }
  };
  const profileedit = async () => {
    const res = await editProfile(
      accessToken,
      name,
      job,
      city,
      country,
      language,
      work,
      about
    );
    if (res.status == 200) {
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Upated Successfully",
        text2: ".",
      });
      navigation.navigate("HomeService");
    }
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.container]}>
        <CustomHeader8 />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Image
            source={{ uri: image }}
            style={{
              height: 107,
              width: 107,
              borderRadius: 50,
              alignSelf: "center",
            }}
          />

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
              onPress={() => {
                pickImg();
              }}
            />
          </View>
        </View>
        <MyText style={{ fontSize: 14, fontWeight: "500", margin: 10 }}>
          Change Profile Picture
        </MyText>
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
            value={work}
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
        </View>
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
        <Pressable
          style={{
            backgroundColor: colors.Bluish,
            width: 361,
            height: 58,
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
            Done
          </MyText>
        </Pressable>
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
    width: 361,
    borderRadius: 10,
    marginTop: 14,
    marginBottom: 5,
  },
});

export default EditProfile;
