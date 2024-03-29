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
import BottomPopup2 from "../../Components/BottomPopup2";
import { useIsFocused } from "@react-navigation/native";
import CartContext from "../../Context/CartProvider";
import { DeleteMileStones } from "../Profile/services/FreeLancerServices";

// component
function MileStoneComponent({ para, ...props }) {
  const {
    theme: { colors },
  } = useContext(Context);

  const [progress, setprogress] = useState();
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
          value={props.item.progress}
          progressValueColor={"#000"}
          fontSize={12}
          valueSuffix={"%"}
          inActiveStrokeColor={"#D1D1D1"}
          inActiveStrokeOpacity={1}
          activeStrokeColor={props.item.progress == 100 ? "#13B887" : "#8489FC"}
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
          <Pressable
            onPress={() => {
              props.data({
                ...props.item,
                startupId: props.Credentials.startup._id,
              });
              // props.nav.navigate("ViewMileStone", { data: props.send });
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
              {props.item.title}
            </MyText>
          </Pressable>
          {props.show && (
            <Pressable
              onPress={() => {
                props.modal((currents) => ({ ...currents, modal2: true }));

                props.data({
                  ...props.item,
                  startupId: props.Credentials.startup._id,
                });
              }}
            >
              <Feather name="more-horizontal" size={24} color="#A1A1A1" />
            </Pressable>
          )}
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
            {props.item.description}
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
              Due : {props.item.dueDate.substring(0, 10)}
            </MyText>
          </View>
        </View>
        {/* date off */}
      </View>

      {/* text off */}
    </View>
  );
}
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here
  // is better than directly setting `setValue(value + 1)`
}
const MileStone = ({ navigation, route }) => {
  const [show, setshow] = useState(route.params.show);
  console.log("show", show);
  const [data, setData] = useState(route.params.data);
  const [isPart, setisPart] = useState(route.params.isPart);
  const [undefinedd, setundefined] = useState(route.params.undefinedd); //route.params.undefinedd
  const isFocused = useIsFocused();

  const {
    theme: { colors },
  } = useContext(Context);
  const contest = useContext(CartContext);
  const [MileStones, setMileStone] = useState(data.startup.milestones);
  const updateMileStone = (data) => {
    setMileStone(data);
  };

  function handlePress(text) {
    if (text == "+ Add new Item") {
      navigation.navigate("AddMileStone", { data: data, set: updateMileStone });
    }
    if (text == "Register") {
      navigation.navigate("StartScreen");
    }
  }
  let popupRef = React.useRef();
  const [modal, setModal] = useState({ modal1: false, modal2: false });

  const [CurrentMileStone, setCurrentMileStone] = useState({});

  // Api call

  const DeleteMileStone = async (startup, milestone) => {
    // console.log("obj", Obj);
    const resp = await DeleteMileStones(startup, milestone);

    // console.log(resp.data);
    if (resp.data.status === "OK") {
      contest.setmilestone(resp.data.milestones);
      setMileStone(resp.data.milestones);
      // setObj({ ...changed, progress: range });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      {/* header */}
      <CustomHeader2 nav={navigation} Title={data.startup.businessName} />
      {/* header out */}

      <ScrollView>
        {/* card in */}
        <CampaignCard
          title={data.startup.businessName}
          niche={data.startup.category}
          Logo={data.startup.logo}
          Thumbnail={Thumbnail}
          modal={setModal}
          show={show}
          isPart={isPart}
          undefinedd={undefinedd}
          navigation={navigation}
          data={data}
        />
        {/* card out */}
        {/* Little nav in */}
        <LittleNav
          style={{ marginTop: 10 }}
          title={"Milestones"}
          navigation={navigation}
          chevron={true}
        />
        {/* Little nav out */}
        {/* mile Stones in */}
        <View style={{ paddingHorizontal: 12, marginTop: 10 }}>
          {MileStones.length !== 0 ? (
            MileStones.map((item) => (
              <MileStoneComponent
                item={item}
                style={{ marginVertical: 8 }}
                modal={setModal}
                data={setCurrentMileStone}
                send={CurrentMileStone}
                Credentials={data}
                nav={navigation}
                show={show}
              />
            ))
          ) : (
            <View>
              <MyText
                style={{
                  fontSize: 20,
                  color: "red",
                  textAlign: "center",
                  fontWeight: "700",
                }}
              >
                No MileStones Found
              </MyText>
            </View>
          )}
        </View>
        {/* mile Stones out */}
        {/* Button in */}
        {show ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Buttons
              color={colors.text}
              text="+ Add new Item"
              style={{ width: "50%", alignSelf: "center" }}
              pass={handlePress}
            />
          </View>
        ) : undefinedd ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Buttons
              color={colors.text}
              text="Register"
              style={{ width: "50%", alignSelf: "center" }}
              pass={handlePress}
            />
          </View>
        ) : null}
        <BottomPopup show={modal.modal1} setshow={setModal} />
        <BottomPopup2
          show={modal.modal2}
          setshow={setModal}
          nav={navigation}
          data={CurrentMileStone}
          set={updateMileStone}
          mileStoneArray={data}
          DeleteMileStone={DeleteMileStone}
          visible={show}
        />
      </ScrollView>
    </View>
  );
};

export default MileStone;

const styles = StyleSheet.create({});
