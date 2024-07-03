import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SummaryByAllFarm from '../components/mainPageTable/summaryByAllFarm';
import SummaryByFarm from '../components/mainPageTable/summaryByFarm';
import RepellentStat from '../components/mainPageTable/repellentStat';

export default function Repelling({ navigation }) {
  const [farmData, setFarmData] = useState([]);
  const [repellingData, setRepellingData] = useState([]);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const axiosInstance = axios.create({
      withCredentials: true, // withCredentials 설정
    });

    const fetchData = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');

      try {
        // 농장 리스트 데이터 가져오기
        const farmListResponse = await axiosInstance.get(
          'http://192.168.1.4:8080/api/v1/farm/setting/list',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setFarmData(farmListResponse.data);
        console.log(farmData);

        // 기피 장치 리스트 데이터 가져오기
        const repellingListResponse = await axiosInstance.get(
          'http://192.168.1.4:8080/api/v1/repellent-data/detail/group-farm/farm/1',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setRepellingData(repellingListResponse.data);

        // const combinedData = farmListResponse.data.concat(repellingListResponse.data)
        // setAllData(combinedData);
        // console.log(allData);

        //농장 이름 추출
        // const farmName = farmData.map(item => item.name)
        // console.log(farmName);

      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };


    fetchData();

    return () => {
      // Cleanup 함수
    };
  }, []);

  // 앱의 메인 컴포넌트
  return (
    <SafeAreaView style={{flex: 1,}}>
      <ScrollView style={{flex: 1,}}>
        <Text style={styles.headText}>
          건조류님{/* {farmData.map(item => item.id)} */}
        </Text>
        <View style={styles.childContainer}>
          <SummaryByAllFarm navigation={navigation}/>
          <SummaryByFarm navigation={navigation}/>
          <RepellentStat/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

  // 스타일 정의
  const styles = StyleSheet.create({
    headText: {
      paddingTop: 40, 
      paddingLeft: 40, 
      fontSize:20, 
      color: 'green', 
      fontWeight: 'bold'
  },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'green',
    },
    cell: {
      flex: 1,
      textAlign: 'center',
      borderWidth: 1,
      borderColor: 'green',
    },
    childContainer: {
      flex: 1, 
      margin: 20, 
      marginTop: 10, 
      padding: 20, 
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'green',
    },
    heading: {
      flex: 1,
      fontSize: 15,
      backgroundColor: '#E1EFD8',
      textAlign: 'center'
    }
  });