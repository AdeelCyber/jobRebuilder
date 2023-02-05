import React, { useState, useEffect, useContext } from "react";
import Context from "./root/Context/Context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "./root/utils";
import Main from "./root/Main";
import { useFonts } from "expo-font";
import ContextWrapper from "./root/Context/ContextWrapper";
import { CartProvider } from "./root/Context/CartProvider";
import { Toast } from "react-native-toast-message/lib/src/Toast";
export default function App() {
  const {
    theme: { colors },
  } = useContext(Context);

  return (
    <CartProvider>
      <ContextWrapper>
        <Main />
        <Toast refs={(refs) => Toast.setRef(refs)} />
      </ContextWrapper>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
