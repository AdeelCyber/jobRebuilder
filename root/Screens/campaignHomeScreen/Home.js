import { StyleSheet, Text, View, FlatList } from "react-native";

import React, { useContext, useState } from "react";
import Context from "../../Context/Context";
import PinkAback from "../../Components/PinkAback";
import CustomHeader from "../../Components/CustomHeader";
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import SettingIcon from "../../../assets/Svgs/SettingIcon";
import GraduationHat from "../../../assets/Svgs/GraduationHat";
import MyText from "../../Components/Text";
import HomeCategories from "../../Components/HomeCategories";

const Home = ({ navigation, routes }) => {
  const [catgeories, setCategories] = useState([
    { icon: GraduationHat, text: "GraduationHat" },
    { icon: GraduationHat, text: "Pizza" },
    { icon: GraduationHat, text: "Burger" },
    { icon: GraduationHat, text: "Fruit Chaat" },
  ]);
  //   React.useEffect(() => {
  //     navigation.setOptions({
  //       headerTitle: () => <CustomHeader />,
  //     });
  //   }, []);
  const [searchQuery, setSearchQuery] = React.useState(""); //searchbar query hook

  const onChangeSearch = (query) => setSearchQuery(query);
  const {
    theme: { colors },
  } = useContext(Context);
  const numCols = catgeories.length; //for categories gapping
  return (
    // main container
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        borderWidth: 2,
        borderColor: "red", //remove border frm here
      }}
    >
      {/* header */}
      <CustomHeader />
      {/* header out */}

      {/*Seacrch bar and setting icon in  */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginTop: 20,
          paddingLeft: 10,
        }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ width: "80%", color: colors.placeHolder, borderRadius: 20 }}
        />
        <View
          style={{
            backgroundColor: colors.secondary,
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 15,
            height: 42,
            width: 48,
            marginLeft: 10,
          }}
        >
          <SvgImport svg={SettingIcon} style={{ alignSelf: "center" }} />
        </View>
        {/* seatch bar icon out */}
      </View>
      {/* Categories In */}
      <View style={{ marginTop: 10, paddingLeft: 10 }}>
        <MyText style={{ fontSize: 24, fontWeight: "700" }}>Categories</MyText>
        <View style={{ width: "100%", marginTop: 10 }}>
          <FlatList
            horizontal
            data={catgeories}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <HomeCategories
                svg={item.icon}
                title={item.text}
                style={{
                  marginHorizontal: index != numCols - 1 && index != 0 ? 30 : 0,
                }}
              />
            )}
          />
        </View>
      </View>
      {/* Categories Out */}
      {/* popular In */}
      <View style={{ marginTop: "8%", paddingLeft: 10 }}>
        <MyText style={{ fontSize: 24, fontWeight: "700" }}>Popular</MyText>
        <View style={{ width: "100%", marginTop: 10 }}>
          <FlatList
            horizontal
            data={catgeories}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <HomeCategories
                svg={item.icon}
                title={item.text}
                style={{
                  marginHorizontal: index != numCols - 1 && index != 0 ? 30 : 0,
                }}
              />
            )}
          />
        </View>
      </View>
      {/* popular Out */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  // container : {
  //     flex:1,
  // }
});
