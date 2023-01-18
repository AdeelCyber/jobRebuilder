import React, { useContext, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
} from 'react-native'
import MyText from '../../../Components/Text'
import Context from '../../../Context/Context'
import Icon from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

import { BarChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { saleItemsData } from '../../../utilities/profileMenu'

import CustomHeader from '../../../Components/CustomHeader'

const FinancialReportScreen = () => {
  const navigation = useNavigation()

  const [saleItems, setSaleItems] = useState(saleItemsData)

  const {
    theme: { colors },
  } = useContext(Context)

  const SaleItem = ({ price, title }) => (
    <View
      style={{
        borderWidth: 1,
        width: 172,
        borderColor: '#ECE7E7',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
      }}
    >
      <MyText style={{ fontSize: 20, fontWeight: '500' }}>$ {price}</MyText>
      <MyText style={{ fontSize: 12, color: 'rgba(35, 35, 35, 0.5)' }}>
        {title}
      </MyText>
    </View>
  )

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [1000, 1500, 2000, 2500, 3000, 3500],
      },
    ],
  }

  const chartConfig = {
    backgroundGradientFrom: '#8489FC',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFF1F1',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `#8489FC`,
    strokeWidth: 2, // optional, default 3
    // barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  }

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: 40,
          },
        ]}
      >
        <View
          style={{
            paddingBottom: 10,
            marginHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <MyText
            style={{
              fontWeight: '600',
              lineHeight: 30,
              color: colors.text,
              textAlign: 'left',
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 16,
            }}
          >
            Financial Report &nbsp;&nbsp;&nbsp;
            <Icon
              name='pencil'
              size={20}
              style={{
                color: 'black',
              }}
              onPress={() => {
                navigation.navigate('AddFinancialDetail')
              }}
            />
          </MyText>
        </View>
        {/* Sale ITems */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: 10,
            flexWrap: 'wrap',
          }}
        >
          {saleItems.map((saleItem, index) => {
            return (
              <SaleItem
                key={index}
                price={saleItem.price}
                title={saleItem.title}
              />
            )
          })}
        </View>

        <View
          style={{
            paddingBottom: 10,
            marginHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <MyText
            style={{
              fontWeight: '600',
              lineHeight: 30,
              color: colors.text,
              textAlign: 'left',
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 16,
            }}
          >
            Graphical Details
          </MyText>
        </View>

        <View
          style={{
            padding: 20,
            marginBottom: 20,
          }}
        >
          <BarChart
            // style={graphStyle}
            data={data}
            width={370}
            style={{ margin: 10 }}
            height={300}
            yAxisLabel='$'
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 34,
          }}
        >
          <Icon
            name='info'
            size={25}
            color='rgba(35, 35, 35, 0.5)'
            style={{
              borderRadius: 50,
              borderWidth: 1,
              paddingLeft: 13,
              paddingRight: 10,
              paddingTop: 4,
              paddingBottom: 3,
              borderColor: 'lightgray',
            }}
          />
          <MyText style={{ fontSize: 19, color: 'lightgray' }}>Reminder</MyText>
          <MyText
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '500',
              color: 'rgba(35, 35, 35, 0.5)',
            }}
          >
            Update your financial Report every month to keep your investors
            updated
          </MyText>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default FinancialReportScreen
