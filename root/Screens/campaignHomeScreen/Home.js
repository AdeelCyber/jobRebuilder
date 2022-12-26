import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PinkAback from "../../Components/PinkAback";
import CustomHeader from "../../Components/CustomHeader";

const Home = ({ navigation, routes }) => {
  //   React.useEffect(() => {
  //     navigation.setOptions({
  //       headerTitle: () => <CustomHeader />,
  //     });
  //   }, []);
  return (
    <View>
      <CustomHeader />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
