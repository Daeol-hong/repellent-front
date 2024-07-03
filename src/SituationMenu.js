import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

console.log(height);

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`, // 모두 검정색
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: true, // optional
};

function SituationMenu({repellingData, farmData, selectedFarm}) {

  const chartData = {
    labels: repellingData
      .map(data => {
        const dateParts = data.detectedAt.split('-');
        return `${dateParts[1]}-${dateParts[2]}`;
      })
      .reverse(),

    datasets: [
      {
        data: repellingData.map(data => data.count).reverse(),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2, // optional
        withShadow: true,
      },
    ],
  };

  return (
    <ScrollView  contentContainerStyle={styles.menu}>
      <Text style={styles.title}>{selectedFarm.name} 탐지 현황</Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
      {/* <View style={styles.deviceList}>
        {farmData.map((data, index) => (
          <View style={styles.deviceItem} key={index}>
            <Text>{data.name}</Text>
            <View style={styles.statusIndicator} />
            <Text>asd</Text>
          </View>
        ))}
      </View> */}
      <View style={styles.deviceList}>
        {selectedFarm &&
          selectedFarm.repellentDevice.map((device, deviceIndex) => (
            <View style={styles.deviceItem} key={`device-${deviceIndex}`}>
              <Text>{device.name}</Text>
              {device.isWorking ? (
                <React.Fragment>
                  <View style={styles.statusTrue} />
                  <Text>정상작동</Text>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <View style={styles.statusFalse} />
                  <Text>연결오류</Text>
                </React.Fragment>
              )}
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    height: 50,
    flex: 1,
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  deviceList: {
    // backgroundColor: 'tomato',
  },
  deviceItem: {
    flexDirection: 'row',
    borderWidth: 1, // 테두리 두께
    borderColor: 'gray', // 테두리 색상
    padding: 4, // 내부 여백
    marginBottom: 5, // 아래 여백
  },
  statusTrue: {
    width: 10, // 원의 너비
    height: 10, // 원의 높이
    borderRadius: 5, // 원의 반지름 (반으로 나눈 값)
    marginLeft: 250, // 원과 텍스트 사이 여백
    backgroundColor: 'green',
  },
  statusFalse: {
    width: 10, // 원의 너비
    height: 10, // 원의 높이
    borderRadius: 5, // 원의 반지름 (반으로 나눈 값)
    marginLeft: 250, // 원과 텍스트 사이 여백
    backgroundColor: 'red',
  },
});

export default SituationMenu;
