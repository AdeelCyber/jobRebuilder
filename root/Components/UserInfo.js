import React, { useContext, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    ImageBackground,
    TextInput

} from 'react-native';

import Context from "../Context/Context";
import MyText from './Text';

import Icon from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo'
import StarRating from 'react-native-star-rating-widget';

const UserInfo = () => {
    const {
        theme: { colors },
    } = useContext(Context);
    const navigation = useNavigation()
    const [getRating, setRating] = useState(5);







    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={{marginBottom:20, flexDirection: "row", paddingBottom: 40, borderBottomWidth: 1, borderColor: "#23232380" }}>
                <Image style={{ height: 78, width: 78, borderRadius: 50, margin: 10 }} source={require("../../assets/img/user.png")}
                />
                <View style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>

                        <MyText style={{ fontSize: 20, fontWeight: "700", margin: 10 }}>
                            Shaheer Ahmad
                        </MyText>
                        <View style={{ margin: 10, height: 16, width: 16, borderRadius: 50, padding: 1, backgroundColor: colors.Bluish }}>
                            <MaterialCommunityIcons name="pencil" size={14} color={colors.white} />
                        </View>
                        <MaterialCommunityIcons name="content-copy" size={25} style={{ margin: 10 }} color={colors.Bluish} />


                    </View>
                    <MyText style={{ fontSize: 13, fontWeight: "400", color: "#23232380", marginLeft: 10 }}>
                        Graphic Designer
                    </MyText>
                    <View style={{ flexDirection: "row" }}>
                        <MyText style={{ fontSize: 12, fontWeight: "700", marginLeft: 10 }}>
                            $30/
                        </MyText>
                        <MyText style={{ fontSize: 12, fontWeight: "500", color: "#23232380", marginRight: 10 }}>
                            Hr
                        </MyText>
                        <Entypo name="location-pin" size={13} color="grey" />
                        <MyText style={{ fontSize: 12, fontWeight: "400", color: "#23232380", marginLeft: 3 }}>
                            Istanbul, Turkey
                        </MyText>

                    </View>
                    <MyText style={{ fontSize: 12, fontWeight: "400", marginLeft: 10, color: "#23232380" }}>
                        Availability :  30 Hrs/week
                    </MyText>
                    <View style={{ flexDirection: "row" }}>
                        
                    <StarRating rating={getRating} onChange={setRating} starSize={14}  style={{padding:0, margin:0, width:10}} />

                        <MyText style={{ fontSize: 14, fontWeight: "700", marginLeft: 60, }}>
                            5.0
                        </MyText>
                        <MyText style={{ fontSize: 12, fontWeight: "400", marginLeft: 10, color: "#23232380" }}>
                            (100 Reviews)
                        </MyText>

                    </View>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default UserInfo;