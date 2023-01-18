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
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import PersonalInfo from './PersonalInfo';
import { useNavigation } from '@react-navigation/native';
import Skills from './Skills';
import ProfilePic from './ProfilePic';
import CustomHeader7 from '../../Components/CustomHeader7';

const Progress = () => {
    const {
        theme: { colors },
    } = useContext(Context);
    const navigation = useNavigation()

    const progressStepsStyle = {
        activeStepIconBorderColor: colors.Bluish,
        activeLabelColor: colors.text,
        activeStepNumColor: colors.text,
        activeStepIconColor: colors.white,
        completedStepIconColor: colors.Bluish,
        completedProgressBarColor: colors.Bluish,
        completedCheckColor: colors.white,
        labelFontSize: 9
    };

    const buttonTextStyle = {
        color: colors.white,
        fontSize: 14,
    };

    const buttonStyle = {
        backgroundColor: colors.Bluish,
        width: "111%",
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginRight: 233
    }

 



    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
        <CustomHeader7 />
        <View style={{ flex: 1 }}>
            <ProgressSteps {...progressStepsStyle}>
                <ProgressStep label="Personal Info" nextBtnStyle={buttonStyle} nextBtnTextStyle={buttonTextStyle} nextBtnText="Proceed" previousBtnDisabled={true}>
                    <PersonalInfo/>
                </ProgressStep>
                <ProgressStep label="Skills" nextBtnStyle={buttonStyle} nextBtnTextStyle={buttonTextStyle} nextBtnText="Proceed" previousBtnDisabled={true}>
                    <Skills/>
                </ProgressStep>
                <ProgressStep label="Profile Picture" nextBtnStyle={buttonStyle} nextBtnTextStyle={buttonTextStyle} nextBtnText="Finalize" previousBtnDisabled={true}>
                    <ProfilePic/>
                </ProgressStep>
                
            </ProgressSteps>
        </View>


    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default Progress;