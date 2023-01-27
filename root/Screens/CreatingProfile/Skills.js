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

import Icon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Skills = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Join a business (equity)", value: "Join a business (equity)" },
    { label: "Fixed Rate (Freelancer)", value: "Fixed Rate (Freelancer)" },
    { label: "Both", value: "Both" },
  ]);
  const [availibility, setavailibility] = useState();
  const [jobtitle, setjobtitle] = useState();
  const [hourlyrate, sethourlyrate] = useState();
  const [description, setdescription] = useState();
  const [skills, setskills] = useState([]);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("@skills", JSON.stringify(skills));
      await AsyncStorage.setItem("@workPreference", value);
      await AsyncStorage.setItem("@availibilityPerWeek", availibility);
      await AsyncStorage.setItem("@jobTitle", jobtitle);
      await AsyncStorage.setItem("@hourlyRate", hourlyrate);
      await AsyncStorage.setItem("@description", description);

      console.log("done");
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Your Information is successfully saved",
        text2: "Press Proceed to continue",
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
        Skills
      </MyText>
      <View>
        <View style={styles.SectionStyle}>
          <View
            style={[
              styles.inputStyle,
              { flexDirection: "row", justifyContent: "space-evenly" },
            ]}
          >
            <TouchableOpacity
              style={styles.btnstyle}
              onPress={() => {
                setskills([...skills, "UI/UX design"]);
              }}
            >
              <MyText style={styles.btntext}>UI/UX design</MyText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnstyle}
              onPress={() => {
                setskills([...skills, "Wordpress"]);
              }}
            >
              <MyText style={styles.btntext}>Wordpress</MyText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnstyle}
              onPress={() => {
                setskills([...skills, "Flutter"]);
              }}
            >
              <MyText style={styles.btntext}>Flutter</MyText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.SectionStyle}>
          <DropDownPicker
            style={[styles.inputStyle, { borderColor: "#EEEEEE" }]}
            textStyle={{ color: "#ACA9A9" }}
            placeholder="Work Preference"
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
            style={[
              styles.inputStyle,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onChangeText={(availibility) => setavailibility(availibility)}
            value={availibility}
            placeholder="Availability Per Week" //12345
            placeholderTextColor="#ACA9A9"
            keyboardType="default"
            underlineColorAndroid="#f000"
          />
          <MyText
            style={{
              backgroundColor: "#EEEEEE",
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              padding: 12,
              fontSize: 14,
              fontWeight: "400",
            }}
          >
            Hrs
          </MyText>
        </View>

        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(jobtitle) => setjobtitle(jobtitle)}
            placeholder="Job Title"
            placeholderTextColor="#ACA9A9"
            underlineColorAndroid="#f000"
          />
        </View>

        <View style={styles.SectionStyle}>
          <TextInput
            style={[
              styles.inputStyle,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onChangeText={(hourlyrate) => sethourlyrate(hourlyrate)}
            value={hourlyrate}
            placeholder="Hourly Rate" //12345
            placeholderTextColor="#ACA9A9"
            keyboardType="default"
            underlineColorAndroid="#f000"
          />
          <MyText
            style={{
              backgroundColor: "#EEEEEE",
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              padding: 12,
              fontSize: 14,
              fontWeight: "400",
            }}
          >
            $
          </MyText>
        </View>
        <View style={styles.SectionStyle2}>
          <TextInput
            style={styles.inputStyle2}
            onChangeText={(description) => setdescription(description)}
            placeholder="Description of experience, development 
                                & goals"
            placeholderTextColor="#ACA9A9"
            underlineColorAndroid="#f000"
            multiline={true}
            numberOfLines={5}
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
  btnstyle: {
    height: 20,
    width: 77,
    borderRadius: 5,
    backgroundColor: "#13B88769",
    alignSelf: "center",
  },
  btntext: {
    fontSize: 8,
    fontWeight: "700",
    alignSelf: "center",
    margin: 4,
  },
  SectionStyle2: {
    flexDirection: "row",
    height: 100,
    marginTop: 14,
    marginBottom: 5,
    flexDirection: "row",
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
});

export default Skills;
