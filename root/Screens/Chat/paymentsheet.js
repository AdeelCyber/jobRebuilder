import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState, useContext } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  Text,
} from "react-native";
import Context from "../../Context/Context";
import { useNavigation } from "@react-navigation/native";
import CartProvider from "../../Context/CartProvider";
import MyText from "../../Components/Text";
import { oneTimeOrderOfferStatus } from "../Profile/services/MessageServices";
import Toast from "react-native-toast-message";

export default function CheckoutSheet({ route }) {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const { order } = route.params != undefined ? route.params : undefined;
  const { accessToken } = useContext(CartProvider);

  const fetchPaymentSheetParams = async (order) => {
    console.log("here 2");
    console.log(order);

    const response = await fetch(
      `https://stepdev.up.railway.app/stripe/checkout-connected-direct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          orderId: order,
        }),
      }
    );
    const { paymentIntent, ephemeralKey, customerId } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customerId,
    };
  };

  const initializePaymentSheet = async (order) => {
    console.log("here 1");

    const { paymentIntent, ephemeralKey, customerId } =
      await fetchPaymentSheetParams(order);
    console.log(paymentIntent);

    const { error } = await initPaymentSheet({
      merchantDisplayName: "StepEv",
      customerId: customerId,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });
    if (!error) {
      setLoading(true);
      console.log(loading);
    }
  };

  const openPaymentSheet = async () => {
    console.log("here 3");

    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
    } else {
      console.log(
        "Success Your payment method is successfully set up for future payments!"
      );
      const resp = await oneTimeOrderOfferStatus(
        accessToken,
        order,
        "Accepted"
      );
      console.log(resp.data);
      if (resp.status == 200) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Done",
          text2: ".",
        });
        navigation.navigate("MessagesBox");
      }
    }
  };

  useEffect(() => {
    initializePaymentSheet(order);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          justifyContent: "center",
        },
      ]}
    >
      <MyText
        style={{
          fontSize: 16,
          marginTop: 40,
          margin: 44,
          alignSelf: "center",
        }}
      >
        Make Your Payment here
      </MyText>
      <View style={{ alignSelf: "center" }}>
        <Pressable
          style={{
            backgroundColor: colors.Bluish,
            width: 200,
            height: 50,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            margin: 44,
          }}
          onPress={() => {
            openPaymentSheet();
          }}
        >
          <MyText
            style={{
              color: colors.white,
              fontSize: 16,
            }}
          >
            Pay
          </MyText>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 47,
    marginTop: 14,
    marginBottom: 5,
  },
});
