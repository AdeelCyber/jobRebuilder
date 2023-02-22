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
import RolesDropDown from "../../Components/RolesDropDown";
import Buttons from "../../Components/Buttons";
import BottomPopup from "../../Components/BottomPopup";
import { DeleteRoles, Role } from "../Profile/services/FreeLancerServices";
const TeamRoles = ({ navigation, route }) => {
  const [show, setshow] = useState(route.params.show);
  const [isPart, setisPart] = useState(route.params.isPart);
  const [undefinedd, setundefined] = useState(route.params.undefinedd);
  console.log("undefinedd", undefinedd);
  const [modal, setModal] = useState({ modal1: false, modal2: false });
  const [data, setData] = useState(route.params.data);
  const [modal2, setModal2] = useState(false);

  const {
    theme: { colors },
  } = useContext(Context);

  const [Roles, setRoles] = useState([]);
  // console.log(Roles);
  // Api call
  useEffect(() => {
    const getFreelancersData = async () => {
      const resp = await Role(data.startup._id);

      // console.log(resp.data);
      if (resp.data.status === "OK") {
        // console.log(resp.data.projectRoles[0].roles);
        setRoles(resp.data.projectRoles[0].roles);
      }
    };

    getFreelancersData();
  }, []);

  function handlePress(text) {
    if (text === "+ Add new Item") {
      navigation.navigate("AddRoles", { data: data, set: setRoles });
    } else if (text === "delete") {
      console.log(text);
    }
  }
  // Api call

  const DeleteRole = async (startup, milestone) => {
    // console.log("obj", Obj);
    const resp = await DeleteRoles(startup, milestone);

    // console.log(resp.data.projectRoles.roles);
    console.log(resp.data);
    if (resp.data.status === "OK") {
      setRoles(resp.data.projectRoles.roles);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* header */}
      <CustomHeader2 style={{ elevation: 0 }} nav={navigation} />
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
        />
        {/* card out */}
        {/* Little nav in */}
        <LittleNav
          style={{ marginTop: 10 }}
          title={"Roles"}
          navigation={navigation}
          chevron={true}
        />
        {/* Little nav out */}
        {/* roles in */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 23,
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Team Roles</Text>
          </View>
          <View style={{ paddingHorizontal: 23 }}>
            {Roles.length !== 0 ? (
              Roles.map((item) => (
                <RolesDropDown
                  Title={item.title}
                  desc={item.description}
                  nav={navigation}
                  handlePress={handlePress}
                  data={data}
                  item={item}
                  set={setRoles}
                  delete={DeleteRole}
                  show={show}
                  isPart={isPart}
                  undefinedd={undefinedd}
                  setmodal={setModal2}
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
                  No Roles Found
                </MyText>
              </View>
            )}
          </View>
        </View>
        {/* roles out */}
        {/* Black Button */}
        {show && (
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
        )}
        <BottomPopup show={modal.modal1} setshow={setModal} />
      </ScrollView>
    </View>
  );
};

export default TeamRoles;

const styles = StyleSheet.create({});
