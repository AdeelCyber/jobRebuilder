import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  PermissionsAndroid,
  ToastAndroid,
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
import pdf from "../../../assets/Svgs/pdf";
import BottomPopup from "../../Components/BottomPopup";

import * as DocumentPicker from "expo-document-picker";
import { fileUpload, downloadFile } from "../Profile/services/fileServices";
import { log } from "react-native-reanimated";
import {
  PitchDeckDelete,
  PitchDeckUpload,
} from "../Profile/services/FreeLancerServices";
import axios from '../../http/axiosSet'

const PitchDeck = ({ navigation, route }) => {
  const [data, setData] = useState(route.params.data);
  const [show, setshow] = useState(route.params.show);
  const [modal, setModal] = useState({ modal1: false, modal2: false });
  const [isPart, setisPart] = useState(route.params.isPart);
  const [undefinedd, setundefined] = useState(route.params.undefinedd);
  const [file, setfile] = useState(data.startup.pitchDeck);
  const {
    theme: { colors },
  } = useContext(Context);
  console.log("data", data.startup.pitchDeck);

  const [MileStones, setMileStone] = useState("");

  // lets upload the file
  const [fileNameFromServer, setFileNameFromServer] = useState("");

  //upload file
  const [upload, setupload] = useState(false);
  const [getdocinfo, setdocinfo] = useState();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    const pdf = await fileUpload(result.uri);

    setdocinfo(JSON.parse(pdf.body));

    setupload(true);
  };

  useEffect(() => {
    if (upload) {
      setfile(getdocinfo.filename);

      console.log("pdf", getdocinfo.filename);
      handleUpload();

      setupload(false);
    }
  }, [upload]);
  //upload out

  // action on buttons
  function handlePress(text) {
    if (text === "Upload New") {
      pickDocument();
    }
    if (text === "Delete") {
      handleDelete();
    }
  }

  const handleUpload = async () => {
    const resp = await PitchDeckUpload(data.startup._id, file);
    console.log("resp", resp.data);
    if (resp.data.status === "OK") {
      ToastAndroid.show("Your file uploaded", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        "There was an error uploading your file",
        ToastAndroid.SHORT
      );
    }
  };
  const handleDelete = async () => {
    const resp = await PitchDeckDelete(data.startup._id);
    console.log("resp", resp.data);
    if (resp.data.status === "OK") {
      setfile("");
      ToastAndroid.show("Your file deleted", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        "There was an error deleting your file",
        ToastAndroid.SHORT
      );
    }
  };
  return (
    // main container
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",

          height: "100%",
        }}
      >
        <View>
          {/* header */}
          <CustomHeader2 nav={navigation} Title={data.startup.businessName} />
          {/* header out */}
          {/* card in */}
          <CampaignCard
            title={data.startup.businessName}
            niche={data.startup.category}
            Logo={data.startup.logo}
            Thumbnail={Thumbnail}
            modal={setModal}
            navigation={navigation}
            data={data}
            show={show}
            isPart={isPart}
            undefinedd={undefinedd}
          />
          {/* card out */}
          {/* Little nav in */}
          <LittleNav
            style={{ marginTop: 10 }}
            title={"Pitch Deck"}
            navigation={navigation}
            chevron={true}
          />
          {/* Little nav out */}
          {/* Upload View */}

          <View style={{ padding: 20 }}>
            <Pressable
              style={{
                backgroundColor: "#30F2F852",
                padding: 20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                flexDirection: "row",
              }}
              onPress={() => {
                downloadFile(
                  `${axios.defaults.baseURL}media/getFile/${file}`
                );
                ToastAndroid.show("Downloading...", ToastAndroid.SHORT);
              }}
            >
              <SvgImport svg={pdf} />
              <MyText
                style={{ color: "#232323B0", fontSize: 16, fontWeight: "500" }}
              >
                Download in PDF
              </MyText>
            </Pressable>
          </View>

          {/* Updload Out */}
        </View>

        {/* Buttons in */}
        {/* Buttons View In */}

        {show && (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingHorizontal: 10,
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            <DynamicButton
              handlePress={handlePress}
              text={"Delete"}
              color={"#FF0000"}
              textStyle={{ color: colors.white }}
              style={{ width: "48%", borderRadius: 15 }}
            />
            <DynamicButton
              handlePress={handlePress}
              text={"Upload New"}
              color={colors.text}
              textStyle={{ color: colors.white }}
              style={{ width: "48%", borderRadius: 15 }}
            />
          </View>
        )}
      </View>

      {/* Buttons out */}
      <BottomPopup show={modal.modal1} setshow={setModal} />
    </View>
  );
};

export default PitchDeck;

const styles = StyleSheet.create({});
