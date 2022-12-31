import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: #ffffff;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #9DD0FF66;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
 
`;

export const UserImg = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 25px;
  
  
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
 
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  
  
`;


export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #232323
`;
export const Msgs = styled.Text`
  height: 20px
  width:20px
  border-radius: 25px
  background-color: #38079F;
  color: #FFFFFF
  padding-left: 6px;
  padding-top: 1px;
  font-size: 12px;
`;
export const Circle = styled.Text`
  height: 15px
  width:15px
  border-radius: 25px
  background-color: #C20C0C;
  margin-top: 40px;
  padding: 0px;


`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #23232380;
  margin-top: 2px;
  
  margin-left: 230px;



`;

export const MessageText = styled.Text`
  font-size: 13px;
  color: #23232380;
  margin-right: 17px;


  
`;