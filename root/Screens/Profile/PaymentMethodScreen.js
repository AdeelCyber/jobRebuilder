import React, { useContext, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MyText from "../../Components/Text";
import Context from "../../Context/Context";
import Icon from "@expo/vector-icons/FontAwesome";

import SvgImport from "../../Components/SvgImport";
import PayPalSvg from "../../../assets/Svgs/PayPal";
import MasterCard from "../../../assets/Svgs/MasterCard";

import { Dropdown } from "react-native-element-dropdown";
import countryList from "react-select-country-list";
import ReactNativeModal from "react-native-modal";
import { Button } from "react-native-paper";
import CustomHeader from "../../Components/CustomHeader2";

const PaymentMethodScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const countryListData = useMemo(() => countryList().getData(), []);

  const {
    theme: { colors },
  } = useContext(Context);

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <CustomHeader style={{ borderRadius: 0 }} />
        <View
          style={[
            {
              marginTop: 1.5,

              width: "100%",
              borderColor: "white",
              height: 2,
            },
            styles.shadow,
          ]}
        ></View>
        <View
          style={{
            paddingBottom: 10,
            marginHorizontal: 20,
            borderBottomColor: "#eee",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <MyText
            style={{
              fontWeight: "600",
              lineHeight: 30,
              color: colors.text,
              textAlign: "left",
              marginTop: 20,
              fontSize: 16,
            }}
          >
            Add Billing Method
          </MyText>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              width: 172,
              borderColor: "#ECE7E7",
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <SvgImport svg={PayPalSvg} style={{ width: "100%" }} />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ECE7E7",
              width: 172,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              backgroundColor: "white",
            }}
          >
            <SvgImport svg={MasterCard} style={{ width: "100%" }} />
          </View>
        </View>

        <View
          style={{
            paddingBottom: 10,
            marginHorizontal: 20,
            borderBottomColor: "#eee",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <MyText
            style={{
              fontWeight: "600",
              lineHeight: 30,
              color: colors.text,
              textAlign: "left",
              marginTop: 20,
              fontSize: 16,
            }}
          >
            Account Details
          </MyText>
        </View>

        {/* First Name Field */}

        <View style={styles.textInputView}>
          <TextInput
            placeholder="First Name"
            style={{
              paddingLeft: 15,
              marginLeft: 4,
              flex: 1,
              border: "none",
            }}
          />
        </View>

        {/* Last Name Field */}

        <View style={styles.textInputView}>
          <TextInput
            placeholder="Last Name"
            style={{
              paddingLeft: 15,
              marginLeft: 4,
              flex: 1,
              border: "none",
            }}
          />
        </View>

        {/* Country */}

        <View
          style={{
            width: "90%",

            marginHorizontal: 18,
            marginBottom: 10,
          }}
        >
          <Dropdown
            style={[styles.dropdown]}
            data={countryListData}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            search
            labelField="label"
            valueField="value"
            placeholder="Country"
            searchPlaceholder="Search..."
          />
        </View>

        {/* City 1 Field */}

        <View style={styles.textInputView}>
          <TextInput placeholder="City" style={styles.textInput} />
        </View>

        {/* Address Field */}
        <View style={styles.textInputView}>
          <TextInput placeholder="Address" style={styles.textInput} />
        </View>

        {/* Postal Code Field */}

        <View style={styles.textInputView}>
          <TextInput placeholder="Postal Code" style={styles.textInput} />
        </View>

        {/* Phone Number Field */}

        <View style={styles.textInputView}>
          <TextInput placeholder="Phone Number" style={styles.textInput} />
        </View>

        {/* Account Number */}

        <View style={styles.textInputView}>
          <TextInput placeholder="Account Number" style={styles.textInput} />
        </View>

        {/* CVC  Field */}

        <View style={styles.textInputView}>
          <TextInput placeholder="CVC" style={styles.textInput} />
        </View>

        {/* Expiry Date */}

        <View style={styles.textInputView}>
          <TextInput placeholder="Expiry Date" style={styles.textInput} />
        </View>

        {/* Done Button */}

        <TouchableOpacity
          labelStyle={{ color: "#fff" }}
          style={styles.btn}
          onPress={() => {
            setModalVisible(!isModalVisible);
          }}
        >
          <MyText
            style={{
              fontSize: 14,
              color: "white",
            }}
          >
            Done
          </MyText>
        </TouchableOpacity>

        <ReactNativeModal transparent isVisible={isModalVisible}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 18,
              paddingBottom: 50,
              height: "60%",
            }}
          >
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <MyText
                  style={{
                    width: "90%",
                    fontWeight: "600",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Tax Details
                </MyText>
                <Icon
                  name="close"
                  size={20}
                  style={{ marginRight: 15 }}
                  onPress={() => {
                    setModalVisible(!isModalVisible);
                  }}
                />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ marginHorizontal: 15 }}>
                <SvgImport svg={PayPalSvg} style={{ width: "100%" }} />
                <MyText style={{ fontSize: 11 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  venenatissit amet risus a bibendum. Integer a nibh feugiat,
                  congue nunc a
                </MyText>
              </View>
              <View style={{ marginHorizontal: 15 }}>
                <SvgImport svg={MasterCard} style={{ width: "100%" }} />
                <MyText style={{ fontSize: 11 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  venenatissit amet risus a bibendum. Integer a nibh feugiat,
                  congue nunc a
                </MyText>
              </View>
              <View style={{ marginHorizontal: 15 }}>
                <SvgImport svg={PayPalSvg} style={{ width: "100%" }} />
                <MyText style={{ fontSize: 11 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  venenatissit amet risus a bibendum. Integer a nibh feugiat,
                  congue nunc a
                </MyText>
              </View>
              <View style={{ marginHorizontal: 15 }}>
                <SvgImport svg={MasterCard} style={{ width: "100%" }} />
                <MyText style={{ fontSize: 11 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  venenatissit amet risus a bibendum. Integer a nibh feugiat,
                  congue nunc a
                </MyText>
              </View>
            </View>

            {/* <Button title='Hide modal' onPress={() => {}} /> */}
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dropdown: {
    height: 55,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingLeft: 30,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  textInput: {
    paddingLeft: 15,
    marginLeft: 4,
    flex: 1,
    border: "none",
  },

  textInputView: {
    paddingVertical: 13,
    width: "90%",
    borderWidth: 0.8,
    borderColor: "#222222",
    borderRadius: 15,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingRight: 14,
    marginHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  btn: {
    marginHorizontal: 18,

    backgroundColor: "#8489FC",
    borderRadius: 10,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 15,
    marginBottom: 40,
  },
  shadow: {
    shadowColor: "#000a",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default PaymentMethodScreen;
