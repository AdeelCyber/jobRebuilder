import React, { useContext, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    ImageBackground,
    TextInput,
    FlatList

} from 'react-native';

import Context from "../../Context/Context";
import MyText from '../../Components/Text';
import CustomHeader8 from '../../Components/CustomHeader8';
import Icon from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import DropDownPicker from 'react-native-dropdown-picker';

const CustomOffer = () => {
    const {
        theme: { colors },
    } = useContext(Context);
    const navigation = useNavigation()
    const [job, setjob] = useState(true)
    const [business, setbusiness] = useState(false)
    const [description, setdescription] = useState()
    const [price, setprice] = useState()
    const [day, setday] = useState()
    const [month, setmonth] = useState()
    const [year, setyear] = useState()




    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={[styles.container]}>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    {job ? <TouchableOpacity style={[styles.btnstyle, { backgroundColor: colors.Bluish, }]}
                        onPress={() => { }}>
                        <MyText style={styles.btntext}>
                            One time job
                        </MyText>

                    </TouchableOpacity>
                        :
                        <TouchableOpacity style={[styles.btnstyle, { backgroundColor: colors.white, borderWidth: 1 }]}
                            onPress={() => {
                                setjob(true)
                                setbusiness(false)
                            }}>
                            <MyText style={[styles.btntext, { color: colors.black }]}>
                                One time job
                            </MyText>

                        </TouchableOpacity>
                    }
                    {business ? <TouchableOpacity style={[styles.btnstyle, { backgroundColor: colors.Bluish, }]}
                        onPress={() => { }}>
                        <MyText style={styles.btntext}>
                            Join a business
                        </MyText>

                    </TouchableOpacity>
                        :
                        <TouchableOpacity style={[styles.btnstyle, { backgroundColor: colors.white, borderWidth: 1 }]}
                            onPress={() => {
                                setjob(false)
                                setbusiness(true)
                            }}>
                            <MyText style={[styles.btntext, { color: colors.black }]}>
                                Join a business
                            </MyText>

                        </TouchableOpacity>
                    }

                </View>

                {job && (
                    <View style={{ alignSelf: "flex-start", margin: 30 }}>
                        <View style={{ flexDirection: "row" }}>

                            <MyText style={styles.header}>
                                Job Title
                            </MyText>
                            <View style={{ marginTop: 33, height: 24, width: 24, borderRadius: 50, padding: 4, backgroundColor: colors.Bluish, marginLeft: 9 }}>
                                <MaterialCommunityIcons name="pencil" size={15} color={colors.white} />
                            </View>
                        </View>
                        <MyText style={{ fontSize: 15, fontWeight: "500", color: "#23232380", marginBottom: 20 }}>
                            Create an app UI/UX for my app.
                        </MyText>
                        <MyText style={{ fontSize: 16, fontWeight: "700", marginBottom: 20 }}>
                            Describe your offer
                        </MyText>
                        <View style={styles.Section}>
                            <TextInput
                                style={[styles.inputStyle, { textAlignVertical: 'top', paddingTop: 10 }]}
                                value={description}
                                onChangeText={(description) =>
                                    setdescription(description)
                                }
                                placeholder="Enter Description here"
                                placeholderTextColor="#ACA9A9"
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 40 }}>
                            <MyText style={{ fontSize: 12, fontWeight: "700" }}>
                                Total Price
                            </MyText>
                            <MyText style={{ fontSize: 10, fontWeight: "400", marginLeft: 180 }}>
                                US$
                            </MyText>
                            <View style={{ height: 24, width: 46, borderRadius: 2 }}>
                                <TextInput
                                    style={[styles.inputStyle, {

                                        elevation: 7,
                                    }]}
                                    value={price}
                                    onChangeText={(price) =>
                                        setprice(price)
                                    }
                                    placeholderTextColor="#ACA9A9"
                                />
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#ACA9A9' }} />

                            <View style={{ flex: 1, height: 1, backgroundColor: '#ACA9A9' }} />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                            <MyText style={{ fontSize: 12, fontWeight: "700" }}>
                                Delivery Time
                            </MyText>

                            <View style={{ height: 24, width: 57, borderRadius: 2 }}>
                                <TextInput
                                    style={[styles.inputStyle, {

                                        elevation: 7,
                                    }]}
                                    value={day}
                                    onChangeText={(day) =>
                                        setday(day)
                                    }
                                    placeholder="Day"
                                    placeholderTextColor="#ACA9A9"
                                />
                            </View>
                            <View style={{ height: 24, width: 57, borderRadius: 2 }}>
                                <TextInput
                                    style={[styles.inputStyle, {

                                        elevation: 7,
                                    }]}
                                    value={month}
                                    onChangeText={(month) =>
                                        setmonth(month)
                                    }
                                    placeholder="Month"
                                    placeholderTextColor="#ACA9A9"
                                />

                            </View>
                            <View style={{ height: 24, width: 57, borderRadius: 2 }}>
                                <TextInput
                                    style={[styles.inputStyle, {

                                        elevation: 7,
                                    }]}
                                    value={year}
                                    onChangeText={(year) =>
                                        setyear(year)
                                    }
                                    placeholder="Year"
                                    placeholderTextColor="#ACA9A9"
                                />

                            </View>


                        </View>
                        <Pressable
                            style={{
                                backgroundColor: colors.Bluish,
                                width: 345,
                                height: 58,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 30,

                            }}
                            onPress={() => {

                            }}>
                            <MyText
                                style={{
                                    color: colors.white,
                                    fontSize: 14,
                                    fontWeight: "500"
                                }}>
                                Create
                            </MyText>

                        </Pressable>
                    </View>
                )}

                {business && (
                    <View style={{ alignSelf: "flex-start", margin: 30 }}>
                        <View style={{ flexDirection: "row" }}>

                            <MyText style={styles.header}>
                                Job Title
                            </MyText>
                            <View style={{ marginTop: 33, height: 24, width: 24, borderRadius: 50, padding: 4, backgroundColor: colors.Bluish, marginLeft: 9 }}>
                                <MaterialCommunityIcons name="pencil" size={15} color={colors.white} />
                            </View>
                        </View>
                        <MyText style={{ fontSize: 15, fontWeight: "500", color: "#23232380", marginBottom: 20 }}>
                            Graphic Designing
                        </MyText>
                        <MyText style={{ fontSize: 16, fontWeight: "700", marginBottom: 20 }}>
                            Describe your offer
                        </MyText>
                        <View style={styles.Section}>
                            <TextInput
                                style={[styles.inputStyle, { textAlignVertical: 'top', paddingTop: 10 }]}
                                value={description}
                                onChangeText={(description) =>
                                    setdescription(description)
                                }
                                placeholder="Enter Description here"
                                placeholderTextColor="#ACA9A9"
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 40 }}>
                            <MyText style={{ fontSize: 12, fontWeight: "700", marginRight: 6 }}>
                                Equity
                            </MyText>
                            <MyText style={{ fontSize: 12, fontWeight: "300" }}>
                                (Shares of company)
                            </MyText>


                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#ACA9A9' }} />

                            <View style={{ flex: 1, height: 1, backgroundColor: '#ACA9A9' }} />
                        </View>

                        <MyText style={{ fontSize: 12, fontWeight: "700" }}>
                            Upload Partnership Agreement
                        </MyText>
                        <Pressable
                            style={{
                                backgroundColor: colors.white,
                                width: 195,
                                height: 48,
                                borderRadius: 10,
                                elevation:5,

                                marginTop: 20,
                            }}
                            onPress={() => {

                            }}>

                            <View style={{ flexDirection: "row" }}>
                               

                                <MyText
                                    style={{
                                        fontSize: 11,
                                        margin: 9,
                                        color: "#2323235E"
                                    }}>
                                    Select  from storage
                                </MyText>
                                <Image
                                    source={require('../../../assets/img/pdf.png')}
                                    style={{ height: 25, width: 25, alignSelf: 'center', margin: 6 }} />
                            </View>

                        </Pressable>




                        <Pressable
                            style={{
                                backgroundColor: colors.Bluish,
                                width: 345,
                                height: 58,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 30,

                            }}
                            onPress={() => {

                            }}>
                            <MyText
                                style={{
                                    color: colors.white,
                                    fontSize: 14,
                                    fontWeight: "500"
                                }}>
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
        alignItems: "center"
    },
    btnstyle: {
        height: 42,
        width: 170,
        borderRadius: 5,
        margin: 5
    },
    btntext: {
        fontSize: 12,
        fontWeight: "400",
        color: "white",
        alignSelf: "center",
        margin: 10
    },
    header: {
        fontSize: 16,
        fontWeight: "700",
        color: "#232323",
        alignSelf: "flex-start",
        marginTop: 30,
        marginBottom: 20

    },
    Section: {
        height: 160,
        width: 340,
        borderWidth: 1,
        borderRadius: 5
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 14,
        borderRadius: 2,
        backgroundColor: "white"


    },


});

export default CustomOffer;