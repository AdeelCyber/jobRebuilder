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

import UserInfo from '../../Components/UserInfo';
const EditProfile = () => {
    const {
        theme: { colors },
    } = useContext(Context);
    const navigation = useNavigation()
    const [name, setname] = useState('Shaheer Ahmad')
    const [job, setjob] = useState('Graphics Designer')
    const [city, setcity] = useState('Florida, USA')
    const [language, setlanguage] = useState('English')
    const [work, setwork] = useState('40')
    const [about, setabout] = useState()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Fixed Rate (Freelancing)', value: 'Fixed Rate (Freelancing)' },

    ]);

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={[styles.container]}>
                <CustomHeader8 />
                <View style={{ flexDirection: "row" , marginTop:20}}>
                    <Image
                        source={require('../../../assets/img/user.png')}
                        style={{ height: 107, width: 107, borderRadius: 50, alignSelf: "center" }}
                    />
                    <View style={{
                        height: 31,
                        width: 31,
                        borderRadius: 50,
                        padding: 8,
                        marginLeft: 80,
                        backgroundColor: colors.Bluish,
                        alignSelf: "flex-end",
                        position: "absolute"
                    }}>

                        <MaterialCommunityIcons name="camera" size={14} color={colors.white} />
                    </View>
                </View>
                <MyText style={{ fontSize: 14, fontWeight: "500", margin: 10 }}>
                    Change Profile Picture
                </MyText>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={[styles.inputStyle, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                        onChangeText={(name) => setname(name)}
                        value={name}
                    />
                    <Pressable style={{
                        padding: 14,
                    }}>
                        <MaterialCommunityIcons name="pencil" size={22} color="#ACA9A9" />
                    </Pressable>
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={[styles.inputStyle, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                        onChangeText={(job) => setjob(job)}
                        value={job}
                    />
                    <Pressable style={{
                        padding: 14,
                    }}>
                        <MaterialCommunityIcons name="pencil" size={22} color="#ACA9A9" />
                    </Pressable>
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={[styles.inputStyle, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                        onChangeText={(city) => setcity(city)}
                        value={city}
                    />
                    <Pressable style={{
                        padding: 14,
                    }}>
                        <MaterialCommunityIcons name="pencil" size={22} color="#ACA9A9" />
                    </Pressable>
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={[styles.inputStyle, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                        onChangeText={(language) => setlanguage(language)}
                        value={language}
                    />
                    <Pressable style={{
                        padding: 14,
                    }}>
                        <MaterialCommunityIcons name="pencil" size={22} color="#ACA9A9" />
                    </Pressable>
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={[styles.inputStyle, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                        onChangeText={(work) => setwork(work)}
                        value={work}
                    />
                    <Pressable style={{
                        padding: 14,
                    }}>
                        <MyText style={{ color: "#919191", margin: 6 }}>Hrs/week</MyText>
                    </Pressable>
                </View>
                <View style={styles.SectionStyle}>
                    <DropDownPicker
                        style={[styles.inputStyle, { borderColor: "#EEEEEE" }]}
                        placeholder="Fixed Rate (Freelancing)"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}

                    />
                </View>
                <View style={[styles.SectionStyle, { height: 135 }]}>
                    <TextInput
                        style={[styles.inputStyle, { textAlignVertical: 'top', paddingTop: 10 }]}
                        onChangeText={(about) =>
                            about(setabout)
                        }
                        placeholder="About me"
                        placeholderTextColor={colors.black}
                        multiline={true}
                        numberOfLines={5}

                    />

                </View>
                <Pressable
                    style={{
                        backgroundColor: colors.Bluish,
                        width: 361,
                        height: 58,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 10,
                        marginTop:20

                    }}
                    onPress={() => {
                        navigation.navigate("HomeService")
                    }}>
                    <MyText
                        style={{
                            color: colors.white,
                            fontSize: 14,
                            fontWeight: "500"
                        }}>
                        Done
                    </MyText>

                </Pressable>
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
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,


    },
    SectionStyle: {
        flexDirection: 'row',
        height: 58,
        borderWidth: 1,
        width: 361,
        borderRadius: 10,
        marginTop: 14,
        marginBottom: 5,

    },



});

export default EditProfile;