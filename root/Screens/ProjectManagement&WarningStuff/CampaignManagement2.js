import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";

import React, { useContext, useState } from "react";
import Context from "../../Context/Context";
import CustomHeader2 from "../../Components/CustomHeader2";
import Logo from "../../../assets/Svgs/Logo";
import Buildings from "../../../assets/img/Buildings.png";

import CampaignPopular from "../../Components/CampaignPopular";

const CampaignManagement2 = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  function handlePress(text) {
    alert(text);
  }
  const [MileStones, setMileStone] = useState("");
  const [popularCards, setPopularCards] = useState([
    {
      src: Buildings,
      title: "Beyond",
      desc: "",
      Stage: "Idea",
      Team: "Complete",
      Budget: 2560,
      status: "Approved",
    },
    {
      src: Buildings,
      title: "Beyond",
      desc: "",
      Stage: "Idea",
      Team: "Complete",
      Budget: 2560,
      status: "Pending",
    },
    {
      src: Buildings,
      title: "Beyond",
      desc: "",
      Stage: "Idea",
      Team: "Complete",
      Budget: 2560,
      status: "Draft",
    },
  ]);
  return (
    // main container
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <CustomHeader2
        Title="Campaign Management"
        style={{ elevation: 0 }}
        nav={navigation}
      />
      <FlatList
        data={popularCards}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{}}
        renderItem={({ item, index }) => (
          <CampaignPopular
            Src={item.src}
            title={item.title}
            Logo={Logo}
            Stage={item.Stage}
            Team={item.Team}
            Budget={item.Budget}
            status={item.status}
            style={{
              width: "90%",
              marginHorizontal: 23,
              marginVertical: 14,
            }}
          />
        )}
      />
    </View>
  );
};

export default CampaignManagement2;

const styles = StyleSheet.create({});
