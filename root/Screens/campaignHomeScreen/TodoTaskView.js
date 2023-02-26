import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  ToastAndroid,
} from "react-native";

import React, { useContext, useState } from "react";
import Context from "../../Context/Context";
import CustomHeader2 from "../../Components/CustomHeader2";
import { Searchbar } from "react-native-paper";
import SvgImport from "../../Components/SvgImport";
import MyText from "../../Components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DynamicButton from "../../Components/DynamicButton";
import TodoListItem from "../../Components/TodoListItem";
import MileStoneViewBar from "../../Components/MileStoneViewBar";
import TodoTaskViewBar from "../../Components/TodoTaskViewBar";
import Slider from "@react-native-community/slider";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { DeleteTodo } from "../Profile/services/FreeLancerServices";
import { fileUpload, downloadFile } from "../Profile/services/fileServices";
import axios from '../../http/axiosSet'

const TodoTaskView = ({ navigation, route }) => {
  const [show, setshow] = useState(route.params.show);
  const [data, setData] = useState(route.params.data);
  const [item, setitem] = useState(route.params.item);

  const {
    theme: { colors },
  } = useContext(Context);
  const [currentTask, setcurrentTask] = useState(item);
  console.log("Current", currentTask);
  function handlePress(text) {
    alert(text);
  }

  //Api call
  const DeleteMileStone = async (startup, todo) => {
    const resp = await DeleteTodo(startup, todo);

    // console.log(resp.data);
    if (resp.data.status === "OK") {
      route.params.set(resp.data.todos);
      navigation.goBack();
    }
  };

  const Update = (data) => route.params.set(data);

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
          Title={"Monday" + "'s Task"}
          style={{ elevation: 0 }}
          nav={navigation}
        />
        {/* header out */}
        {/* Inputs In */}
        <View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 14,
            }}
          >
            {/* Title in */}
            <TodoTaskViewBar
              Title={currentTask.title}
              style={{ borderWidth: 0, elevation: 0 }}
            />
            {/* title out */}
            <MyText
              style={{
                color: colors.lighttext,
                fontSize: 13,

                marginTop: 0,
                alignSelf: "flex-start",
              }}
            >
              {currentTask.description}
            </MyText>
            {/* Avatars View In */}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingTop: 15,
              }}
            >
              {currentTask.members.map((item, index) => {
                return (
                  <Image
                    source={{ uri: `${axios.defaults.baseURL}media/getImage/${item.avatar}` }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginRight: 8,
                    }}
                  />
                );
              })}
            </View>
            {/* Avatars View out */}
            {/* Attach Button View in */}
            <DynamicButton
              text="Files Attached"
              style={{
                backgroundColor: "#E8E8E8",
                width: "45%",
                paddingVertical: 17,
                alignSelf: "flex-start",
                marginTop: 30,
                paddingHorizontal: 25,
                paddingRight: 30,
              }}
              handlePress={(text) => {
                downloadFile(
                  `${axios.defaults.baseURL}media/getFile/${currentTask.file}`
                );
                ToastAndroid.show("Downloading...", ToastAndroid.SHORT);
              }}
              textStyle={{ color: "#232323", fontSize: 14 }}
              logo={true}
            />
          </View>
        </View>

        {/* Inputs Out */}
      </View>
      {/* Buttons View In */}
      <View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#00000014",
            marginBottom: 5,
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 15,
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          {/* Both Icons in */}
          {show && (
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
              }}
            >
              <Pressable
                style={{ marginRight: 10 }}
                onPress={() => DeleteMileStone(data.startup._id, item._id)}
              >
                <AntDesign name="delete" size={24} color="black" />
              </Pressable>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "35%",

                  borderLeftWidth: 1,
                  borderColor: "#DEDEDE",
                }}
              ></View>
              <Pressable
                style={{ marginLeft: 10 }}
                onPress={() =>
                  navigation.navigate("EditTask", {
                    set: Update,
                    item: route.params.item,
                    data: route.params.data,
                  })
                }
              >
                <MaterialIcons name="edit" size={24} color="black" />
              </Pressable>
            </View>
          )}
          {!show && <View></View>}
          {/* Both Icons Out */}
          <DynamicButton
            text="Complete"
            style={{
              backgroundColor: "#E8E8E8",
              width: "50%",
              paddingVertical: 15,
              alignSelf: "flex-end",
            }}
            textStyle={{ color: "#232323" }}
            handlePress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

export default TodoTaskView;

const styles = StyleSheet.create({});
