import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllFarmTable = ({ navigation }) => {
  const [farmData, setFarmData] = useState([]);

  const fetchData = async () => {
    const axiosInstance = axios.create({
      withCredentials: true,
    });

    const accessToken = await AsyncStorage.getItem('accessToken');

    try {
      const farmListResponse = await axiosInstance.get(
        'http://192.168.1.4:8080/api/v1/farm/list',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // 오늘 날짜에 해당하는 데이터 필터링
      const today = new Date();
      const filteredData = farmListResponse.data.map(farm => ({
        ...farm,
        repellentDevice: farm.repellentDevice.map(device => ({
          ...device,
          repellentData: device.repellentData.filter(data => {
            const detectionDate = new Date(data.detectionTime);
            return (
              detectionDate.getFullYear() === today.getFullYear() &&
              detectionDate.getMonth() === today.getMonth() &&
              detectionDate.getDate() === today.getDate()
            );
          }),
        })),
      }));

      setFarmData(filteredData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatIsWorking = (isWorking) => {
    return isWorking ? 'O' : 'X';
  };

  const getColorBasedOnIsWorking = (repellentDevices) => {
    const hasX = repellentDevices.some(device => !device.isWorking);
    return hasX ? styles.cellRed : styles.cellGreen;
  };

  const calculateFarmSummary = (farm) => {
    const totalDevices = farm.repellentDevice.length;
    const workingDevices = farm.repellentDevice.filter(device => device.isWorking).length;
    const avgDetectionCount = (farm.repellentDevice.reduce((acc, device) => acc + device.repellentData.length, 0) / totalDevices).toFixed(1);

    const detectionData = farm.repellentDevice.flatMap(device => device.repellentData);
    const maxDetectedType = detectionData.reduce((acc, data) => {
      acc[data.detectionType] = (acc[data.detectionType] || 0) + 1;
      return acc;
    }, {});
    const mostDetected = Object.keys(maxDetectedType).reduce((a, b) => maxDetectedType[a] > maxDetectedType[b] ? a : b, '');

    const avgReDetectionTime = (detectionData.reduce((acc, data) => acc + data.reDetectionMinutes, 0) / detectionData.length).toFixed(1);
    const repellentSounds = detectionData.map(data => data.repellentSound.soundName);
    const mostCommonSound = repellentSounds.length > 0 ? 
      repellentSounds.sort((a, b) =>
        repellentSounds.filter(v => v === a).length - repellentSounds.filter(v => v === b).length
      ).pop() : '';

    return {
      totalDevices,
      workingDevices,
      avgDetectionCount,
      mostDetected,
      avgReDetectionTime,
      mostCommonSound,
    };
  };

  return (
    <View style={styles.section}>
      <Text style={styles.headText}>전체 농장요약</Text>
      <View style={styles.header}>
        <Text style={styles.heading}>농장</Text>
        <Text style={styles.heading}>기기 작동 여부</Text>
        <Text style={styles.heading}>탐지 횟수</Text>
        <Text style={styles.heading}>최다 탐지 개체</Text>
        <Text style={styles.heading}>재탐지 시간</Text>
        <Text style={styles.heading}>퇴치 소리</Text>
      </View>
      <FlatList
        data={farmData}
        renderItem={({ item }) => {
          const summary = calculateFarmSummary(item);
          return (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={getColorBasedOnIsWorking(item.repellentDevice)}>{formatIsWorking(summary.workingDevices === summary.totalDevices)}</Text>
              <Text style={styles.cell}>{summary.avgDetectionCount}</Text>
              <Text style={styles.cell}>{summary.mostDetected}</Text>
              <Text style={styles.cell}>{summary.avgReDetectionTime}</Text>
              <Text style={styles.cell}>{summary.mostCommonSound}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity onPress={() => navigation.navigate('AddFarmPage')}>
        <Text style={styles.button}>+농장추가</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    paddingBottom: 20,
  },
  headText: {
    marginBottom: 20,
    color: 'green',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
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
    padding: 5,
    color: 'green',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'green',
  },
  heading: {
    flex: 1,
    fontSize: 15,
    backgroundColor: '#E1EFD8',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'green',
    padding: 5,
    color: 'green',
  },
  cellGreen: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#90EE90',
    padding: 5,
  },
  cellRed: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#FF6347',
    padding: 5,
  },
  button: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'green',
    color: 'green',
    textAlign: 'center',
    borderRadius: 10,
    padding: 10,
  },
});

export default AllFarmTable;
