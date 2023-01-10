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
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import MyText from "../../Components/Text";
import CampaignCard from "../../Components/CampaignCard";
import logo from "../../../assets/Svgs/MotoMobileLogo";
import Thumbnail from "../../../assets/img/Thumbnail.png";
import LittleNav from "../../Components/LittleNav";
import TickPara from "../../Components/TickPara";
import { Feather } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";
import Buttons from "../../Components/Buttons";
import BottomPopup from "../../Components/BottomPopup";

// component
function MileStoneComponent({ para, ...props }) {
  const {
    theme: { colors },
  } = useContext(Context);

  const [progress, setprogress] = useState(props.item.Progress);
  const [color, setColor] = useState("#8489FC");
  return (
    <View
      style={{
        backgroundColor: colors.lightback,
        borderRadius: 8,
        flexDirection: "row",
        padding: 10,
        ...props.style,
      }}
    >
      {/* widget */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          radius={30}
          value={progress}
          progressValueColor={"#000"}
          fontSize={12}
          valueSuffix={"%"}
          inActiveStrokeColor={"#D1D1D1"}
          inActiveStrokeOpacity={1}
          activeStrokeColor={progress == 100 ? "#13B887" : "#8489FC"}
          activeStrokeWidth={4}
          inActiveStrokeWidth={1}
          duration={3000}
          onAnimationComplete={() => {
            if (progress == 100) {
              setColor("#13B887");
            }
          }}
        />
      </View>
      {/* widget off */}
      {/* text in */}
      <View style={{ flex: 1 }}>
        {/* head in */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <MyText
            style={{
              color: colors.black,
              fontWeight: "500",
              fontSize: 16,
              lineHeight: 20,
            }}
          >
            {props.item.Title}
          </MyText>
          <Feather name="more-horizontal" size={24} color="#A1A1A1" />
        </View>
        {/* head off */}
        {/* lorem in */}
        <View style={{ paddingHorizontal: 5 }}>
          <MyText
            style={{
              color: colors.lighttext,
              fontWeight: "400",
              fontSize: 12,
              lineHeight: 20,
            }}
          >
            {props.item.para}
          </MyText>
        </View>
        {/* lorem off */}
        {/* date in */}
        <View style={{ alignSelf: "flex-end", paddingHorizontal: 5 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ marginRight: 4 }}>
              <Feather name="calendar" size={15} color="#969696" />
            </View>
            <MyText
              style={{
                color: colors.Datee,
                fontWeight: "400",
                fontSize: 12,
                lineHeight: 20,
              }}
            >
              Due:{props.item.Date}
            </MyText>
          </View>
        </View>
        {/* date off */}
      </View>

      {/* text off */}
    </View>
  );
}

const MileStone = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  function handlePress(text) {
    alert(text);
  }
  let popupRef = React.useRef();
  const [modal, setModal] = useState({ modal1: false });

  const [MileStones, setMileStone] = useState([
    {
      para: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo,",
      Title: "MileStone",
      Progress: 10,
      Date: "20 Jan,2022",
    },
    {
      para: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo,",
      Title: "MileStone",
      Progress: 100,
      Date: "20 Jan,2022",
    },
    {
      para: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo,",
      Title: "MileStone",
      Progress: 10,
      Date: "20 Jan,2022",
    },
    // " Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo,",
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
        title={"MotoMobiles"}
        niche={"Mobile Making and selling company."}
        Logo={logo}
        Thumbnail={Thumbnail}
        modal={setModal}
      />
      {/* card out */}
      {/* Little nav in */}
      <LittleNav style={{ marginTop: 10 }} title={"Milestones"} />
      {/* Little nav out */}
      {/* mile Stones in */}
      <View style={{ paddingHorizontal: 12, marginTop: 10 }}>
        {MileStones.map((item) => (
          <MileStoneComponent item={item} style={{ marginVertical: 8 }} />
        ))}
      </View>
      {/* mile Stones out */}
      {/* Button in */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Buttons
          color={colors.text}
          text=" + Add new Item"
          style={{ width: "50%", alignSelf: "center" }}
          pass={handlePress}
        />
      </View>
      <BottomPopup show={modal.modal1} setshow={setModal} />
    </ScrollView>
  );
};

export default MileStone;

const styles = StyleSheet.create({});
