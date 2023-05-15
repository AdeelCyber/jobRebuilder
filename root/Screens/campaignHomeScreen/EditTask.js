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
import calender from "../../../assets/Svgs/Calender";
import questionMark from "../../../assets/Svgs/QuestionMark";
import Link from "../../../assets/Svgs/Link";
import magnifine from "../../../assets/Svgs/GreyMagnifine";
import { SearchBar } from "react-native-paper";
import TeamMember from "../../Components/TeamMember";
import * as DocumentPicker from "expo-document-picker";
import { fileUpload } from "../Profile/services/fileServices";
import { AddTodo, EditTodo } from "../Profile/services/FreeLancerServices";
import { log } from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditTask = ({ navigation, route }) => {
  const isfocused = useIsFocused();
  const [data, setData] = useState(route.params.data);
  const [item, setitem] = useState(route.params.item);
  const [getdocinfo, setdocinfo] = useState();
  // console.log(item);
  const {
    theme: { colors },
  } = useContext(Context);
  const [menu, setmenu] = useState(data.startup.members);
  const [member, setmember] = useState([]);
  console.log("member", member);
  useEffect(() => {
    //set setmember equal to array of _id in item.members
    for (let i = 0; i < item.members.length; i++) {
      setmember([...member, item.members[i]._id]);
    }
  }, [isfocused]);
  const [changed, setchanged] = useState({
    //title and description
    title: item.title,
    description: item.description,
    dueDate: item.dueDate,
    file: item.file,
    members: member,
  });
  console.log("changed", changed);

  const [search, setSearch] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const filteredData = (searchTerm) => {
    let temp = menu;
    if (
      searchTerm !== "" &&
      searchTerm !== null &&
      searchTerm !== undefined &&
      searchTerm !== " "
    ) {
      temp = menu.filter((item) => {
        return item.member.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    }
    return temp;
  };
  //upload file
  const [upload, setupload] = useState(false);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    const pdf = await fileUpload(result.uri);

    setdocinfo(JSON.parse(pdf.body));

    setupload(true);
  };

  useEffect(() => {
    if (upload) {
      setchanged({ ...changed, file: getdocinfo.filename });
      console.log("pdf", getdocinfo.filename);
    }
  }, [upload]);
  //upload out

  // Api call

  const getFreelancersData = async () => {
    const resp = await EditTodo(data.startup._id, item._id, changed);
    console.log("resp", resp.data, changed);

    if (resp.data.status === "OK") {
      route.params.set(resp.data.todos.todos);
      navigation.goBack();
      ToastAndroid.show("Task Updated", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Error", ToastAndroid.SHORT);
    }
  };

  function handlePress(text) {
    if (text === "Update") {
      getFreelancersData();
    }
  }
  function handleArray(text, id, item) {
    if (text === "Add") {
      console.log("id add ", id);
      ToastAndroid.show("Member Added", ToastAndroid.SHORT);
      console.log("member", member);

      setchanged({ ...changed, members: [...changed.members, id] });
      console.log(changed);
    }
    if (text === "Sub") {
      console.log("id sub ", id);
      console.log("member", member);
      ToastAndroid.show("Member Removed", ToastAndroid.SHORT);
      setmember(member.filter((item) => item._id !== id));
      setchanged({ ...changed, members: member.filter((item) => item !== id) });
    }
  }

  return (
    // main container
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* View 1 */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 5,
        }}
      >
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
          Title="Edit Task"
          style={{ elevation: 0 }}
          nav={navigation}
        />
        {/* header out */}
        {/* heading */}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled
        >
          <MyText
            style={{
              marginLeft: 15,
              fontWeight: "700",
              fontSize: 16,
              marginTop: 15,
            }}
          >
            Enter the details
          </MyText>
          {/* Inputs In */}
          <View
            style={{
              width: "100%",

              alignItems: "center",
              marginTop: 15,
            }}
          >
            <TextInput
              placeholderTextColor="#ACA9A9"
              placeholder="Mile Stone"
              value={changed.title}
              style={{
                backgroundColor: "#EEEEEE",

                borderColor: "#000000",
                color: colors.text,
                padding: 8,
                width: "94%",
                fontWeight: "400",
                fontSize: 14,
                borderRadius: 10,
                paddingVertical: 12,
                paddingHorizontal: 14,
              }}
              onChangeText={(got) => {
                {
                  setchanged({ ...changed, title: got });
                }
              }}
            />
            <View
              style={{
                width: "100%",

                alignItems: "center",
                position: "relative",
              }}
            >
              <TextInput
                multiline={true}
                placeholderTextColor="#ACA9A9"
                placeholder="Role Description"
                value={changed.description}
                style={{
                  backgroundColor: "#EEEEEE",

                  borderColor: "#000000",
                  color: colors.lighttext,
                  padding: 8,
                  width: "94%",
                  marginTop: 10,
                  height: 200,
                  fontWeight: "400",
                  fontSize: 14,
                  justifyContent: "flex-start",
                  textAlignVertical: "top",
                  borderRadius: 10,
                  paddingHorizontal: 14,
                }}
                onChangeText={(got) => {
                  {
                    setchanged({ ...changed, description: got });
                  }
                }}
              />
              <Pressable style={{ right: 20, top: 20, position: "absolute" }}>
                <SvgImport svg={questionMark} />
              </Pressable>
              {/* Date and attach View In */}
              <View
                style={{
                  marginTop: 10,
                  width: "94%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* 1 */}
                <View
                  style={{
                    backgroundColor: "#EEEEEE",
                    flexDirection: "row",
                    borderRadius: 10,
                    paddingVertical: 10,
                    width: "48%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SvgImport svg={Link} />
                  <Pressable
                    style={{ width: "70%", marginLeft: 5 }}
                    onPress={() => pickDocument()}
                  >
                    <MyText
                      style={{
                        color: "#ACA9A9",
                        fontSize: 14,
                        fontWeight: "400",
                      }}
                    >
                      Attach Files
                    </MyText>
                  </Pressable>
                </View>
                {/* 2 */}
                <Pressable
                  style={{
                    backgroundColor: "#EEEEEE",
                    flexDirection: "row",
                    borderRadius: 10,
                    paddingVertical: 10,
                    width: "48%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    setDatePickerVisibility(true);
                  }}
                >
                  <TextInput
                    style={{ width: "70%", height: "100%", padding: 5 }}
                    placeholderTextColor="#ACA9A9"
                    placeholder="Due Date"
                    value={changed.dueDate.substring(0, 10)}
                    editable={false}
                    selectTextOnFocus={false}
                  />
                  <SvgImport svg={calender} />
                </Pressable>
              </View>
              {/* date and attach out view above */}
              {/* Search Bar in */}
              {/* below view for icon */}
              <View
                style={{
                  backgroundColor: "#EEEEEE",
                  flexDirection: "row",
                  borderRadius: 10,
                  paddingVertical: 10,
                  width: "94%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 19,
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{ width: "70%", height: "100%", padding: 5 }}
                  placeholderTextColor="#ACA9A9"
                  placeholder="Assign Team Member"
                  value={changed.Assign}
                  onChangeText={(got) => {
                    {
                      setSearch(got);
                    }
                  }}
                />
                <SvgImport svg={magnifine} />
              </View>
            </View>

            {/* Date View Out */}
            <MyText
              style={{
                marginLeft: 15,
                fontWeight: "700",
                fontSize: 16,
                marginTop: 15,
                alignSelf: "flex-start",
              }}
            >
              Members
            </MyText>
            {/* Component in */}
            {filteredData(search).map((item) => (
              <TeamMember
                designation={item.position}
                image={item.member.avatar}
                text={item.member.name}
                id={item.member._id}
                item={item}
                handlePress={handleArray}
                style={{ width: "94%", marginVertical: 5 }}
              />
            ))}
          </View>
          {/* Inputs Out */}
        </ScrollView>
      </View>
      {/* Buttons View In */}
      {/* View 2 */}
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          paddingHorizontal: 13,

          marginBottom: 15,
        }}
      >
        <DynamicButton
          handlePress={handlePress}
          text={"Update"}
          color={upload ? "#8489FC" : "#8489FC66"}
          textStyle={{ color: colors.white }}
          style={{ borderRadius: 10, paddingVertical: 18 }}
        />
        <DynamicButton
          handlePress={handlePress}
          text={"Cancel"}
          color={"#EBEBEB"}
          textStyle={{ color: colors.text }}
          style={{ marginTop: 15, borderRadius: 10, paddingVertical: 18 }}
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

export default EditTask;

const styles = StyleSheet.create({});
