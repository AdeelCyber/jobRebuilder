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
import CustomHeader9 from "../../Components/CustomHeader9";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import CartProvider from "../../Context/CartProvider";
import { publishPortfolio } from "../Profile/services/ProfileServices";
import Toast from "react-native-toast-message";
import { imageUpload } from "../Profile/services/fileServices";
import Loader from "../../Components/Loader";
const Portfolio = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const [projname, setprojname] = useState();
  const [projdesc, setprojdesc] = useState();

  const { accessToken } = useContext(CartProvider);
  const [images, setimages] = useState([]);
  const [getcondition, setcondition] = useState(false);

  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [10, 10],
      quality: 1,
    });
    // console.log(result.assets);

    if (!result.canceled) {
      for (var i in result.assets) {
        console.log(result.assets[i].uri);
        const img = await imageUpload(result.assets[i].uri);
        const m = JSON.parse(img.body);
        setimages([...images, m.filename]);

        console.log(images);
      }
    }
  };

  const portfoliosend = async () => {
    console.log(projname);
    setcondition(true);

    const res = await publishPortfolio(accessToken, projname, projdesc, images);
    if (res.status == 201) {
      setcondition(false);
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Published Successfully",
        text2: ".",
      });
      navigation.navigate("HomeService");
    }
    setcondition(false);
  };
  if (getcondition) {
    return (
      <Loader visible={getcondition} color="white" indicatorSize="large" />
    );
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.container]}>
        <CustomHeader9 Title="Adding Portfolio" nav={navigation} />
        <MyText style={[styles.header, { margin: 30 }]}>
          Portfolio Details
        </MyText>
        <View style={{ marginTop: 5, width: "84%" }}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(projname) => setprojname(projname)}
              placeholder="Project Name"
              placeholderTextColor="#ACA9A9"
              underlineColorAndroid="#f000"
            />
          </View>
          <View style={styles.SectionStyle2}>
            <TextInput
              style={styles.inputStyle2}
              onChangeText={(projdesc) => setprojdesc(projdesc)}
              placeholder="Description"
              placeholderTextColor="#ACA9A9"
              underlineColorAndroid="#f000"
              multiline={true}
              numberOfLines={5}
            />
          </View>
        </View>
        <MyText style={[styles.header, { margin: 30 }]}>Add Attachments</MyText>
        {images && (
          <FlatList
            data={images}
            style={{ alignSelf: "flex-start", marginLeft: 30, marginRight: 30 }}
            numColumns={2}
            columnWrapperStyle={{ flexWrap: "wrap" }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  height: 140,
                  width: 160,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 1,
                  shadowRadius: 1,
                  elevation: 7,
                  margin: 3,
                  shadowColor: colors.Bluish,
                }}
              >
                <Image
                  source={{
                    uri: `https://stepdev.up.railway.app/media/getimage/${item}`,
                  }}
                  resizeMode="contain"
                  style={{ height: 139, width: 160, borderRadius: 10 }}
                />
              </View>
            )}
          />
        )}

        <View style={{ alignSelf: "flex-start", margin: 30 }}>
          <Pressable
            style={{
              height: 139,
              width: 160,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={() => {
              pickImg();
            }}
          >
            <View
              style={{
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 7,
                shadowColor: colors.Bluish,
                height: 45,
                width: 45,
                borderRadius: 50,
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
              }}
            >
              <MyText
                style={{
                  fontSize: 25,
                  fontWeight: "200",
                  alignSelf: "center",
                }}
              >
                +
              </MyText>
            </View>
            <MyText
              style={{
                fontSize: 16,
                fontWeight: "400",
                alignSelf: "center",
                margin: 5,
              }}
            >
              Add more
            </MyText>
          </Pressable>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.Bluish,
            width: 345,
            height: 58,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={() => {
            portfoliosend();
          }}
        >
          <MyText
            style={{
              color: colors.white,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Publish
          </MyText>
        </TouchableOpacity>
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
    borderRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 4,
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
    borderRadius: 10,

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
});

export default Portfolio;
