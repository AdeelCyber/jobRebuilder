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
import RolesDropDown from "../../Components/RolesDropDown";
import Buttons from "../../Components/Buttons";
import BottomPopup from "../../Components/BottomPopup";
const TeamRoles2 = ({ navigation }) => {
  const [modal, setModal] = useState({ modal1: false, modal2: false });
  const {
    theme: { colors },
  } = useContext(Context);
  function handlePress(text) {
    navigation.navigate("AddRoles");
  }
  const [Roles, setRoles] = useState([
    {
      Title: "Graphic Designer",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis.",
    },
    {
      Title: "Graphic Designer",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis.",
    },
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
      <CustomHeader2 style={{ elevation: 0 }} nav={navigation} />
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
      <LittleNav style={{ marginTop: 10 }} title={"Roles"} />
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
          <Text style={{ fontSize: 24, fontWeight: "700" }}>Team Roles</Text>
        </View>
        <View style={{ paddingHorizontal: 23 }}>
          {Roles.map((item) => (
            <RolesDropDown
              Title={item.Title}
              desc={item.desc}
              nav={navigation}
            />
          ))}
        </View>
      </View>
      {/* roles out */}
      {/* Black Button */}

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
      <BottomPopup show={modal.modal1} setshow={setModal} />
    </ScrollView>
  );
};

export default TeamRoles2;

const styles = StyleSheet.create({});
