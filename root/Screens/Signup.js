import { StyleSheet, Text, View, Image } from "react-native";
// import React from 'react'
import Top from "../../assets/img/SignInTop.png";
import Fitness from "../../assets/img/Fitness.png";
import HandGesture from "../../assets/img/callhandgensture.png";
import global from "../GlobalStyles/globalStyles";
import Buttons from "../Components/Buttons";

const Signup = () => {
  return (
    <View>
      <View>
        <Image source={Top} style={{ width: "100%" }} />
        <Image source={Fitness} />
      </View>
      <View style={{ alignItems: "center", marginTop: 49 }}>
        <View style={{ width: "80%", marginBottom: 36 }}>
          <Text style={{ fontWeight: "700", fontSize: 24 }}>
            Find the best trainer
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "400", fontSize: 24 }}>
              in the area!
            </Text>
            <Image source={HandGesture} />
          </View>
        </View>
        <View
          style={{ alignItems: "center", alignSelf: "center", width: "80%" }}
        >
          <View style={{ marginBottom: 9, width: "100%" }}>
            <Buttons text={"Sign In"} color={"#C38BFF"} arrow={true} />
          </View>
          <View style={{ marginBottom: 21, width: "100%" }}>
            <Buttons text={"Sign up with Google"} color={"#222222"} />
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ fontWeight: "400", fontSize: 14, fontColor: "#222222" }}
          >
            You need to accept terms before
          </Text>
          <Text
            style={{ fontWeight: "300", fontSize: 14, fontColor: "#222222" }}
          >
            Signing up
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {},
  image: {
    flex: 1,
  },
});
