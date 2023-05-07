import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ImageBackground,
    FlatList, ScrollView, ActivityIndicator,
} from "react-native";
import React, {useContext, useEffect, useRef} from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {Zocial} from "@expo/vector-icons";
import {Pressable} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../../http/axiosSet";
import * as Linking from "expo-linking";
import CustomHeader from "../../../Components/CustomHeader2";
import Context from "../../../Context/Context";

function CustomButton(props) {
    const {
        theme: { colors },
    } = useContext(Context)
    const style = StyleSheet.create({
        container: {
            backgroundColor: colors.Bluish,
            width: "90%",
            height: 57,
            borderRadius: 15,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
    });

    const handleClick = () => {
        if (props.handleClick)
            props.handleClick();
    };

    return (
        <Pressable onPress={handleClick} style={[style.container, props.style]}>
            {props.icon}
            <MyText style={[{color: "white"}, props.textStyle]}>
                {props.text}
            </MyText>
        </Pressable>
    );
}

function MyText(props) {

    const styles =StyleSheet.create({
        text:{
            color:'#222222',
            fontSize:14,
            fontWeight:"400",


        }
    })
    return <Text  style={[styles.text,props.style]}  >
        {props.children}
    </Text>
}

const PaymentLinkStatus = (props) => {
    const [banks, setBanks] = React.useState([]);
    const [status, setStatus] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const[resData,setResData] = React.useState(null)
    //call fetchDetails() function when ever screen is loaded
    const [buttonText, setButtonText] = React.useState("Seems Good!");
    const fetchLinkData = async () => {
        const token = await AsyncStorage.getItem('@accessToken')
        try {
            let options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Origin: '',
                    Authorization: `Bearer ${token}`,
                },
            }
            setLoading(true)

            const resp = fetch(
                `${axios.defaults.baseURL}stripe/multiparty-express`,

                options
            )
                .then((response) => response.json())
                .then((data) => {
                    setLoading(false)
                    console.log(data.data)
                    setResData(data.data)
                    setStatus(data.data.linked)
                    if(data.data.linked)
                    {
                        setButtonText("Seems Good!")
                    }
                    else{
                        setButtonText("+ Link Payment Method")
                    }


                }).catch((error) => {
                    setLoading(false)
                    setStatus(false)
                    console.log(error)
                })
        } catch (error) {
            console.log(error.response)
        }

    }
    useEffect(() => {
        let focusListener = props.navigation.addListener("focus", () => {
            fetchLinkData()
        });
    }, []);
    function connectAccount(){
        props.navigation.navigate("StripeWebView", {"url": resData.res.url,"returnUrl":resData.returnUrl});
    }
    //
    //
    // function fetchDetails() {
    //     setBanks([])
    //     fetch(Urls.bankDetailView, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: "token " + sesionData.SessionData.token,
    //             }
    //         }
    //     ).then((response) => response.json())
    //         .then((json) => {
    //             if (json.status === 200) {
    //                 setBanks(json.data);
    //             }
    //         }).catch((error) => {
    //         console.log(error);
    //     });
    // }

    // useEffect(() => {
    //     fetchDetails();
    //     const willFocusSubscription = props.navigation.addListener('focus', () => {
    //         fetchDetails();
    //     });
    // }, [])
    let borderCol = "#FF0000";
    if (status) {
        borderCol = "#00FF00";
    }
    const go ={
        goBack: () => {
            props.navigation.navigate("Profile");

        }
    }

    return (
        <View style={styles.container}>
            {/* Headrer Start */}
            <CustomHeader
                Title='Connect Bank Account'
                nav={props.navigation}
                style={{ elevation: 0 }}
                icon={() => {
                    return (
                        <MaterialCommunityIcons
                            name='bell-circle'
                            size={28}
                            color='black'
                        />
                    )
                }}
            />
            {/* Header End */}
            {/* bank card */}
            <View style={{
                width: "100%",
                alignItems: "center",
            }}>
                <View style={{
                    marginTop: 26,
                    width: "90%",
                    borderStyle: "dashed",
                    borderWidth: 0.5,
                    padding: 25,
                    borderRadius: 1,
                    alignItems : "center",
                    borderColor: borderCol,

                }}>
                    <MyText style={{
                        fontSize: 12,
                    }}
                            children={"Payment Method Status :"}/>

                    {
                        loading ?
                            <ActivityIndicator size="small" color="#BB85F5"/> :
                            <MyText style={{
                                fontSize: 20,
                                color: borderCol,

                            }}
                                    children={status ? "Linked": "Not Linked"}/>
                    }
                </View>

            </View>
            {
                !loading ?
                !status ?
                    <CustomButton
                        handleClick={() => {
                            // props.navigation.navigate("PaymentDetail_Type")
                            setLoading(true)
                            connectAccount()
                        }}
                        style={[
                            {
                                backgroundColor: "#ffffff",
                                borderWidth: 1,
                                marginTop: 26,
                                borderRadius: 5,
                            },
                        ]}
                        textStyle={{fontSize: 12, color: "#000000"}}
                        text={"+ Link Payment Method"}
                    /> : <CustomButton
                        handleClick={() => {
                            props.navigation.goBack();
                        }}
                        style={[
                            {
                                marginTop: 26,
                                borderRadius: 5,
                            },
                        ]}
                        textStyle={{fontSize: 12 }}
                        text={buttonText}
                    /> :
                    <View>
                        <MyText style={{
                            fontSize: 12,
                            color: "#BB85F5",
                            marginTop: 10,
                        }}
                                children={"Please wait..."}/>
                    </View>
            }
            {/*<FlatList*/}
            {/*    style={{width: "100%", paddingHorizontal: 20}}*/}
            {/*    data={banks} renderItem={*/}
            {/*    ({item, index}) => <BankCard navigation={props.navigation} data={item} key={index} id={item.id} name={item.bankName} number={item.bankNumber}*/}
            {/*                                 handleDelete={*/}
            {/*                                     fetchDetails*/}
            {/*                                 }/>*/}

            {/*}/>*/}
        </View>
    );
};

export default PaymentLinkStatus;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",

    },
    header: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        marginTop: 30,
        paddingBottom: 15,
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomColor: "#22222217",
    },
    head: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    Shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.41,
        shadowRadius: 5.11,

        elevation: 6,
    },
});
