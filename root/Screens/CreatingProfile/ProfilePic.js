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

import Context from "../../Context/Context";
import MyText from '../../Components/Text';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo'

const ProfilePic = () => {
    const {
        theme: { colors },
    } = useContext(Context);
    const navigation = useNavigation()





    return (
        <View style={[styles.container, { backgroundColor: colors.background, margin: 30 }]}>
            <MyText style={{
                fontSize: 16,
                fontWeight: "700",
                color: colors.text,
                alignSelf: "flex-start",

            }}>
                Upload Profile Picture
            </MyText>
            <Pressable
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin:10,
                    marginTop:50
                }}
                onPress={() => {

                }}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        source={require('../../../assets/img/upload.png')}
                        style={{ height: 124, width: 124, alignSelf: 'center' }} />
                    <Entypo
                        name="camera"
                        style={{ alignSelf: 'center', position: "absolute", marginLeft: 45 }}
                        size={37}
                        color='#23232380'
                    />
                </View>
            </Pressable>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default ProfilePic;