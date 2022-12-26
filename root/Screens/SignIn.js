import { Image, StyleSheet, Text, View } from "react-native";
import PinkAback from "../Components/PinkAback";
import React from "react";
import Handwave from "../../assets/img/Handwave.png";
import Input from "../Components/Input";
import { FontAwesome } from "@expo/vector-icons";
import Buttons from "../Components/Buttons";
import SvgImport from "../Components/SvgImport";
import GraduationHat from "../../assets/Svgs/GraduationHat";

const SignIn = ({ navigation, routes }) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <PinkAback />,
    });
  }, []);
  return (
    <View style={styles.main}>
      {/* Pink back button */}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <PinkAback />

        <Text
          style={{
            marginTop: 7.5,
            marginLeft: 5,
            fontSize: 18,
            fontWeight: "400",
            color: "#222222",
          }}
        >
          Sign In
        </Text>
      </View>
      <SvgImport
        svg={GraduationHat}
        style={{ maxWidth: "100%", marginTop: 15 }}
      />
      <Image source={require("../../assets/img/graduationCap.png")} />
      {/* Welcome DIV */}

      {/* input and buttons */}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
