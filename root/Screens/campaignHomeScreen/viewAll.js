import {useIsFocused, useNavigation} from "@react-navigation/native";
import React, {useContext, useEffect, useState} from "react";
import {getFreelancerCategories, getFreelancers, getFreelancersPaginated} from "../Profile/services/FreeLancerServices";
import {ActivityIndicator, FlatList, Pressable, View} from "react-native";
import PopularComp from "../../Components/PopularComp";
import Error from "../../Components/Error";
import RateComp from "../../Components/RateComp";
import Context from "../../Context/Context";
import MyText from "../../Components/Text";
import {Entypo} from "@expo/vector-icons";


export default function ViewAll(props){
    const {
        theme: { colors },
    } = useContext(Context)
    const isFocused = useIsFocused()
    const[loading,setLoading] = useState(true)
    // fixed,popular,equity
    const [metaData, setMetaData] = useState(props.route.params.metadata)
    const [page, setPage] = useState(1)
    const [type, setType] = useState(props.route.params.type)
    const [title, setTitle] = useState(props.route.params.title)
    const [data, setData] = useState([])
    useEffect(() => {
        setLoading(true)
        getFreelancersData()
    }, [isFocused])
    useEffect(() => {

    }, [data])
    const getFreelancersData = async () => {
        setLoading(false)

        if(page <= metaData.totalPage){
           const resp = await getFreelancersPaginated(type,page)

           // console.log(resp.data);
           if (resp.data.status === 'OK') {
               console.log(resp.data.data[0].freelancers)
               setPage(page+1)


               setData([...data,...resp.data.data[0].freelancers])
           }
       }

    }
    let navigation = useNavigation()
    return(
        <View style={{flex:1,backgroundColor:'white',}}>
            <View style={{flexDirection:"row"}}>
                <Pressable
                    onPress={()=>{
                        navigation.goBack()
                    }}
                    style={{ flexDirection: "row", alignItems: "center" }}>
                    <Entypo name="chevron-left" size={24} color="black" />
                </Pressable>
                <View style={{
                    flex:1,
                    alignItems:'center',
                }}>
                    <MyText
                        style={{
                            fontSize: 25,
                            fontWeight: '700',
                            color: colors.black,
                            marginVertical: 10,
                            marginHorizontal: 10,
                        }}
                    >
                        {title}
                    </MyText>
                </View>
            </View>
            <View style={{ paddingLeft: 17, paddingRight: 15 }}>
                {
                    !loading ? (
                        <FlatList style={
                            {
                                marginVertical: 10,
                                marginBottom: 50,
                            }}
                         data={data} renderItem={({item}) => (
                            <RateComp
                                name={item.name}
                                id={item._id}
                                Price={item.hourlyRate}
                                designation={item.jobTitle}
                                Rating={item.rating}
                                Image={item.avatar}
                                style={{ marginVertical: 11 }}
                            />
                        )
                        }
                                    onEndReached={getFreelancersData}
                                    onEndReachedThreshold={0.5}
                        // ListFooterComponent={renderFooter}
                        // ListEmptyComponent={renderEmpty}
                        // onRefresh={getFreelancersData}
                        // refreshing={loading}
                        // onEndReached={getFreelancersData}
                    />

                    ) : (
                    //    show activity indicator on center of the screen
                        <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:20}}>
                            <ActivityIndicator size='large' color={colors.Bluish} />
                        </View>

                    )

                }
            </View>
        </View>
    )
}