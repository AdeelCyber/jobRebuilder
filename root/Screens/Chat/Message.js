import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
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
            <Card onPress={() => navigation.navigate('MessageBox', { userName: item.userName, userImg: item.userImg })}>
              <UserInfo>
                <UserImgWrapper>
                  <UserInfoText>

                    <UserImg source={item.userImg} />
                    
                  </UserInfoText>

                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <Msgs>2</Msgs>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                  <PostTime>{item.messageTime}</PostTime>

                </TextSection>
              </UserInfo>
            </Card>
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