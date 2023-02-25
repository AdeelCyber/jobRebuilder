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
  Modal,
  ActivityIndicator,
} from "react-native";

import Context from "../../Context/Context";
import MyText from "../../Components/Text";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { imageUpload } from "../Profile/services/fileServices";

const ProfilePic = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const [image, setimage] = useState();
  const [imagetosend, setimagetosend] = useState();
  const [getmodalvisible5, setModalVisible5] = useState(false);
  const [getcondition, setcondition] = useState(false);

  const pickImg = async () => {
    setModalVisible5(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1,
    });
    console.log(result.assets);

    if (!result.canceled) {
      setcondition(true);

      const img = await imageUpload(result.assets[0].uri);
      setimage(result.assets[0].uri);
      setimagetosend(JSON.parse(img.body));
      setcondition(false);
    }
  };
  const takeSelfie = async () => {
    setModalVisible5(false);

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setcondition(true);
      const img = await imageUpload(result.assets[0].uri);
      setimage(result.assets[0].uri);
      setimagetosend(JSON.parse(img.body));
      setcondition(false);
    }
  };

  const saveData = async () => {
    console.log(imagetosend);
    try {
      if (imagetosend.filename !== undefined) {
        await AsyncStorage.setItem("@image", imagetosend.filename);

        console.log("done");
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Your Information is successfully saved",
          text2: "Press Submit",
        });
      } else {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Some fields are missing",
          text2: "Please fill out all the fields",
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "",
      });
    }
  };
  if (getcondition) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 30,
        }}
      >
        <ActivityIndicator animating={true} color={colors.Bluish} />

        <MyText>Loading..</MyText>
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, margin: 30 },
      ]}
    >
      <Modal animationType="fade" visible={getmodalvisible5}>
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
                  setModalVisible5(false);
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
          setModalVisible5(true);
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

export default ProfilePic;
