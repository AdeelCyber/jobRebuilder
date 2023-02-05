import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";

import React, { useContext, useState, useEffect } from "react";
import Context from "../../Context/Context";

import CustomHeader2 from "../../Components/CustomHeader2";
import Logo from "../../../assets/Svgs/Logo";
import Buildings from "../../../assets/img/Buildings.png";

import CampaignPopular from "../../Components/CampaignPopular";
import { getStartups } from "../Profile/services/FreeLancerServices";
import CartContext from "../../Context/CartProvider";

const CampaignManagement = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const userDetails = useContext(CartContext);
  // console.log(userDetails.userdetails.role);
  function handlePress(text) {
    alert(text);
  }
  const [MileStones, setMileStone] = useState("");
  const [popularCards, setPopularCards] = useState([
    {
      src: Buildings,
      businessName: "Beyond",
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
  // console.log(popularCards);

  // Api call
  useEffect(() => {
    const getFreelancersData = async () => {
      const resp = await getStartups();
      // console.log(resp.data);
      if (resp.data.status === "OK") {
        console.log("done");
        setPopularCards(resp.data.startUps);
        // userDetails.setmilestone(resp.data.startUps);
      }
    };

    getFreelancersData();
  }, []);
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
            Src={Buildings}
            title={item.businessName}
            Logo={item.logo}
            Stage={item.stage}
            Team={item.Team}
            Budget={item.budget}
            status={item.status}
            navigation={navigation}
            id={item._id}
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

export default CampaignManagement;

const styles = StyleSheet.create({});
