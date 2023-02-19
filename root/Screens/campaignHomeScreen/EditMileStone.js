import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  TextInput,
  ToastAndroid,
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
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditMileStone = ({ navigation, route }) => {
  const [data, setData] = useState(route.params.data);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [commingData, setcommingData] = useState([]);

  const {
    theme: { colors },
  } = useContext(Context);
  const contest = useContext(CartContext);
  const [changed, setchanged] = useState({
    title: data.title,
    description: data.description,
    progress: data.progress,
    dueDate: data.dueDate,
  });

  async function handlePress(text) {
    if (text === "Update") {
      await getFreelancersData();
    }
    if (text === "Cancel") {
      navigation.goBack();
    }
  }
  // Api call

  const getFreelancersData = async () => {
    const resp = await EditMileStones(data.startupId, data._id, changed);

    if (resp.data.status === "OK") {
      route.params.set(resp.data.milestones);
      ToastAndroid.show("Success", ToastAndroid.SHORT);
      navigation.goBack();
    } else {
      ToastAndroid.show("Failed", ToastAndroid.SHORT);
    }
  };

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

            <Pressable
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
              onPress={() => setDatePickerVisibility(true)}
            >
              <Feather name="calendar" size={24} color="white" />
              <MyText
                style={{ color: colors.white, fontSize: 13, marginLeft: 5 }}
              >
                {changed.dueDate.slice(0, 10)}
              </MyText>
            </Pressable>
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(e) => {
          setchanged({ ...changed, dueDate: e.toISOString().split("T")[0] });
          setDatePickerVisibility(false);
        }}
        onCancel={() => {
          setDatePickerVisibility(false);
        }}
        minimumDate={new Date()}
      />
    </View>
  );
};

export default EditMileStone;

const styles = StyleSheet.create({});
