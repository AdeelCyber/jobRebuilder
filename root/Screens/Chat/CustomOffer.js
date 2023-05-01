import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";

import Context from "../../Context/Context";
import MyText from "../../Components/Text";
import Icon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

import DropDownPicker from "react-native-dropdown-picker";
import {
  equityOrder,
  oneTimeOrder,
  sendMessagess,
} from "../Profile/services/MessageServices";
import CartProvider from "../../Context/CartProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Toast from "react-native-toast-message";
import * as DocumentPicker from "expo-document-picker";
import { fileUpload } from "../Profile/services/fileServices";
import Loader from "../../Components/Loader";
const CustomOffer = ({ route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const { accessToken, socket } = useContext(CartProvider);
  const { id } = route.params;
  const navigation = useNavigation();
  const [job, setjob] = useState(true);
  const [business, setbusiness] = useState(false);
  const [description, setdescription] = useState();
  const [price, setprice] = useState();
  const [duedate, setduedate] = useState("Select Due Date");
  //set due date to next 7 days
  const [datePicker, setDatePicker] = useState(false);
  // const [date, setDate] = useState(new Date());
  const [getdoc, setdoc] = useState();
  const [getcondition, setcondition] = useState(false);
  const [getdocinfo, setdocinfo] = useState();
  useEffect(() => {
    console.log("\n\n\n\ndate", duedate);
  }, [duedate]);

  const onDateSelected = (event, value) => {
    setduedate(value);
    setDatePicker(false);
  };

  const [jobTitle, setjobTitle] = useState();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    setdoc(result.uri);
    const pdf = await fileUpload(result.uri);
    setdocinfo(JSON.parse(pdf.body));
  };

  const oneTimeOffer = async () => {
    try {
      setcondition(true);
      console.log("sending one time order");
      console.log(duedate);
      const onetime = await oneTimeOrder(
        accessToken,
        id,
        jobTitle,
        description,
        price,
        moment(duedate).format("YYYY-MM-DD")
      );
      console.log(onetime.data);
      if (onetime.status === 201) {
        setcondition(false);

        await sendMessage(onetime.data.data._id, "oneTimeOrder", false);

        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Ordered Created Successfully",
          text2: ".",
        });
        navigation.goBack();
      } else {
        console.log("error");
        console.log(onetime.data);
      }
    } catch (err) {
      console.log(err.message);
      setcondition(false);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: ".",
      });
    }
  };

  let today = new Date();

  const equityOffer = async () => {
    try {
      setcondition(true);
      const equity = await equityOrder(
        accessToken,
        id,
        jobTitle,
        description,
        price,
        getdocinfo.filename
      );
      // console.log(equity);
      if (equity.status == 201) {
        setcondition(false);
        await sendMessage(equity.data.data._id, "equityOrder", false);

        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Ordered Created Successfully",
          text2: ".",
        });
        navigation.goBack();

        // navigation.navigate("MessagesBox", { order: onetime.data });
      } else {
      }
    } catch (err) {
      setcondition(false);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: ".",
      });
    }
  };
  const sendMessage = async (message, type, toNavigate = true) => {
    //console.log("type", type);
    //  console.log("msg", message);
    //  console.log("id", id);
    const time = moment(duedate).format("YYYY-MM-DD");

    const res = await sendMessagess(accessToken, id, message, type);
    console.log(res.status);
    if (res.status == 200) {
      if (type === "equityOrder") {
        socket.emit("private message", {
          to: id,
          content: {
            msgcontent: message,
            messageType: type,
            totalPrice: price,
            jobTitle: jobTitle,
            partnershipAgreement: getdocinfo.filename,
          },
        });
      } else {
        socket.emit("private message", {
          to: id,
          content: {
            msgcontent: message,
            messageType: type,
            deliveryTime: time,
            totalPrice: price,
            jobTitle: jobTitle,
          },
        });
      }
      if (toNavigate) navigation.navigate("Message");
    }
    //console.log(res.data);
  };
  // socket.on("private message", (data) => {
  //   const { content, from } = data;
  //   console.log("contenttttttttttttttt", content);
  //   // console.log(from);

  //   var obj = {};
  //   (obj["createdAt"] = Date.now()),
  //     (obj["oneTimeOrder"] = {
  //       deliveryTime: content.deliveryTime,
  //       totalPrice: content.totalPrice,
  //       jobTitle: content.jobTitle,
  //     }),
  //     (obj[`${content.messageType}`] = content.msgcontent),
  //     (obj["user"] = {
  //       _id: "other",
  //     });
  // });

  // socket.on("private message", (data) => {
  //   const { content, from } = data;
  //   console.log(content);
  //   // console.log(from);

  //   var obj = {};
  //   (obj["createdAt"] = Date.now()),
  //     (obj[`${content.messageType}`] = content.msgcontent),
  //     (obj["user"] = {
  //       _id: "other",
  //     });

  //   setmsg([...msg, obj]);
  // });

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.container]}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {job ? (
            <TouchableOpacity
              style={[styles.btnstyle, { backgroundColor: colors.Bluish }]}
              onPress={() => {}}
            >
              <MyText style={styles.btntext}>One time job</MyText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.btnstyle,
                { backgroundColor: colors.white, borderWidth: 1 },
              ]}
              onPress={() => {
                setjob(true);
                setbusiness(false);
              }}
            >
              <MyText style={[styles.btntext, { color: colors.black }]}>
                One time job
              </MyText>
            </TouchableOpacity>
          )}
          {business ? (
            <TouchableOpacity
              style={[styles.btnstyle, { backgroundColor: colors.Bluish }]}
              onPress={() => {}}
            >
              <MyText style={styles.btntext}>Join a business</MyText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.btnstyle,
                { backgroundColor: colors.white, borderWidth: 1 },
              ]}
              onPress={() => {
                setjob(false);
                setbusiness(true);
              }}
            >
              <MyText style={[styles.btntext, { color: colors.black }]}>
                Join a business
              </MyText>
            </TouchableOpacity>
          )}
        </View>

        {job && (
          <View style={{ alignSelf: "flex-start", margin: 30 }}>
            <View style={{ flexDirection: "row" }}>
              <MyText style={styles.header}>Job Title</MyText>
              <View
                style={{
                  marginTop: 33,
                  height: 24,
                  width: 24,
                  borderRadius: 50,
                  padding: 4,
                  backgroundColor: colors.Bluish,
                  marginLeft: 9,
                }}
              >
                <MaterialCommunityIcons
                  name="pencil"
                  size={15}
                  color={colors.white}
                />
              </View>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={[
                  styles.inputStyle,
                  {
                    elevation: 7,
                  },
                ]}
                onChangeText={(jobTitle) => setjobTitle(jobTitle)}
                placeholder="Job Title"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
              />
            </View>
            <MyText
              style={{ fontSize: 16, fontWeight: "700", marginBottom: 20 }}
            >
              Describe your offer
            </MyText>
            <View style={styles.Section}>
              <TextInput
                style={[
                  styles.inputStyle,
                  { textAlignVertical: "top", paddingTop: 10 },
                ]}
                value={description}
                onChangeText={(description) => setdescription(description)}
                placeholder="Enter Description here"
                placeholderTextColor="#ACA9A9"
                multiline={true}
                numberOfLines={5}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 40,
              }}
            >
              <MyText style={{ fontSize: 12, flex: 1, fontWeight: "700" }}>
                Total Price
              </MyText>
              <View
                style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
              >
                <MyText
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    flex: 1,
                  }}
                >
                  US$
                </MyText>
                <View style={{ width: "100%", flex: 2, borderRadius: 2 }}>
                  <TextInput
                    style={[
                      styles.inputStyle,
                      {
                        elevation: 2,
                      },
                    ]}
                    value={price}
                    onChangeText={(price) => setprice(price)}
                    placeholderTextColor="#ACA9A9"
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#ACA9A9" }}
              />

              <View
                style={{ flex: 1, height: 1, backgroundColor: "#ACA9A9" }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <MyText style={{ fontSize: 12, fontWeight: "700" }}>
                Delivery Time
              </MyText>
              <Pressable
                style={{
                  flexDirection: "row",
                }}
                onPress={() => {
                  setDatePicker(true);
                }}
              >
                <MyText
                  style={[
                    styles.inputStyle2,
                    {
                      alignSelf: "center",
                    },
                  ]}
                >
                  {duedate instanceof Date ? duedate.toDateString() : duedate}
                </MyText>
                <Pressable
                  style={{
                    marginLeft: 10,
                  }}
                  onPress={() => {
                    setDatePicker(true);
                  }}
                >
                  <AntDesign
                    name="calendar"
                    size={20}
                    color="#969696"
                    style={{ backgroundColor: "#EEEEEE" }}
                  />
                </Pressable>
              </Pressable>
              {datePicker && (
                <DateTimePicker
                  value={duedate instanceof Date ? duedate : new Date()}
                  mode={"date"}
                  minimumDate={new Date(today.getTime() + 24 * 60 * 60 * 1000)}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  is24Hour={true}
                  onChange={onDateSelected}
                  style={styles.datePicker}
                />
              )}
            </View>
            <Pressable
              style={{
                backgroundColor: colors.Bluish,
                height: 58,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
              }}
              onPress={() => {
                oneTimeOffer();
                // navigation.navigate("MessagesBox", {
                //   jobTitle: jobTitle,
                //   jtype: "oneTimeOrder",
                //   jobType: "One Time Job",
                //   price: price,
                //   day: day,
                // });
              }}
            >
              <MyText
                style={{
                  color: colors.white,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                {getcondition ? (
                  <View>
                    <ActivityIndicator size="large" color={"white"} />
                    <MyText>Processing your request</MyText>
                  </View>
                ) : (
                  "Send Offer"
                )}
              </MyText>
            </Pressable>
          </View>
        )}

        {business && (
          <View style={{ alignSelf: "flex-start", margin: 30 }}>
            <View style={{ flexDirection: "row" }}>
              <MyText style={styles.header}>Job Title</MyText>
              <View
                style={{
                  marginTop: 33,
                  height: 24,
                  width: 24,
                  borderRadius: 50,
                  padding: 4,
                  backgroundColor: colors.Bluish,
                  marginLeft: 9,
                }}
              >
                <MaterialCommunityIcons
                  name="pencil"
                  size={15}
                  color={colors.white}
                />
              </View>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={[
                  styles.inputStyle,
                  {
                    elevation: 7,
                  },
                ]}
                onChangeText={(jobTitle) => setjobTitle(jobTitle)}
                placeholder="Job Title"
                placeholderTextColor="#ACA9A9"
                underlineColorAndroid="#f000"
              />
            </View>
            <MyText
              style={{ fontSize: 16, fontWeight: "700", marginBottom: 20 }}
            >
              Describe your offer
            </MyText>
            <View style={styles.Section}>
              <TextInput
                style={[
                  styles.inputStyle,
                  { textAlignVertical: "top", paddingTop: 10 },
                ]}
                value={description}
                onChangeText={(description) => setdescription(description)}
                placeholder="Enter Description here"
                placeholderTextColor="#ACA9A9"
                multiline={true}
                numberOfLines={5}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginTop: 40,
              }}
            >
              <MyText
                style={{ fontSize: 12, fontWeight: "700", marginRight: 6 }}
              >
                Equity
              </MyText>
              <MyText style={{ fontSize: 12, fontWeight: "300" }}>
                (Shares of company)
              </MyText>
              <MyText
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  position: "absolute",
                  left: 270,

                  margin: 5,
                }}
              >
                %
              </MyText>
              <View style={{ height: 24, width: 46, borderRadius: 2 }}>
                <TextInput
                  style={[
                    styles.inputStyle,
                    {
                      elevation: 7,
                      position: "absolute",
                      left: 130,
                    },
                  ]}
                  value={price}
                  onChangeText={(price) => setprice(price)}
                  placeholderTextColor="#ACA9A9"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#ACA9A9" }}
              />

              <View
                style={{ flex: 1, height: 1, backgroundColor: "#ACA9A9" }}
              />
            </View>

            <MyText style={{ fontSize: 12, fontWeight: "700" }}>
              Upload Partnership Agreement
            </MyText>
            {getdocinfo ? (
              <Pressable
                style={{
                  backgroundColor: colors.white,
                  width: 195,
                  height: 48,
                  borderRadius: 10,
                  elevation: 5,

                  marginTop: 20,
                }}
                onPress={() => {}}
              >
                <View style={{ flexDirection: "row" }}>
                  <MyText
                    style={{
                      fontSize: 11,
                      margin: 9,
                    }}
                  >
                    Uploaded
                  </MyText>
                  <Image
                    source={require("../../../assets/img/pdf.png")}
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: "center",
                      margin: 6,
                    }}
                  />
                </View>
              </Pressable>
            ) : (
              <Pressable
                style={{
                  backgroundColor: colors.white,
                  width: 195,
                  height: 48,
                  borderRadius: 10,
                  elevation: 5,

                  marginTop: 20,
                }}
                onPress={() => {
                  pickDocument();
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <MyText
                    style={{
                      fontSize: 11,
                      margin: 9,
                      color: "#2323235E",
                    }}
                  >
                    Select from storage
                  </MyText>
                  <Image
                    source={require("../../../assets/img/pdf.png")}
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: "center",
                      margin: 6,
                    }}
                  />
                </View>
              </Pressable>
            )}

            <Pressable
              style={{
                backgroundColor: colors.Bluish,
                height: 58,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
              onPress={() => {
                equityOffer();
              }}
            >
              <MyText
                style={{
                  color: colors.white,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                Create
              </MyText>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnstyle: {
    height: 42,
    width: 170,
    borderRadius: 5,
    margin: 5,
  },
  btntext: {
    fontSize: 12,
    fontWeight: "400",
    color: "white",
    alignSelf: "center",
    margin: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "700",
    color: "#232323",
    alignSelf: "flex-start",
    marginTop: 30,
    marginBottom: 20,
  },
  Section: {
    height: 160,
    ///  width: 300,
    borderWidth: 1,
    borderRadius: 5,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 14,
    borderRadius: 2,
    backgroundColor: "white",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 47,
    width: "100%",
    marginTop: 2,
    marginBottom: 5,
  },
});

export default CustomOffer;
