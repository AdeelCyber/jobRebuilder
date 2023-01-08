import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import Context from "../../Context/Context";
import CustomHeader from "../../Components/CustomHeader2";
import HeartIcon from "../../../assets/Svgs/HeartIcon";
import AIBrainIcon from "../../../assets/Svgs/AIBrainIcon";
import SoftwareCompanyIcon from "../../../assets/Svgs/SoftwareCompanyIcon";
import ConstructionIcon from "../../../assets/Svgs/ConstructionIcon";
import GraduationHat from "../../../assets/Svgs/GraduationHat";
import HomeCategories from "../../Components/HomeCategories";
import background from "../../../assets/img/bg1.png";
import background2 from "../../../assets/img/bg2.png";
import MyText from "../../Components/Text";

const ManagingCampaign = () => {
  const [catgeories, setCategories] = useState([
    { icon: ConstructionIcon, text: "Construction", img: background2 },
    { icon: GraduationHat, text: "Education", img: background2 },
    { icon: SoftwareCompanyIcon, text: "Software Company" },
    { icon: AIBrainIcon, text: "Ai Tech" },
    { icon: HeartIcon, text: "Liked" },
  ]);
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <CustomHeader Title="Beyond" style={{ elevation: 0 }} />
      <View style={{ width: "100%", marginTop: 10 }}>
        <FlatList
          horizontal
          data={catgeories}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <HomeCategories
              svg={item.icon}
              title={item.text}
              img={item.img}
              style={{}}
            />
          )}
        />
      </View>
      <View style={{ paddingHorizontal: 23 }}>
        {/* header heading */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 4,
          }}
        >
          <MyText style={{ fontSize: 24, fontWeight: "700" }}>To Do</MyText>
          <MyText
            style={{ fontWeight: "500", fontSize: 10, color: colors.lighttext }}
          >
            View more
          </MyText>
        </View>
        {/* Todo Component */}
      </View>
    </ScrollView>
  );
};

export default ManagingCampaign;

const styles = StyleSheet.create({});
