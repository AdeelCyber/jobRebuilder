import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useState, useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import tick from "../../assets/Svgs/Tick";
import SvgImport from "./SvgImport";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { RoleApply } from "../Screens/Profile/services/FreeLancerServices";

const RolesDropDown = ({ Title, desc, ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [open, setopen] = useState(false);
  const [select, setselected] = useState(true);
  // Api call apply for roles

  const [applied, setApplied] = useState(false);

  const getFreelancersData = async () => {
    if (applied) {
      return;
    }
    const resp = await RoleApply(props.data.startup._id, props.item._id);

    console.log(resp.data);

    setApplied(true)

  };

  const update = (data) => {
    props.set(data);
  };
  return (
    <View>
      <View
        style={[
          {
            width: "100%",
            backgroundColor: colors.white,

            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",

            paddingHorizontal: 8,
            paddingVertical: 14,
            borderRadius: 10,
            marginVertical: 8,
            ...props.style,
          },
          styles.shadow,
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => setselected(!select)}>
            {select ? (
              <SvgImport svg={tick} />
            ) : (
              <Pressable
                style={{
                  backgroundColor: "#D9D9D9",
                  height: 17,
                  width: 17,
                  borderRadius: 20,
                }}
                onPress={() => setselected(!select)}
              ></Pressable>
            )}
          </Pressable>
          <MyText style={{ marginLeft: 10, fontSize: 15, fontWeight: "500" }}>
            {Title}
          </MyText>
        </View>
        {
          <Pressable onPress={() => setopen(!open)}>
            {open ? (
              <Entypo name="chevron-small-up" size={24} color="black" />
            ) : (
              <Entypo name="chevron-small-down" size={24} color="black" />
            )}
          </Pressable>
        }
      </View>
      {open && (
        <View style={{ marginTop: 10, paddingLeft: 10 }}>
          <MyText
              style={{
                fontSize: 10,
                fontWeight: '500',
                textDecorationLine: 'underline',
                color: 'rgba(35, 35, 35, 0.5)',
              }}
          >
            Description
          </MyText>
          <MyText
            style={{
              color: colors.heighlight,
              fontWeight: "400",
              fontSize: 15,
                marginTop: 5,
            }}
          >
            {"\t\t\t"}{desc}
          </MyText>

          {props.show ? (
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,

                alignItems: "center",
              }}
            >
              <Pressable
                style={{ marginRight: 10 }}
                onPress={() => {
                  console.log(props.data.startup._id, props.item._id);

                  props.delete(props.data.startup._id, props.item._id);
                }}
              >
                <AntDesign name="delete" size={24} color="black" />
              </Pressable>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "90%",

                  borderLeftWidth: 1,
                  borderColor: "#DEDEDE",
                }}
              ></View>
              <Pressable
                style={{ marginLeft: 10 }}
                onPress={() => {
                  props.nav.navigate("EditRoles", {
                    data: props.data,
                    item: props.item,
                    set: update,
                  });
                }}
              >
                <MaterialIcons name="edit" size={24} color="black" />
              </Pressable>
            </View>
          ) : !props.show && !props.isPart ? (
            <Pressable
              style={{
                backgroundColor: applied ? "#F3F3F3" : colors.secondary,
                paddingHorizontal: 25,
                paddingVertical: 10,
                width: "38%",

                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginTop: 15,
              }}
              onPress={() => {
                if (!props.undefinedd) {
                  getFreelancersData();
                } else {
                  props.setmodal(true);
                }
              }}
            >
              <MyText
                style={{
                  color: applied ? colors.text : colors.white,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                {applied && (
                  <AntDesign style={{marginRight:10}} name="checkcircle" size={16} color="black" />
                )}
                {applied ? "Applied" : "Apply"}
              </MyText>
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default RolesDropDown;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 1,
  },
});
