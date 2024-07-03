import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RepellentStat = () => {
  const [farmData, setFarmData] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [timeFrame, setTimeFrame] = useState('day');

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
      setFarmData(farmListResponse.data);
      if (farmListResponse.data.length > 0) {
        setSelectedFarm(farmListResponse.data[0].id); // 첫 번째 농장을 기본 선택
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const filterDataByTimeFrame = (data, timeFrame) => {
    const now = new Date();
    let startTime;

    if (timeFrame === 'day') {
      startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    } else if (timeFrame === 'week') {
      startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    } else if (timeFrame === 'month') {
      startTime = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    }

    return data.filter(item => new Date(item.detectionTime) >= startTime);
  };

  const calculateDetectionStats = (farm, timeFrame) => {
    const detectionTimes = {};
    const soundCounts = {};
    const detectionRates = {};

    const filteredData = filterDataByTimeFrame(farm.repellentDevice.flatMap(device => device.repellentData), timeFrame);

    filteredData.forEach(data => {
      const hour = new Date(data.detectionTime).getHours();
      if (!detectionTimes[hour]) {
        detectionTimes[hour] = new Set();
      }
      detectionTimes[hour].add(data.detectionType);
      soundCounts[data.repellentSound.soundName] = (soundCounts[data.repellentSound.soundName] || 0) + 1;
      detectionRates[data.detectionType] = (detectionRates[data.detectionType] || 0) + data.detectionNum;
    });

    const totalDetections = filteredData.reduce((acc, data) => acc + data.detectionNum, 0);

    const sortedDetectionTimes = Object.entries(detectionTimes).sort((a, b) => b[1].size - a[1].size);
    const sortedSoundCounts = Object.entries(soundCounts).sort((a, b) => b[1] - a[1]);
    const sortedDetectionRates = Object.entries(detectionRates).sort((a, b) => b[1] - a[1]);

    return { sortedDetectionTimes, sortedSoundCounts, sortedDetectionRates, totalDetections };
  };

  const currentFarm = farmData.find(farm => farm.id === selectedFarm);
  const stats = currentFarm ? calculateDetectionStats(currentFarm, timeFrame) : { sortedDetectionTimes: [], sortedSoundCounts: [], sortedDetectionRates: [], totalDetections: 0 };

  return (
    <View>
      <Text style={styles.title}>퇴치통계</Text>
      <View style={{ marginBottom: 10 }}>
        <View style={styles.buttonContainer}>
          {farmData.map(farm => (
            <TouchableOpacity key={farm.id} onPress={() => setSelectedFarm(farm.id)} style={[styles.farmButton, selectedFarm === farm.id && styles.selectedButton]}>
              <Text style={selectedFarm === farm.id ? styles.selectedButtonText : styles.buttonText}>{farm.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setTimeFrame('day')} style={[styles.timeButton, timeFrame === 'day' && styles.selectedButton]}>
            <Text style={timeFrame === 'day' ? styles.selectedButtonText : styles.buttonText}>일별</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTimeFrame('week')} style={[styles.timeButton, timeFrame === 'week' && styles.selectedButton]}>
            <Text style={timeFrame === 'week' ? styles.selectedButtonText : styles.buttonText}>주별</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTimeFrame('month')} style={[styles.timeButton, timeFrame === 'month' && styles.selectedButton]}>
            <Text style={timeFrame === 'month' ? styles.selectedButtonText : styles.buttonText}>월별</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.subtitle}>최다탐지 시간 순위</Text>
        <View>
          <View style={styles.header}>
            <Text style={styles.heading}>순위</Text>
            <Text style={styles.heading}>탐지개체갯수</Text>
            <Text style={styles.heading}>시간</Text>
          </View>
          {stats.sortedDetectionTimes.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{item[1].size}</Text>
              <Text style={styles.cell}>{item[0]}:00</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.subtitle}>최다퇴치 소리 순위</Text>
        <View>
          <View style={styles.header}>
            <Text style={styles.heading}>순위</Text>
            <Text style={styles.heading}>퇴치소리</Text>
          </View>
          {stats.sortedSoundCounts.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{item[0]}</Text>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Text style={styles.subtitle}>탐지율 순위</Text>
        <View>
          <View style={styles.header}>
            <Text style={styles.headingLeft}>순위</Text>
            <Text style={styles.heading}>개체</Text>
            <Text style={styles.headingRight}>탐지율</Text>
          </View>
          {stats.sortedDetectionRates.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{item[0]}</Text>
              <Text style={styles.cell}>{((item[1] / stats.totalDetections) * 100).toFixed(1)}%</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 5,
    fontSize: 15,
    color: 'green',
    fontWeight: '600',
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
    height: 30,
    color: 'green',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 25,
  },
  heading: {
    flex: 1,
    fontSize: 15,
    backgroundColor: '#E1EFD8',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'green',
    color: 'green',
  },
  headingLeft: {
    flex: 1,
    fontSize: 15,
    backgroundColor: '#E1EFD8',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'green',
    borderTopStartRadius: 15,
    color: 'green'
  },
  headingRight: {
    flex: 1,
    fontSize: 15,
    backgroundColor: '#E1EFD8',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'green',
    borderTopEndRadius: 15,
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  farmButton: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
  timeButton: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  selectedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'black',
  },
});

export default RepellentStat;


