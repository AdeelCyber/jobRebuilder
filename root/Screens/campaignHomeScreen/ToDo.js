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
import DynamicButton from "../../Components/DynamicButton";
import TeamItem from "../../Components/TeamItem";
import { FontAwesome } from "@expo/vector-icons";
import HorizontalCalendar from "../../Components/HorizontalCalendar";
import TodoListItem from "../../Components/TodoListItem";
import Buttons from "../../Components/Buttons";

const Todo = ({ navigation, route }) => {
  const [show, setshow] = useState(route.params.show);
  const [data, setData] = useState(route.params.data);
  // console.log(data);'
  // console.log(data.todos[0].todos);
  const {
    theme: { colors },
  } = useContext(Context);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month, setMonth] = useState("January");

  const [Roles, setRoles] = useState([]);

  function handlePress(text) {
    navigation.navigate("AddNewTask", {
      data: data,
      set: setRoles,
      date: selectedDate,
    });
  }
  useEffect(() => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date();
    let name = month[d.getMonth()];
    setMonth(name);
    if (data.todos[0] !== undefined) {
   
      console.log("OK 54");
      setRoles(data.todos[0].todos);
    } else {
      setRoles([]);
      console.log("OK 56");
    }
  }, []);
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
      <View style={{ flex: 1 }}>
        {/* header */}
        <CustomHeader2
          icon={() => <FontAwesome name="calendar" size={24} color="black" />}
          Title={month}
          style={{ elevation: 0 }}
          nav={navigation}
        />
        {/* header out */}
        <View
          style={{
            width: "100%",
            marginTop: 28,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HorizontalCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <View
            style={{
              borderTopWidth: 1,
              borderColor: "#00000014",
              marginBottom: 5,
              width: "94%",
            }}
          ></View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
            marginVertical: 13,
          }}
        >
          <MyText style={{ fontSize: 24, fontWeight: "700" }}>
            {Roles.length} Tasks Today
          </MyText>
        </View>
        {/* Todo Item in */}
        {/* <ScrollView style={{}}>
          {Roles.map((item) => (
            <TodoListItem
              Title={item.Title}
              style={{
                marginHorizontal: 23,
                elevation: 5,
                shadowColor: "#0000003B",
                marginVertical: 10,
                borderWidth: 0.2,
              }}
            />
          ))}
        </ScrollView> */}

        {Roles.length !== 0 ? (
          <FlatList
            data={Roles}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item }) => (
              <TodoListItem
                Title={item.title}
                item={item}
                data={data}
                set={setRoles}
                style={{ marginHorizontal: 23, marginVertical: 10 }}
                navigation={navigation}
                show={show}
              />
            )}
          />
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
              No Todo Found
            </MyText>
          </View>
        )}

        {/* Todo item out */}
      </View>
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
            text=" + Add new Task"
            style={{ width: "50%", alignSelf: "center" }}
            pass={handlePress}
          />
        </View>
      )}
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({});
