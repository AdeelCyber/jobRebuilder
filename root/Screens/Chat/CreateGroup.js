import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity,Image } from 'react-native';
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
import CustomHeader4 from "../../Components/CustomHeader4";
import { Messages } from '../../Components/Msg';
import MyText from '../../Components/Text';
import { FontAwesome } from "@expo/vector-icons";

const CreateGroup = ({ navigation }) => {
    const {
        theme: { colors },
    } = useContext(Context);
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <CustomHeader4 />
            <View style={{ alignSelf: 'flex-start', flexDirection: 'row', margin: 20 }}>
                <View style={{ height: 39, width: 39, borderRadius: 50, backgroundColor: colors.Bluish }}>
                    <FontAwesome name="group" size={16} color={colors.white} style={{ margin: 10 }} onPress={()=>{navigation.navigate("CreatingGroup")}} />
                </View>
                <MyText style={{ fontWeight: "500", fontSize: 14, marginLeft: 20, margin:10 }}>
                    Create New Group
                </MyText>
            </View>
            <View style={{ alignSelf: 'flex-start' }}>

            <MyText style={{ fontWeight: "700", fontSize: 16, marginLeft: 20, margin:10 }}>
            Other Groups & Messages
                </MyText>
            </View>


            <Container>
                <FlatList
                    data={Messages}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", borderBottomWidth: 1, borderColor: "#9DD0FF66", marginBottom: 10 }}
                        onPress={() => navigation.navigate('MessageBox', { userName: item.userName, userImg: item.userImg })}>
                          <View style={{flexDirection:"row"}}>
                            <Image style={{ height: 51, width: 51, borderRadius: 50 , alignItems:"center"}} source={item.userImg} />
                            <View style={{
                                    height: 15,
                                    width: 15,
                                    borderRadius: 50,
                                    marginLeft: 40,
                                    
                                    backgroundColor: colors.red,
                                    alignSelf: "flex-end",
                                    position: "absolute",
                                    bottom:19
                                }}>
            
                                    
                                </View>
                          </View>
                          <View style={{ flexDirection: "column", justifyContent: "flex-start", margin: 10, width: 210, height: 50, marginRight: 40 }}>
                            <MyText style={{ fontWeight: "700", fontSize: 14 }}>
                              {item.userName}
                            </MyText>
                            <Text style={{ fontWeight: "400", fontSize: 13, color: "#23232380" }} numberOfLines={2} >
                              {item.messageText}
                            </Text>
            
                          </View>
                          <View style={{ flexDirection: "column", justifyContent: "center" }}>
                            <Msgs style={{ marginLeft: 20, marginBottom: 5 }}>
                              2
                            </Msgs>
            
                            <MyText style={{ fontWeight: "500", fontSize: 9, color: "#23232380" }}>{item.messageTime}</MyText>
                          </View>
                        </TouchableOpacity>
                    )}
                />
            </Container>

        </View>
    );
};

export default CreateGroup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});