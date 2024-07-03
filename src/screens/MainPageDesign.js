import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';
import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['기기', '기기작동여부', '탐지횟수', '최다탐지개체', '재탐지시간', '퇴치소리'],
      tableTitle: ['평균','A', 'B'],
      tableData: [
        ['1', '2', '3', '4', '5'],
        ['a', 'b', 'c', 'd', '7'],
        ['6', '8', '9', '10', '11'],
      ],
      MaxDetectedHead:['순위', '탐지개체갯수', '시간'],
      MaxDetectedTitle:['1', '2', '3'],
      MaxDetectedData:[
        ['4개', '12:00'],
        ['3개', '15:00'],
        ['2개', '18:00']
      ],
      MaxSoundHead:['순위', '퇴치소리'],
      MaxSoundTitle: ['1', '2', '3'],
      MaxSoundData: [
        ['독수리 소리'], 
        ['총소리'], 
        ['잡음']
      ],
      DetectionRateHead:['순위', '개체', '탐지율'],
      DetectionRateTitle:['1', '2', '3'],
      DetectionRateData:[
        ['조류', '60%'],
        ['멧돼지', '26%'],
        ['고라니', '14%']
      ],

    }
  }

  render() {
    const state = this.state;
    return (
        <SafeAreaView style={styles.rootContainer}>
          <ScrollView style={styles.rootContainer}>
            <Text style={{margin: 20,padding: 20, fontSize:20, color: 'green', fontWeight: 'bold'}}> 
              건조류님 
            </Text>
            <View style={styles.childContainer}>
              <View style={{marginBottom: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: 'green',}}>
                <Text style={{ marginBottom: 20, color: 'green', fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>
                  전체 농장요약
                </Text>
                <Table borderStyle={{ borderRadius: 5, borderWidth: 2, borderColor:'green'}}>
                  <Row data={state.tableHead} flexArr={[1, 1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
                  <TableWrapper style={styles.wrapper}>
                    <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                    <Rows data={state.tableData} flexArr={[1, 1, 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
                  </TableWrapper>
                </Table>
              </View>
              <View style={{borderBottomWidth: 1, borderBottomColor: 'green', paddingBottom: 20,}}>  
                  <Text style={ {marginBottom: 20, textAlign: 'center', fontSize: 20, color: 'green', fontWeight: 'bold', }}>
                    농장별요약
                  </Text>
                  <Text style={ {marginBottom: 20, textAlign: 'right', fontSize: 10, color: 'green', fontWeight: 'bold', }}>
                    2024.03.13
                  </Text>
                  <View style={{marginBottom: 20, }}>
                    <Text style={{color: 'green', marginBottom: 10, fontSize: 15, fontWeight: 'bold',}}>
                      A농장
                    </Text>
                  <Table borderStyle={{borderWidth: 2, borderColor: 'green'}}>
                    <Row data={state.tableHead} flexArr={[1, 1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
                    <TableWrapper style={styles.wrapper}>
                      <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                      <Rows data={state.tableData} flexArr={[1, 1, 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
                    </TableWrapper>
                  </Table>
                </View>
                <View>
                  <Text style={{color: 'green', marginBottom: 10, fontSize: 15, fontWeight: 'bold',}}>
                      B농장
                    </Text>
                  <Table borderStyle={{borderWidth: 2, borderColor: 'green'}}>
                    <Row data={state.tableHead} flexArr={[1, 1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
                    <TableWrapper style={styles.wrapper}>
                      <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                      <Rows data={state.tableData} flexArr={[1, 1, 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
                    </TableWrapper>
                  </Table>
                  <Text style={{marginTop: 20, textAlign:'center', color: 'green', fontSize: 15}}>
                    + 농장추가
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 20,}}>
                <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 20, color: 'green', fontWeight: 'bold',}}>
                  퇴치통계
                </Text>
                <View style={{flexDirection: 'row', marginBottom: 10, }}>
                  <Text style={{paddingRight: 50, fontSize: 13, color: 'green',}}>
                    A농장 | B농장 | C농장
                  </Text>
                  <Text style={{paddingLeft: 50, fontSize: 13, color: 'green',}}>
                    일별 | 주별 | 월별
                  </Text>
                </View>
                <View style={{marginBottom: 20}}>
                  <Text style={{ color: 'green', marginBottom: 10, paddingWidth: 10, fontSize: 15, fontWeight: 'bold',}}>
                    최다탐지 시간순위
                  </Text>
                  <Table borderStyle={{borderWidth: 2, borderColor: 'green'}}>
                      <Row data={state.MaxDetectedHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text}/>
                      <TableWrapper style={styles.wrapper}>
                        <Col data={state.MaxDetectedTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                        <Rows data={state.MaxDetectedData} flexArr={[1, 1]} style={styles.row} textStyle={styles.text}/>
                      </TableWrapper>
                    </Table>
                  </View>
                  <View style={{marginBottom: 20}}>
                    <Text style={{ color: 'green', marginBottom: 10, paddingWidth: 10, fontSize: 15, fontWeight: 'bold',}}>
                      최다퇴치 소리 순위
                    </Text>  
                    <Table borderStyle={{borderWidth: 2, borderColor: 'green'}}>
                      <Row data={state.MaxSoundHead} flexArr={[1, 1]} style={styles.head} textStyle={styles.text}/>
                      <TableWrapper style={styles.wrapper}>
                        <Col data={state.MaxSoundTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                        <Rows data={state.MaxSoundData} flexArr={[1]} style={styles.row} textStyle={styles.text}/>
                      </TableWrapper>
                    </Table>
                  </View>
                  <View style={{marginBottom: 20}}>
                    <Text style={{ color: 'green', marginBottom: 10, paddingWidth: 10, fontSize: 15, fontWeight: 'bold',}}>
                      탐지율 순위
                    </Text>    
                    <Table borderStyle={{borderWidth: 2, borderColor: 'green'}}>
                      <Row data={state.DetectionRateHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text}/>
                      <TableWrapper style={styles.wrapper}>
                        <Col data={state.DetectionRateTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                        <Rows data={state.DetectionRateData} flexArr={[1, 1]} style={styles.row} textStyle={styles.text}/>
                      </TableWrapper>
                    </Table>
                  </View>  
              </View>
            </View>    
          </ScrollView>
        </SafeAreaView>  
    )
  }
}

function Data() {
  const [farmData, setFarmData] = useState([]);
  const [repellingData, setRepellingData] = useState([]);

  useEffect(() => {
    const axiosInstance = axios.create({
      withCredentials: true, // withCredentials 설정
    });

    const fetchFarmList = async () => {
      console.log(await AsyncStorage.getItem('accessToken'));

      const accessToken = await AsyncStorage.getItem('accessToken');

      try {
        const response = await axiosInstance.get(
          'http://222.116.135.206:8080/api/v1/farm/list',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log(response.data);
        console.log(
          '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
          response.data[0].repellentDevice,
        );
        setFarmData(response.data);
      } catch (error) {
        console.error(error.response);
      }
    };

   const fetchRepellingList = async () => {
      const accessToken2 = await AsyncStorage.getItem('accessToken');
      console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', accessToken2);

      try {
        const response2 = await axiosInstance.get(
          'http://222.116.135.206:8080/api/v1/repellent-data/detail/group-farm/farm/1',
          {
            headers: {
              Authorization: `Bearer ${accessToken2}`,
            },
          },
        );
        console.log(
          '*!@(#)*!@)#*!@#&(*!@#&!(@#&!*@(#&(!@&#(*!@&',
          response2.data,
        );
        data = response2.data;
        console.log(response2.data);
        oneData = response2.data.dayByDetectionList;
        console.log(oneData);

        //twoData = onedata.detectedAt
        //console.log(twoData);

        // 날짜별로 데이터를 그룹화하는 함수
        // const groupByDate = (data) => {
        //   return data.reduce((acc, obj) => {
        //     const date = obj.detectedAt;
        //     acc[date] = acc[date] || [];
        //     acc[date].push(obj.count);
        //     return acc;
        //   }, {});
        // };

        // const groupedData = groupByDate(oneData);
        // console.log(groupedData);

      //   const groupedData = dataArray.reduce((acc, obj) => {
      //     const date = obj.detectedAt;
      //     if (!acc[date]) {
      //         acc[date] = [];
      //     }
      //     acc[date].push(obj.count);
      //     return acc;
      // }, {});
      
      // // 그룹화된 데이터의 각 그룹에서 카운트 값 합산
      // const result = Object.entries(groupedData).map(([date, counts]) => {
      //     const totalCount = counts.reduce((acc, count) => acc + count, 0);
      //     return { date, totalCount };
      // });
      
      // console.log(result);
      //   setRepellingData(result);
      setRepellingData(response2.data);
      } catch (error) {
        console.error(error.response);
      }
    };

    const loadDataPeriodically = async () => {
      await fetchFarmList();
      await fetchRepellingList();
    };

     // 3초마다 loadDataPeriodically 함수 실행
     const intervalId = setInterval(loadDataPeriodically, 3000);

     // 컴포넌트가 언마운트되었을 때 clearInterval로 인터벌을 클리어
     return () => clearInterval(intervalId);
  }, []);

}

const styles = StyleSheet.create({
  rootContainer:{flex: 1},
  childContainer: {flex: 1, margin: 20, marginTop: 10, padding: 20, },
  container: { flex: 1, padding: 15, paddingTop: 60, backgroundColor: '#fff' },
  head: {  height: 50,  backgroundColor: '#E1EFD8'  },
  wrapper: { flexDirection: 'row', },
  title: { flex: 1, backgroundColor: '#E1EFD8' },
  row: {  height: 28  },
  text: { textAlign: 'center', color: 'green', fontSize: 13,}
});