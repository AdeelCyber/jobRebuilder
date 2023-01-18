import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, Image } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Context from "../../Context/Context";
import { Entypo, AntDesign } from "@expo/vector-icons";
import MyText from "../../Components/Text";
import CustomHeader3 from '../../Components/CustomHeader3';
import { GroupChats } from '../../Components/GroupChats';

const GroupChat = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const { userName, userImg } = route.params;
    const icon = () => <Entypo name="dots-three-vertical" size={24} color="black" />,
        Title = userName;

    const {
        theme: { colors },
    } = useContext(Context);
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                },
            },
            {
                _id: 2,
                text: 'Aliquam nec hendrerit nisl',
                createdAt: new Date(),
                user: {
                    _id: 1,
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                        name="camera"
                        style={{ marginTop: 5, marginRight: 5 }}
                        size={25}
                        color='#23232380'
                    />

                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={32}
                        color={colors.Bluish}
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: colors.Bluish,
                    },
                    left: {
                        backgroundColor: '#FFF2F2'
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                    left: {
                        color: colors.text
                    }
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
    }


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View
                style={[
                    {
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        backgroundColor: colors.white,
                        padding: 6,
                        paddingVertical: 10,
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 5,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 1.5,
                        shadowRadius: 2,
                        elevation: 3,
                        borderRadius: 10,
                    },
                    styles.shadow,
                ]}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </View>
                {/* Text View in */}
                <View>
                    <Image
                        source={userImg}
                        style={{ height: 46, width: 46, margin: 6 }} />
                </View>
                <View style={{ marginRight: 80 }}>
                    <MyText style={{ fontWeight: "700", fontSize: 14, marginRight: 49, color: colors.text }}>{Title}</MyText>
                    <MyText style={{ fontWeight: "700", fontSize: 12, marginRight: 49, color: '#ACA9A9' }}>Online</MyText>

                </View>

                <View>{icon()}</View>
            </View>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
            />
            <View style={{
                flexDirection: "row", shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1.5,
                shadowRadius: 2,
                elevation: 3,
            }}>
                <Entypo
                    name="attachment"
                    style={{ margin:10, marginLeft:20}}
                    size={15}
                    color='#23232380'
                />
                <MyText
                    style={{
                        color: '#23232380',
                        fontSize: 11,
                        margin:10
                    }}>
                    Attach Files
                </MyText>
            </View>

        </View>
    );
};

export default GroupChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});