import { Image, StyleSheet, Text, View } from "react-native";
import PinkAback from "../Components/PinkAback";
import React from "react";
import Handwave from "../../assets/img/Handwave.png";
import Input from "../Components/Input";
import { FontAwesome } from "@expo/vector-icons";
import Buttons from "../Components/Buttons";
const SignIn = () => {
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
      {/* Welcome DIV */}
      <View style={{ marginTop: 80 }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 24,
              lineHeight: 30,
              color: "#222222",
            }}
          >
            Welcome Back !
          </Text>
          <Image style={{ marginLeft: 12 }} source={Handwave} />
        </View>
        <Text
          style={{
            fontWeight: "300",
            fontSize: 15,
            lineHeight: 20,
            color: "#222222",
            marginTop: 6,
          }}
        >
          Enter login details to continue
        </Text>
      </View>
      {/* input and buttons */}
      <View
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: 80,
          height: "62%",
          width: "100%",

          paddingBottom: 50,
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <Input />
        </View>

        <View style={{ width: "100%", alignItems: "center" }}>
          <Buttons color="#C38BFF" arrow={true} text="Sign In" />
        </View>

        {/* Horizontal Rule Div */}
        <View
          style={{
            width: "55%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            height: 40,
            // marginVertical: 20,
          }}
        >
          {/* left Side Line  */}
          <View
            style={{ height: 1, backgroundColor: "#22222247", width: "20%" }}
          />
          {/* Text */}
          <View
            style={{
              paddingHorizontal: 4,
            }}
          >
            <Text
              style={{
                color: "#22222247",
                fontWeight: 15,
                fontWeight: "300",
              }}
            >
              Or
            </Text>
          </View>
          {/* Right Side Line */}
          <View
            style={{ height: 1, backgroundColor: "#22222247", width: "20%" }}
          />
        </View>
        {/* Horizontal rule div over */}
        <View style={{ width: "100%", alignItems: "center" }}>
          <Buttons color="#222222" arrow={false} text="Sign Up" />
        </View>
        {/* terms and cond */}
        <Text
          style={{
            fontWeight: "500",
            fontSize: 14,
            color: "#222222",
            lineHeight: 20,
            borderBottomWidth: 0.5,
            borderBottomColor: "#222222",
            // marginTop: 16,

            width: 175,
            alignSelf: "center",
          }}
        >
          View Terms and Conditions
        </Text>
      </View>
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
