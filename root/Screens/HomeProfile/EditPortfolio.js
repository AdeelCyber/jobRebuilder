import React, { useContext, useState, useEffect } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native'

import Context from '../../Context/Context'
import MyText from '../../Components/Text'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import CustomHeader9 from '../../Components/CustomHeader9'
import CartProvider from '../../Context/CartProvider'
import { editPortfolio } from '../Profile/services/ProfileServices'
import Toast from 'react-native-toast-message'
import { Entypo } from '@expo/vector-icons'
import { imageUpload } from '../Profile/services/fileServices'
import Loader from '../../Components/Loader'
const EditPortfolio = ({ route }) => {
  const {
    theme: { colors },
  } = useContext(Context)
  const navigation = useNavigation()
  const { portfolio } = route.params

  const [projname, setprojname] = useState(portfolio.title)
  const [projdesc, setprojdesc] = useState(portfolio.description)
  const { accessToken } = useContext(CartProvider)
  const [getcondition, setcondition] = useState(false)
  const [images, setimages] = useState([])
  const [attachments, setattachments] = useState(portfolio.attachments)

  const pickImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [10, 10],
      quality: 1,
    })
    console.log(result.assets)

    if (!result.canceled) {
      for (var i in result.assets) {
        const img = await imageUpload(result.assets[i].uri)

        // console.log(result.assets[i].uri);
        //setimages([...images, result.assets[i].uri]);
        const m = JSON.parse(img.body)
        setimages([...images, m.filename])

        console.log(images)
      }
    }
  }
  const deleteItem = (index) => {
    console.log(index)
    const r = attachments.filter((i, e) => e != index)

    setattachments(r)
  }
  const deleteItem2 = (index) => {
    const r = images.filter((i, e) => e != index)

    setimages(r)
  }
  useEffect(() => {
    console.log(portfolio)
  }, [])

  const portfolioedit = async () => {
    const img = attachments.concat(images)
    console.log(img)
    setcondition(true)
    var portfolioid = portfolio._id
    const res = await editPortfolio(
      accessToken,
      portfolioid,
      projname,
      projdesc,
      img
    )
    if (res.status == 200) {
      setcondition(false)
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: 'Published Successfully',
        text2: '.',
      })
      navigation.navigate('HomeService')
    }
    setcondition(false)

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `bearer ${accessToken}`,
    //   },
    // };

    // axios
    //   .put(
    //     "https://stepdev.up.railway.app/freelancer/profile/portfolio/update",
    //     {
    //       portfolioId: portfolio._id,
    //       title: projname,
    //       description: projdesc,

    //       attachments: imgg,
    //     },
    //     config
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });
  }
  if (getcondition) {
    return <Loader visible={getcondition} color='white' indicatorSize='large' />
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.container]}>
        <CustomHeader9 Title='Edit Portfolio' nav={navigation} />
        <MyText style={[styles.header, { margin: 30 }]}>
          Portfolio Details
        </MyText>
        <View style={{ marginTop: 5, width: '84%' }}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(projname) => setprojname(projname)}
              value={projname}
              placeholder='Project Name'
              placeholderTextColor='#ACA9A9'
              underlineColorAndroid='#f000'
            />
          </View>
          <View style={styles.SectionStyle2}>
            <TextInput
              style={styles.inputStyle2}
              onChangeText={(projdesc) => setprojdesc(projdesc)}
              placeholder='Description'
              value={projdesc}
              placeholderTextColor='#ACA9A9'
              underlineColorAndroid='#f000'
              multiline={true}
              numberOfLines={5}
            />
          </View>
        </View>
        <MyText style={[styles.header, { margin: 30 }]}>Add Attachments</MyText>
        {portfolio && (
          <FlatList
            data={attachments}
            style={{ alignSelf: 'flex-start', marginLeft: 30, marginRight: 30 }}
            numColumns={2}
            columnWrapperStyle={{ flexWrap: 'wrap' }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={{
                  height: 140,
                  width: 160,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 1,
                  shadowRadius: 1,
                  elevation: 7,
                  margin: 3,
                  shadowColor: colors.Bluish,
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={{
                      uri: `https://stepdev.up.railway.app/media/getimage/${item}`,
                    }}
                    resizeMode='contain'
                    style={{ height: 139, width: 160, borderRadius: 10 }}
                  />
                  <Entypo
                    name='circle-with-cross'
                    size={20}
                    style={{ position: 'absolute', left: 130, top: 5 }}
                    color={colors.white}
                    onPress={() => {
                      deleteItem(index)
                    }}
                  />
                </View>
              </View>
            )}
          />
        )}
        {images && (
          <FlatList
            data={images}
            style={{ alignSelf: 'flex-start', marginLeft: 30, marginRight: 30 }}
            numColumns={2}
            columnWrapperStyle={{ flexWrap: 'wrap' }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={{
                  height: 140,
                  width: 160,
                  elevation: 7,
                  margin: 3,
                  shadowColor: colors.Bluish,
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={{
                      uri: `https://stepdev.up.railway.app/media/getimage/${item}`,
                    }}
                    resizeMode='contain'
                    style={{ height: 139, width: 160, borderRadius: 10 }}
                  />
                  <Entypo
                    name='circle-with-cross'
                    size={20}
                    style={{ position: 'absolute', left: 130, top: 5 }}
                    color={colors.white}
                    onPress={() => {
                      deleteItem2(index)
                    }}
                  />
                </View>
              </View>
            )}
          />
        )}

        <View style={{ alignSelf: 'flex-start', margin: 30 }}>
          <Pressable
            style={{
              height: 139,
              width: 160,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={() => {
              pickImg()
            }}
          >
            <View
              style={{
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 7,
                shadowColor: colors.Bluish,
                height: 45,
                width: 45,
                borderRadius: 50,
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
              }}
            >
              <MyText
                style={{
                  fontSize: 25,
                  fontWeight: '200',
                  alignSelf: 'center',
                }}
              >
                +
              </MyText>
            </View>
            <MyText
              style={{
                fontSize: 16,
                fontWeight: '400',
                alignSelf: 'center',
                margin: 5,
              }}
            >
              Add more
            </MyText>
          </Pressable>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.Bluish,
            width: 345,
            height: 58,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={() => {
            portfolioedit()
          }}
        >
          <MyText
            style={{
              color: colors.white,
              fontSize: 14,
              fontWeight: '500',
            }}
          >
            Edit
          </MyText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnstyle: {
    height: 35,
    width: 107,
    borderRadius: 5,
    backgroundColor: '#232323',
    margin: 5,
  },
  btntext: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
    margin: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: '700',
    color: '#232323',
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 10,
  },
  box: {
    height: 190,
    width: 345,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 4,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
  },
  inputStyle2: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,

    textAlignVertical: 'top',
    paddingTop: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 47,
    marginTop: 14,
    marginBottom: 5,
  },

  SectionStyle2: {
    flexDirection: 'row',
    height: 239,
    marginTop: 14,
    marginBottom: 5,
    flexDirection: 'row',
  },
})

export default EditPortfolio
