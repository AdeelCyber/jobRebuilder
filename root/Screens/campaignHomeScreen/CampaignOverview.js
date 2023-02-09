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
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import MyText from "../../Components/Text";
import CampaignCard from "../../Components/CampaignCard";
import logo from "../../../assets/Svgs/MotoMobileLogo";
import Thumbnail from "../../../assets/img/Thumbnail.png";
import LittleNav from "../../Components/LittleNav";
import TickPara from "../../Components/TickPara";
import BottomPopup from "../../Components/BottomPopup";
const OverView = ({ navigation, route }) => {
  const [show, setshow] = useState(route.params.show);
  const [isPart, setisPart] = useState(route.params.isPart);
  const [undefinedd, setundefined] = useState(route.params.undefinedd);
  const {
    theme: { colors },
  } = useContext(Context);

  const [modal, setModal] = useState({ modal1: false, modal2: false });
  const [data, setData] = useState(route.params.data);
  const [HeighLights, setHeighLights] = useState([
    data.startup.problemStatement,
    data.startup.impactStatement,
  ]);
  return (
    // main container
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      {/* header */}
      <CustomHeader2 nav={navigation} />
      {/* header out */}
      {/* card in */}
      <CampaignCard
        title={data.startup.businessName}
        niche={data.startup.category}
        Logo={logo}
        Thumbnail={Thumbnail}
        modal={setModal}
        data={data}
        navigation={navigation}
        show={show}
        isPart={isPart}
        undefinedd={undefinedd}
      />
      {/* card out */}
      {/* Little nav in */}
      <LittleNav style={{ marginTop: 10 }} title={"OverView"} />
      {/* Little nav out */}
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 23,
            marginTop: 15,
            marginBottom: 25,
          }}
        >
          <MyText style={{ fontSize: 24, fontWeight: "700" }}>
            Highlights
          </MyText>
        </View>
        <View>
          {HeighLights.map((item) => (
            <TickPara para={item} />
          ))}
        </View>
      </View>
      <BottomPopup show={modal.modal1} setshow={setModal} />
    </ScrollView>
  );
};

export default OverView;

const styles = StyleSheet.create({});
