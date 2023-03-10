import {WebView} from "react-native-webview";
import {View} from "react-native";



export default function StripeWebView(props) {
    const {url} = props.route.params;
    const {returnUrl}=props.route.params;
    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: url }}
                style={{ marginTop: 20 }}
                onNavigationStateChange={(event) => {
                    if (event.url === returnUrl) {
                        props.navigation.navigate("LinkStatus")
                    }
                }}
            />
        </View>
    )
}