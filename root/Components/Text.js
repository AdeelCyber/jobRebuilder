import {Text,StyleSheet} from "react-native";


export default function MyText(props) {

    const styles =StyleSheet.create({
        text:{
            color:'#222222',
            fontSize:18,
            fontWeight:"400",
        }
    })
    return <Text  style={[styles.text,props.style]}  >
        {props.children}
    </Text>
}