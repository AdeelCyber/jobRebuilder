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
import LittleNav2 from "../../Components/LittleNav2";
import BottomPopup from "../../Components/BottomPopup";
import { getStartupDetails } from "../Profile/services/FreeLancerServices";
import CartContext from "../../Context/CartProvider";
import Loader from "../../Components/Loader";

const CampaignMenu = ({ navigation, route }) => {
  const [show, setshow] = useState(false);
  const [id, setid] = useState(route.params.id);
  const {
    theme: { colors },
  } = useContext(Context);

  const [handlePress, setHandlePress] = useState("");
  const [data, setData] = useState("");
  const [Loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState({ modal1: false, modal2: false });
  const [page, setpage] = useState("OverView");

  // Api call
  useEffect(() => {
    const getFreelancersData = async () => {
      const resp = await getStartupDetails(id);

      console.log(resp.data);
      if (resp.data.status === "OK") {
        console.log("done");

        setData(resp.data);

        setLoaded(true);
      }
    };

    getFreelancersData();
  }, []);

  const userDetails = useContext(CartContext);
  // console.log(userDetails.userdetails.role);
  const [undefinedd, setundefined] = useState(false);
  const [isPart, setispart] = useState(true);
  useEffect(() => {
    if (data) {
      if (data.todos !== undefined) {
        console.log(console.log(data.todos));
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

  //module

  // console.log(userDetails.userdetails.role);

  useEffect(() => {
    if (userDetails.userdetails.role === "Startup Owner") {
      console.log("startup owner");
      setshow(true);
    }
  }, []);

  return Loaded ? (
    // main container
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
          data={data}
          navigation={navigation}
          show={show}
          isPart={isPart}
          undefinedd={undefinedd}
          setter={setpage}
        />
        {/* card out */}
        {/* Little nav in */}
        <LittleNav
          style={{ marginTop: 10 }}
          title={page}
          chevron={true}
          navigation={navigation}
          Switch={true}
          page={page}
          data={data}
          show={show}
          isPart={isPart}
          undefinedd={undefinedd}
        />
        {/* Little nav out */}
        <View>
          {/* 1 */}
          <Pressable
            onPress={() => {
              navigation.navigate("OverView", {
                data: data,
                show: show,
                isPart: isPart,
                undefinedd: undefinedd,
              });
              setpage("OverView");
            }}
            style={{
              backgroundColor: colors.listback,
              paddingVertical: 15,
            }}
          >
            {page === "OverView" ? (
              <LittleNav2
                title={"OverView"}
                hamburger={false}
                style={{ paddingHorizontal: 12 }}
              />
            ) : (
              <MyText
                style={{
                  color: colors.lighttext,
                  fontWeight: "500",
                  fontSize: 16,
                  paddingHorizontal: 20,
                }}
              >
                Overview
              </MyText>
            )}
          </Pressable>
          {/* 2 */}
          <Pressable
            onPress={() => {
              navigation.navigate("TeamRoles", {
                data: data,
                show: show,
                isPart: isPart,
                undefinedd: undefinedd,
              }),
                setpage("TeamRoles");
            }}
            style={{
              backgroundColor: colors.listback,
              paddingVertical: 15,
            }}
          >
            {page === "TeamRoles" ? (
              <LittleNav2
                title={"Role"}
                hamburger={false}
                style={{ paddingHorizontal: 12 }}
              />
            ) : (
              <MyText
                style={{
                  color: colors.lighttext,
                  fontWeight: "500",
                  fontSize: 16,
                  paddingHorizontal: 20,
                }}
              >
                Role
              </MyText>
            )}
          </Pressable>
          {/* 3 */}
          <Pressable
            onPress={() => {
              navigation.navigate("PartnerShipTerms", {
                data: data,
                show: show,
                isPart: isPart,
                undefinedd: undefinedd,
              });
              setpage("Partnership Terms");
            }}
            style={{
              backgroundColor: colors.listback,
              paddingVertical: 15,
            }}
          >
            {page === "Partnership Terms" ? (
              <LittleNav2
                title={"Partnership Terms"}
                hamburger={false}
                style={{ paddingHorizontal: 12 }}
              />
            ) : (
              <MyText
                style={{
                  color: colors.lighttext,
                  fontWeight: "500",
                  fontSize: 16,
                  paddingHorizontal: 20,
                }}
              >
                Partnership Terms
              </MyText>
            )}
          </Pressable>
        </View>
        {/* Little nav in */}
        <Pressable
          onPress={() => {
            navigation.navigate("MileStone", {
              data: data,
              show: show,
              isPart: isPart,
              undefinedd: undefinedd,
            });
            setpage("MileStones");
          }}
          style={{
            backgroundColor: colors.listback,
            paddingVertical: 15,
          }}
        >
          {page === "MileStones" ? (
            <LittleNav2
              title={"MileStones"}
              hamburger={false}
              style={{ paddingHorizontal: 12 }}
            />
          ) : (
            <MyText
              style={{
                color: colors.lighttext,
                fontWeight: "500",
                fontSize: 16,
                paddingHorizontal: 20,
              }}
            >
              MileStones
            </MyText>
          )}
        </Pressable>
        {/* Little nav out */}
        <Pressable
          onPress={() => {
            navigation.navigate("PitchDeck", {
              data: data,
              show: show,
              isPart: isPart,
              undefinedd: undefinedd,
            });
            setpage("PitchDeck");
          }}
          style={{
            backgroundColor: colors.listback,
            paddingVertical: 15,
          }}
        >
          {page === "PitchDeck" ? (
            <LittleNav2
              title={"PitchDeck"}
              hamburger={false}
              style={{ paddingHorizontal: 12 }}
            />
          ) : (
            <MyText
              style={{
                color: colors.lighttext,
                fontWeight: "500",
                fontSize: 16,
                paddingHorizontal: 20,
              }}
            >
              PitchDeck
            </MyText>
          )}
        </Pressable>
        <BottomPopup show={modal.modal1} setshow={setModal}   />
      </ScrollView>
    </View>
  ) : (
    <Loader visible={!Loaded} color="white" indicatorSize="large" />
  );
};

export default CampaignMenu;

const styles = StyleSheet.create({});
