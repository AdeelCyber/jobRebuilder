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
  ActivityIndicator,
} from "react-native";

import Context from "../../Context/Context";
import MyText from "../../Components/Text";

import Icon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import CartProvider from "../../Context/CartProvider";
const PersonalInfo = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const { userdetails } = useContext(CartProvider);

  const [email, setemail] = useState(userdetails?.email);
  const [name, setname] = useState(userdetails?.name);
  const [getcondition, setcondition] = useState(false);
  const [Phonenumber, setPhonenumber] = useState(userdetails?.phoneNumber);
  const [language, setlanguage] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "Pakistan", value: "Pakistan" },
    { label: "India", value: "India" },
  ]);
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    { label: "Karachi", value: "Karachi" },
    { label: "Lahore", value: "Lahore" },
  ]);
  const saveData = async () => {

    try {
      if (
        language !== undefined &&
        value !== null &&
        value2 !== null &&
        value3 !== null
      ) {
        setcondition(true);
        await AsyncStorage.setItem("@name", name);
        await AsyncStorage.setItem("@email", email);
        await AsyncStorage.setItem("@Phonenumber", Phonenumber);
        await AsyncStorage.setItem("@language", language);
        await AsyncStorage.setItem("@gender", value);
        await AsyncStorage.setItem("@country", value2);
        await AsyncStorage.setItem("@city", value3);
        setcondition(false);

        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Your Information is successfully saved",
          text2: "Press Proceed to continue",
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
      setcondition(false);

      console.log(error);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Some fields are missing",
        text2: "Please fill out all the fields",
      });
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
          marginBottom: 10,
        }}
      >
        Enter Personal Info
      </MyText>
      <View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(name) => setname(name)}
            value={name}
            editable={false}
            placeholder="Name"
            placeholderTextColor="#ACA9A9"
            underlineColorAndroid="#f000"
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            value={email}
            onChangeText={(email) => setemail(email)}
            placeholder="Email"
            editable={false}
            placeholderTextColor="#ACA9A9"
            autoCapitalize="none"
            keyboardType="email-address"
            clearButtonMode="always"
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(Phonenumber) => setPhonenumber(Phonenumber)}
            placeholder="Phone Number" //12345
            value={Phonenumber}
            editable={false}
            placeholderTextColor="#ACA9A9"
            keyboardType="number-pad"
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        <View style={styles.dropdown}>
          <DropDownPicker
            style={[styles.dropdown, { borderColor: "#EEEEEE" }]}
            textStyle={{ color: "#ACA9A9" }}
            placeholder="Gender"
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
            onChangeText={(value2) => setValue2(value2)}
            placeholder="Country"
            placeholderTextColor="#ACA9A9"
            underlineColorAndroid="#f000"
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(value3) => setValue3(value3)}
            placeholder="City"
            placeholderTextColor="#ACA9A9"
            underlineColorAndroid="#f000"
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(language) => setlanguage(language)}
            placeholder="Language"
            placeholderTextColor="#ACA9A9"
            underlineColorAndroid="#f000"
          />
        </View>
      </View>
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
    marginTop: 14,
    marginBottom: 5,
  },
  dropdown: {
    position: 'relative',
   
    zIndex: 999,
    backgroundColor: '#fff'
  }
});

export default PersonalInfo;
