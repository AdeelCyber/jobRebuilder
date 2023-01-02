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
import { Feather } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";
import DynamicButton from "../../Components/DynamicButton";
import TeamItem from "../../Components/TeamItem";
import { FontAwesome } from "@expo/vector-icons";
import HorizontalCalendar from "../../Components/HorizontalCalendar";
import TodoListItem from "../../Components/TodoListItem";
import Buttons from "../../Components/Buttons";

const Todo = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  function handlePress(text) {
    alert(text);
  }

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [Roles, setRoles] = useState([
    {
      Title: "Design Front end",
    },
    {
      Title: "Design Backend",
    },
    {
      Title: "Design Schema",
    },
  ]);

  return (
    // main container
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "space-between",
        paddingBottom: 20,
      }}
    >
      <View>
        {/* header */}
        <CustomHeader2
          icon={() => <FontAwesome name="calendar" size={24} color="black" />}
          Title="January"
        />
        {/* header out */}
        <View style={{ width: "100%", marginTop: 20 }}>
          <HorizontalCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 23,
          }}
        >
          <MyText style={{ fontSize: 24, fontWeight: "700" }}>
            {} Tasks Today
          </MyText>
        </View>
        {/* Todo Item in */}
        <View style={{ paddingHorizontal: 23 }}>
          {Roles.map((item) => (
            <TodoListItem Title={item.Title} />
          ))}
        </View>
        {/* Todo item out */}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Buttons
          color={colors.text}
          text=" + Add new Task"
          style={{ width: "50%", alignSelf: "center" }}
          pass={handlePress}
        />
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({});
