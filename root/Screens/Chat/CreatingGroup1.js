import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
    Msgs,
    Circle
} from '../../Components/MessageStyles';
import Context from "../../Context/Context";
import LittleNav from "../../Components/LittleNav";
import { GroupChats } from '../../Components/GroupChats';
import MyText from '../../Components/Text';
import { FontAwesome } from "@expo/vector-icons";
import CustomHeader5 from '../../Components/CustomHeader5';
import { title } from 'process';

const CreatingGroup1 = ({ navigation }) => {
    const {
        theme: { colors },
    } = useContext(Context);
    const [grouptitle, setgrouptitle] = useState()
    const [image, setimage] = useState()
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <CustomHeader5 />

            <View style={{ alignSelf: 'flex-start' }}>

                <MyText style={{ fontWeight: "700", fontSize: 16, marginLeft: 20, margin: 10 }}>
                    Add Details
                </MyText>
            </View>


            <Container>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        value={grouptitle}
                        onChangeText={(grouptitle) => setgrouptitle(grouptitle)}
                        placeholder="Group Title"
                        placeholderTextColor="#ACA9A9"
                        autoCapitalize="none"
                        clearButtonMode='always'
                    />
                </View>
                <View
                    style={styles.SectionStyle}>
                    <View style={[styles.inputStyle, { flexDirection: 'row' }]}>
                        <FontAwesome
                            name="camera"
                            size={20}
                            color={colors.Bluish}
                            style={{ paddingTop: 11 }}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Upload Profile Picture"
                            onChangeText={(image) => setimage(image)}
                            value={image}

                        />

                    </View>


                </View>
                <View style={{ alignSelf: 'flex-start' }}>

                    <MyText style={{ fontWeight: "700", fontSize: 16, margin: 10 }}>
                        Participants
                    </MyText>
                </View>
                <FlatList
                    data={GroupChats}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    renderItem={({ item }) => (
                     <View style={{marginRight:5}}>
                     <UserImg source={item.userImg} />
                     </View>
                        
                    )}
                />
            </Container>
            <Pressable
                style={{
                    backgroundColor: colors.Bluish,
                    width: "90%",
                    height: 50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,

                }}
                onPress={() => {
                    navigation.navigate('')

                }}>
                <MyText
                    style={{
                        color: colors.white,
                        fontSize: 16,
                    }}>
                    Create
                </MyText>

            </Pressable>

        </View>
    );
};

export default CreatingGroup1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,


    },
    SectionStyle: {
        flexDirection: 'row',
        height: 47,
        marginTop: 14,
        marginBottom: 5,

    },
});