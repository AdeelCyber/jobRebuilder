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
import Location from "../../../assets/Svgs/Location";
import Budget from "../../../assets/Svgs/Budget";
import Category from "../../../assets/Svgs/Category";
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
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* header */}
      <CustomHeader2 nav={navigation} Title={data.startup.businessName} />
      {/* header out */}
      <ScrollView>
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
        <LittleNav
          style={{ marginTop: 10 }}
          title={"OverView"}
          navigation={navigation}
          chevron={true}
        />
        {/* Little nav out */}
        {/* One unit system */}
        <View>
          <View
            style={{
              paddingHorizontal: 23,
              marginTop: 15,
              marginBottom: 20,
            }}
          >
            <MyText style={{ fontSize: 18, fontWeight: "700" }}>
              Problem Statement
            </MyText>
          </View>
          <View>
            <TickPara
              para={data.startup.problemStatement}
              textStyle={{ fontSize: 15 }}
            />
          </View>
        </View>
        {/* One unit system out */}
        {/* One unit system */}
        <View>
          <View
            style={{
              paddingHorizontal: 23,

              marginBottom: 20,
            }}
          >
            <MyText style={{ fontSize: 18, fontWeight: "700" }}>
              Impact Statement
            </MyText>
          </View>
          <View>
            <TickPara
              para={data.startup.impactStatement}
              textStyle={{ fontSize: 15 }}
            />
          </View>
        </View>
        {/* One unit system out */}
        {/* One unit system */}
        <View>
          <View
            style={{
              paddingHorizontal: 23,

              marginBottom: 20,
            }}
          >
            <MyText style={{ fontSize: 18, fontWeight: "700" }}>
              Competition
            </MyText>
          </View>
          <View>
            <TickPara
              para={data.startup.competition}
              textStyle={{ fontSize: 15 }}
            />
          </View>
        </View>
        {/* One unit system out */}
        {/* One unit system */}
        <View>
          <View
            style={{
              paddingHorizontal: 23,

              marginBottom: 20,
            }}
          >
            <MyText style={{ fontSize: 18, fontWeight: "700" }}>
              Story about investors
            </MyText>
          </View>
          <View>
            <TickPara para={data.startup.story} textStyle={{ fontSize: 15 }} />
          </View>
        </View>
        {/* One unit system out */}
        {/* One unit system */}
        <View>
          <View
            style={{
              paddingHorizontal: 23,

              marginBottom: 20,
            }}
          >
            <MyText style={{ fontSize: 18, fontWeight: "700" }}>
              Location
            </MyText>
          </View>
          <View>
            <TickPara
              para={data.startup.location}
              logo={Location}
              textStyle={{ fontSize: 15 }}
            />
          </View>
        </View>
        {/* One unit system out */}
        {/* One unit system */}
        <View>
          <View
            style={{
              paddingHorizontal: 23,

              marginBottom: 20,
            }}
          >
            <MyText style={{ fontSize: 18, fontWeight: "700" }}>Budget</MyText>
          </View>
          <View>
            <TickPara
              para={"$ " + data.startup.budget}
              logo={Budget}
              textStyle={{
                fontWeight: "700",
                fontSize: 20,
                color: "#232323BF",
                lineHeight: 30,
              }}
            />
          </View>
        </View>
        {/* One unit system out */}
        {/* One unit system */}
        <View>
          <View
            style={{
              paddingHorizontal: 23,

              marginBottom: 20,
            }}
          >
            <MyText style={{ fontSize: 18, fontWeight: "700" }}>
              Category
            </MyText>
          </View>
          <View>
            <TickPara para={data.startup.category} logo={Category} />
          </View>
        </View>
        {/* One unit system out */}
        <BottomPopup show={modal.modal1} setshow={setModal} />
      </ScrollView>
    </View>
  );
};

export default OverView;

const styles = StyleSheet.create({});
