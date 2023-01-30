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
import pdf from "../../../assets/Svgs/pdf";
import BottomPopup from "../../Components/BottomPopup";

const PitchDeck = ({ navigation }) => {
  const [modal, setModal] = useState({ modal1: false, modal2: false });
  const {
    theme: { colors },
  } = useContext(Context);
  function handlePress(text) {
    alert(text);
  }
  const [MileStones, setMileStone] = useState("");
  const fileUrl =
    "https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg";

  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === "ios") {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message:
              "Application needs access to your storage to download File",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log("Storage Permission Granted.");
        } else {
          // If permission denied then show alert
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };

  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = "." + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          "/file_" +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: "downloading file...",
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch("GET", FILE_URL)
      .then((res) => {
        // Alert after successful downloading
        console.log("res -> ", JSON.stringify(res));
        alert("File Downloaded Successfully.");
      });
  };

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
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
          <CustomHeader2 nav={navigation} />
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
          <LittleNav style={{ marginTop: 10 }} title={"Pitch Deck"} />
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
              onPress={() => handlePress("download")}
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
            text={"Cancel"}
            color={"#FF0000"}
            textStyle={{ color: colors.white }}
            style={{ width: "48%", borderRadius: 15 }}
          />
          <DynamicButton
            handlePress={handlePress}
            text={"Updload New"}
            color={colors.text}
            textStyle={{ color: colors.white }}
            style={{ width: "48%", borderRadius: 15 }}
          />
        </View>
      </View>

      {/* Buttons out */}
      <BottomPopup show={modal.modal1} setshow={setModal} />
    </View>
  );
};

export default PitchDeck;

const styles = StyleSheet.create({});
