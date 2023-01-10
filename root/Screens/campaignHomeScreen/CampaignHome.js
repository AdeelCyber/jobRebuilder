import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

import React, { useContext, useState } from "react";
import Context from "../../Context/Context";
import CustomHeader from "../../Components/CustomHeader";
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import SettingIcon2 from "../../../assets/Svgs/SettingIcon2";

import MyText from "../../Components/Text";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import PopularComp from "../../Components/PopularComp";
import RateComp from "../../Components/RateComp";

function CategoriesComp({ text, ...props }) {
  const [selected, setselected] = useState(false);
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Pressable
      onPress={() => {
        setselected(!selected);
      }}
      style={[
        {
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: selected ? colors.secondary : colors.white,
        },
        { ...styles.shadow },
        props.style,
      ]}
    >
      <MyText
        style={{ color: selected ? colors.white : colors.text, fontSize: 11 }}
      >
        {text}
      </MyText>
    </Pressable>
  );
}

const CampaignHome = ({ navigation, routes }) => {
  //categories hook
  const [catgeories, setCategories] = useState([
    "UI/UX Design",
    "Animations",
    "Logo Design",
    "Logo Design",
  ]);
  //Popular hook
  const [popularData, setPopularData] = useState([
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
  ]);
  const [RateData, setRateData] = useState([
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
  ]);
  const [EquityData, setEquityData] = useState([
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
    {
      name: "Abdullah",
      designation: "Ceo",
      Price: "70.00",
      Rating: "5.0",
      Image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    },
  ]);

  const [searchQuery, setSearchQuery] = React.useState(""); //searchbar query hook

  const onChangeSearch = (query) => setSearchQuery(query);
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    // main container
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      {/* header */}
      <CustomHeader nav={navigation} />
      {/* header out */}

      {/*Seacrch bar and setting icon in  */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginTop: 20,
          paddingLeft: 13,
          paddingBottom: 10,
        }}
      >
        <Searchbar
          placeholderTextColor={"#232323A1"}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            width: "80%",
            color: colors.placeHolder,
            borderRadius: 6,
            backgroundColor: colors.white,
            fontSize: 10,
          }}
        />
        <View
          style={[
            {
              backgroundColor: colors.white,
              justifyContent: "center",
              alignContent: "center",
              borderRadius: 6,
              height: 52,
              width: 52,
              marginLeft: 10,

              elevation: 10,
            },
            styles.shadow,
          ]}
        >
          <SvgImport svg={SettingIcon2} style={{ alignSelf: "center" }} />
        </View>
        {/* seatch bar icon out */}
      </View>
      <View style={{ marginTop: 10, paddingLeft: 13 }}>
        <MyText style={{ fontSize: 24, fontWeight: "700" }}>Categories</MyText>
      </View>
      <View style={{ width: "100%", marginTop: 4 }}>
        <FlatList
          horizontal
          data={catgeories}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CategoriesComp
              text={item}
              style={{
                marginLeft: index == 0 ? 13 : 9,
                marginVertical: 15,
                elevation: 2,
                marginRight: index == catgeories.length - 1 ? 10 : 0,
              }}
            />
          )}
        />
      </View>
      <View style={{ marginTop: 10, paddingLeft: 13 }}>
        <MyText style={{ fontSize: 24, fontWeight: "700" }}>
          Most Popular
        </MyText>
      </View>
      <View style={{ width: "100%", marginTop: 4 }}>
        <FlatList
          horizontal
          data={popularData}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <PopularComp
              name={item.name}
              Price={item.Price}
              designation={item.designation}
              Rating={item.Rating}
              Image={item.Image}
              style={{
                marginLeft: index == 0 ? 13 : 9,
                marginVertical: 15,

                marginRight: index == popularData.length - 1 ? 10 : 0,
              }}
            />
          )}
        />
      </View>
      <View style={{ marginTop: 10, paddingLeft: 13, paddingRight: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MyText style={{ fontSize: 24, fontWeight: "700" }}>
            Fixed Rate
          </MyText>
          <MyText style={{ fontWeight: "500", fontSize: 10, color: "#8489FC" }}>
            See All
          </MyText>
        </View>
      </View>
      <View style={{ paddingLeft: 17, paddingRight: 15 }}>
        {RateData.map((item, index) => (
          <RateComp
            name={item.name}
            Price={item.Price}
            designation={item.designation}
            Rating={item.Rating}
            Image={item.Image}
            style={{ marginVertical: 11 }}
          />
        ))}
      </View>
      <View style={{ marginTop: 10, paddingLeft: 13 }}>
        <MyText style={{ fontSize: 24, fontWeight: "700" }}>
          Work For Equity
        </MyText>
      </View>
      <View style={{ paddingLeft: 17, paddingRight: 15 }}>
        {EquityData.map((item, index) => (
          <RateComp
            name={item.name}
            Price={item.Price}
            designation={item.designation}
            Rating={item.Rating}
            Image={item.Image}
            style={{ marginVertical: 11 }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default CampaignHome;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
});
