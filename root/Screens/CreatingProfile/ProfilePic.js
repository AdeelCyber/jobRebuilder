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
} from "react-native";

import Context from "../../Context/Context";
import MyText from "../../Components/Text";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePic = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const [image, setimage] = useState();
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

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("@image", image);

      console.log("done");
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Your Information is successfully saved",
        text2: "Press Submit",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        }}
      >
        Upload Profile Picture
      </MyText>
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
          marginTop: 50,
        }}
        onPress={() => {
          pickImg();
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
                marginLeft: 45,
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
                marginLeft: 45,
              }}
              size={37}
              color="#23232380"
            />
          </View>
        )}
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "#EEEEEE",
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => {
          saveData();
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfilePic;
