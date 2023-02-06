import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import React, { useState, useContext } from "react";
import Context from "../Context/Context";
import MyText from "./Text";
import tick from "../../assets/Svgs/Tick";
import SvgImport from "./SvgImport";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const TodoListItem = ({ Title, ...props }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [open, setopen] = useState(false);
  const [select, setselected] = useState(true);
  return (
    <Pressable
      style={[
        {
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",

          paddingHorizontal: 8,
          paddingVertical: 14,
          borderRadius: 10,
          // marginVertical: 8,
        },
        styles.shadow,

        { ...props.style },
      ]}
      onPress={() =>
        props.navigation.navigate("TodoTaskView", {
          item: props.item,
          set: props.set,
          data: props.data,
        })
      }
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <MyText style={{ marginLeft: 10, fontSize: 14, fontWeight: "500" }}>
          {Title}
        </MyText>
      </View>
      {
        <Pressable onPress={() => setopen(!open)}>
          <Feather name="more-vertical" size={20} color="#23232380" />
        </Pressable>
      }
    </Pressable>
  );
};

export default TodoListItem;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 5,
  },
});
