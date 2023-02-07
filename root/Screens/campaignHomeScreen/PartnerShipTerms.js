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
const PartnerShipTerms = ({ navigation, route }) => {
  const [show, setshow] = useState(route.params.show);
  const [data, setData] = useState(route.params.data);
  const [isPart, setisPart] = useState(route.params.isPart);
  const {
    theme: { colors },
  } = useContext(Context);
  const [PartnerShip, setPartnerShip] = useState([
    data.startup.partnershipTerms,
  ]);
  const [modal, setModal] = useState({ modal1: false, modal2: false });
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
        title={"MotoMobiles"}
        niche={"Mobile Making and selling company."}
        Logo={logo}
        Thumbnail={Thumbnail}
        modal={setModal}
        data={data}
        navigation={navigation}
        show={show}
        isPart={isPart}
      />
      {/* card out */}
      {/* Little nav in */}
      <LittleNav style={{ marginTop: 10 }} title={"PartnerShip Terms"} />
      {/* Little nav out */}
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 23,
          }}
        >
          <MyText
            style={{
              fontSize: 24,
              fontWeight: "700",
              marginTop: 15,
              marginBottom: 10,
            }}
          >
            Details
          </MyText>
        </View>
        <View>
          {PartnerShip.map((item) => (
            <TickPara para={item} style={{ paddingHorizontal: 23 }} />
          ))}
        </View>
      </View>
      <BottomPopup show={modal.modal1} setshow={setModal} />
    </ScrollView>
  );
};

export default PartnerShipTerms;

const styles = StyleSheet.create({});
