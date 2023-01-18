import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image, View } from 'react-native'
import HeartIcon from '../../assets/Svgs/HeartIcon'
import RightArrowIcon from '../../assets/Svgs/RightArrowIcon'
import SmallHeartIcon from '../../assets/Svgs/SmallHeartIcon'
import StarIcon from '../../assets/Svgs/StarIcon'
import SvgImport from './SvgImport'
import MyText from './Text'

const Posts = () => {
  return (
    <TouchableOpacity
      style={{
        width: 148,
        paddingTop: 14,
        paddingLeft: 17,
        paddingRight: 13,
        paddingBottom: 14,
        marginRight: 15,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 3,
        borderRadius: 16,
        backgroundColor: 'white',
        shadowColor: '#878787',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        elevation: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <Image
          style={{ height: 45, width: 45, borderRadius: 5 }}
          source={{
            uri: 'https://banner2.cleanpng.com/20180625/req/kisspng-computer-icons-avatar-business-computer-software-user-avatar-5b3097fcae25c3.3909949015299112927133.jpg',
          }}
        />
        <SvgImport svg={SmallHeartIcon} />
      </View>
      <MyText style={{ fontSize: 16, marginBottom: 4 }}>Conor Murphy </MyText>
      <MyText style={{ fontSize: 16, marginBottom: 9 }}>
        <MyText style={{ fontWeight: '700' }}>70.00$</MyText>
        <MyText> /Hr</MyText>
      </MyText>
      <MyText style={{ fontSize: 15, color: 'lightgray', marginBottom: 9 }}>
        UI/UX designer
      </MyText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <MyText style={{ fontSize: 13, fontWeight: '600' }}>
          <SvgImport svg={StarIcon} /> 5.0
        </MyText>
        <SvgImport svg={RightArrowIcon} />
      </View>
    </TouchableOpacity>
  )
}

export default Posts
