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
import BottomPopup from "../../Components/BottomPopup";
import { getStartupDetails } from "../Profile/services/FreeLancerServices";
import CartContext from "../../Context/CartProvider";

const CampaignMenu = ({ navigation, route }) => {
  const [show, setshow] = useState(route.params.show);
  const [id, setid] = useState(route.params.id);
  const {
    theme: { colors },
  } = useContext(Context);

  const [handlePress, setHandlePress] = useState("");
  const [data, setData] = useState("");
  const [Loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState({ modal1: false, modal2: false });

  // Api call
  useEffect(() => {
    const getFreelancersData = async () => {
      const resp = await getStartupDetails(id);

      // console.log(resp.data);
      if (resp.data.status === "OK") {
        console.log("done");

        setData(resp.data);

        setLoaded(true);
      }
    };

    getFreelancersData();
  }, []);

  const userDetails = useContext(CartContext);
  console.log(userDetails.userdetails.role);
  const [undefinedd, setundefined] = useState(false);
  const [isPart, setispart] = useState(true);
  useEffect(() => {
    if (data) {
      if (data.todos[0] !== undefined) {
        // console.log(console.log(data.todos[0]));
      } else {
        setispart(false);
        console.log("no todos");
      }
    }
    if (userDetails.userdetails.role === undefined) {
      setundefined(true);
      console.log("user is undefined");
    }
  }, [data]);

  return (
    Loaded && (
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
        />
        {/* card out */}
        {/* Little nav in */}
        <LittleNav
          style={{ marginTop: 10 }}
          title={"Milestones"}
          chevron={true}
        />
        {/* Little nav out */}
        <View>
          {/* 1 */}
          <Pressable
            onPress={() =>
              navigation.navigate("OverView", {
                data: data,
                show: show,
                isPart: isPart,
              })
            }
            style={{
              backgroundColor: colors.listback,
              paddingVertical: 15,
              paddingHorizontal: 18,
            }}
          >
            <MyText
              style={{
                color: colors.lighttext,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              Overview
            </MyText>
          </Pressable>
          {/* 2 */}
          <Pressable
            onPress={() =>
              navigation.navigate("TeamRoles", {
                data: data,
                show: show,
                isPart: isPart,
              })
            }
            style={{
              backgroundColor: colors.listback,
              paddingVertical: 15,
              paddingHorizontal: 18,
            }}
          >
            <MyText
              style={{
                color: colors.lighttext,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              Role
            </MyText>
          </Pressable>
          {/* 3 */}
          <Pressable
            onPress={() =>
              navigation.navigate("PartnerShipTerms", {
                data: data,
                show: show,
                isPart: isPart,
              })
            }
            style={{
              backgroundColor: colors.listback,
              paddingVertical: 15,
              paddingHorizontal: 18,
            }}
          >
            <MyText
              style={{
                color: colors.lighttext,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              Partnership Terms
            </MyText>
          </Pressable>
        </View>
        {/* Little nav in */}
        <Pressable
          onPress={() =>
            navigation.navigate("MileStone", {
              data: data,
              show: show,
              isPart: isPart,
            })
          }
        >
          <LittleNav
            title={"Milestones"}
            hamburger={false}
            style={{ paddingHorizontal: 12 }}
          />
        </Pressable>
        {/* Little nav out */}
        <Pressable
          onPress={() =>
            navigation.navigate("PitchDeck", {
              data: data,
              show: show,
              isPart: isPart,
            })
          }
          style={{
            backgroundColor: colors.listback,
            paddingVertical: 15,
            paddingHorizontal: 18,
          }}
        >
          <MyText
            style={{ color: colors.lighttext, fontWeight: "500", fontSize: 16 }}
          >
            Pitch deck
          </MyText>
        </Pressable>
        <BottomPopup show={modal.modal1} setshow={setModal} />
      </ScrollView>
    )
  );
};

export default CampaignMenu;

const styles = StyleSheet.create({});
