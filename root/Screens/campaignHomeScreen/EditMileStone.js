import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";

import React, { useContext, useState, useEffect } from "react";
import Context from "../../Context/Context";
import CustomHeader2 from "../../Components/CustomHeader2";
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import MyText from "../../Components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DynamicButton from "../../Components/DynamicButton";
import TodoListItem from "../../Components/TodoListItem";
import MileStoneViewBar from "../../Components/MileStoneViewBar";
import Slider from "@react-native-community/slider";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EditMileStones } from "../Profile/services/FreeLancerServices";
import CartContext from "../../Context/CartProvider";

const EditMileStone = ({ navigation, route }) => {
  const [data, setData] = useState(route.params.data);
  // console.log(data);
  //Coming data useState named comming data
  // console.log("WHat data", route.params.mileStoneArray.startup.milestones);
  const [commingData, setcommingData] = useState([]);

  // slider hooks in
  const [range, setrange] = useState(50);
  // console.log("range", range);
  const [sliding, setsliding] = useState("Inactive");
  const [update, setupdate] = useState([]);

  const {
    theme: { colors },
  } = useContext(Context);
  const contest = useContext(CartContext);
  const [changed, setchanged] = useState({
    title: data.title,
    description: data.description,
    progress: data.progress,
  });
  const [Obj, setObj] = useState({ ...changed });
  async function handlePress(text) {
    if (text === "Update") {
      setObj({ ...changed });
      // console.log("obj", Obj);
      await getFreelancersData();
      // console.log("data sending" + JSON.stringify(data));
      navigation.goBack();
    }
    if (text === "Cancel") {
      navigation.navigate("MileStone", { data: route.params.mileStoneArray });
      // console.log("data sending" + JSON.stringify(route.params.mileStoneArray));
    }
  }
  // Api call

  const getFreelancersData = async () => {
    setObj({ ...changed });
    // console.log("obj", Obj);
    const resp = await EditMileStones(data.startupId, data._id, changed);
    // console.log(
    //   "startuptoken == " + data.startupId,
    //   "mileStoneID == " + data._id
    // );
    // console.log(resp.data);
    if (resp.data.status === "OK") {
      setcommingData(resp.data.milestones);
      // setObj({ ...changed, progress: range });

      route.params.set(commingData);
    }
  };

  useEffect(() => {
    route.params.set(commingData);
    contest.setmilestone(commingData);
    // console.log("iTS length", commingData.length);
    // if (commingData.length === 0) {
    //   route.params.set([...route.params.mileStoneArray.startup.milestones]);
    // }
  }, [commingData]);

  return (
    // main container
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "space-between",
      }}
    >
      <View>
        {/* header */}
        <CustomHeader2
          icon={() => {
            return (
              <MaterialCommunityIcons
                name="bell-circle"
                size={28}
                color="black"
              />
            );
          }}
          Title="Team Roles"
          style={{ elevation: 0 }}
          nav={navigation}
        />
        {/* header out */}
        {/* Inputs In */}
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <TextInput
            placeholderTextColor="#232323BF"
            value={changed.title}
            style={{
              backgroundColor: colors.white,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#000000",
              color: colors.text,
              padding: 8,
              width: "92%",
              fontWeight: "500",
              fontSize: 16,
              paddingHorizontal: 14,
            }}
            onChangeText={(got) => {
              {
                setchanged({ ...changed, title: got });
              }
            }}
          />
          <TextInput
            multiline={true}
            placeholderTextColor="#232323BF"
            value={changed.description}
            style={{
              backgroundColor: colors.white,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#000000",
              color: colors.lighttext,
              padding: 8,
              width: "92%",
              marginTop: 20,
              paddingHorizontal: 14,
            }}
            onChangeText={(got) => {
              {
                setchanged({ ...changed, description: got });
              }
            }}
          />
          <View style={{ alignSelf: "flex-start", marginLeft: 5 }}>
            <MyText
              style={{
                color: colors.text,
                paddingHorizontal: 10,
                fontSize: 16,
                fontWeight: "500",

                marginTop: 15,
                alignSelf: "flex-start",
              }}
            >
              Progress
            </MyText>
            {/* slider view in */}
            <View
              style={{
                alignSelf: "flex-start",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Slider
                style={{ height: 40, width: 250, marginLeft: 0 }}
                minimumTrackTintColor={colors.secondary}
                minimumValue={0.1}
                maximumValue={1}
                maximumTrackTintColor={"#D9D9D9"}
                thumbTintColor={colors.secondary}
                value={data.progress / 100}
                onValueChange={(value) =>
                  setchanged({ ...changed, progress: parseInt(value * 100) })
                }
              />
              <MyText
                style={{ marginRight: 12, fontWeight: "500", fontSize: 16 }}
              >
                {changed.progress} %
              </MyText>
            </View>
            {/* slider view out */}
            <MyText
              style={{
                color: colors.text,
                paddingHorizontal: 10,
                fontSize: 16,
                fontWeight: "500",

                marginTop: 15,
                alignSelf: "flex-start",
              }}
            >
              Due Date
            </MyText>

            <View
              style={{
                marginLeft: 10,
                backgroundColor: colors.secondary,
                alignSelf: "flex-start",
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 5,
                paddingHorizontal: 8,
              }}
            >
              <Feather name="calendar" size={24} color="white" />
              <MyText
                style={{ color: colors.white, fontSize: 13, marginLeft: 5 }}
              >
                {data.dueDate.slice(0, 10)}
              </MyText>
            </View>
          </View>
        </View>
        {/* Inputs Out */}
      </View>
      {/* Buttons View In */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <DynamicButton
          handlePress={handlePress}
          text={"Cancel"}
          color={"#EBEBEB"}
          textStyle={{ color: colors.text }}
          style={{ width: "48%" }}
        />
        <DynamicButton
          handlePress={handlePress}
          text={"Update"}
          color={colors.secondary}
          textStyle={{ color: colors.white }}
          style={{ width: "48%" }}
        />
      </View>
    </View>
  );
};

export default EditMileStone;

const styles = StyleSheet.create({});
