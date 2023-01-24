import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
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
import CustomHeader3 from "../../Components/CustomHeader3";
import { Messages } from '../../Components/Msg';
import MyText from '../../Components/Text';

const Message = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader3 />

      <Container>
        <FlatList
          data={Messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            // <Card onPress={() => navigation.navigate('MessageBox', { userName: item.userName, userImg: item.userImg })}>
            //   <UserInfo>
            //     <UserImgWrapper>
            //       <UserInfoText>

            //         <UserImg source={item.userImg} />

            //       </UserInfoText>

            //     </UserImgWrapper>
            //     <TextSection>
            //       <UserInfoText>
            //         <UserName>{item.userName}</UserName>
            //         <Msgs>2</Msgs>
            //       </UserInfoText>
            //       <View style={{flexDirection:"row", justifyContent:"flex-start"}}>
            //       <MessageText>{item.messageText}</MessageText>
            //       <PostTime>{item.messageTime}</PostTime>

            //       </View>
            //     </TextSection>
            //   </UserInfo>
            // </Card>
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

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});