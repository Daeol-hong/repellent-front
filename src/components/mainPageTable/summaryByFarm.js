import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const SummaryByFarm = ({ navigation }) => {
  const [farmData, setFarmData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const getColorBasedOnIsWorking = (isWorking) => {
    return isWorking ? styles.cellGreen : styles.cellRed;
  };

  const filterDataByDate = (data, selectedDate) => {
    const selectedDay = new Date(selectedDate).setHours(0, 0, 0, 0);
    return data.filter(item => {
      const itemDate = new Date(item.detectionTime).setHours(0, 0, 0, 0);
      return itemDate === selectedDay;
    });
  };

  const mergeData = (farmData, selectedDate) => {
    const mergedData = [];
    farmData.forEach(farm => {
      farm.repellentDevice.forEach(device => {
        const filteredData = filterDataByDate(device.repellentData, selectedDate);
        const totalDetections = filteredData.length;
        const mostDetectedType = filteredData.reduce((acc, data) => {
          acc[data.detectionType] = (acc[data.detectionType] || 0) + 1;
          return acc;
        }, {});
        const mostDetected = Object.keys(mostDetectedType).reduce((a, b) => mostDetectedType[a] > mostDetectedType[b] ? a : b, '');
        const avgReDetectionTime = (filteredData.reduce((acc, data) => acc + data.reDetectionMinutes, 0) / totalDetections).toFixed(1);
        const repellentSounds = filteredData.map(data => data.repellentSound.soundName);
        const mostCommonSound = repellentSounds.length > 0 ? 
          repellentSounds.sort((a, b) =>
            repellentSounds.filter(v => v === a).length - repellentSounds.filter(v => v === b).length
          ).pop() : '';

        mergedData.push({
          farmName: farm.name,
          deviceName: device.name,
          isWorking: device.isWorking,
          totalDetections,
          mostDetected,
          avgReDetectionTime,
          mostCommonSound,
        });
      });
    });
    return mergedData;
  };

  const mergedData = mergeData(farmData, selectedDate);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const onDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    closeDatePicker();
  };

  const renderDatePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={closeDatePicker}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
              <Button title="확인" onPress={closeDatePicker} />
            </View>
          </View>
        </Modal>
      );
    }
    return (
      <View>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ paddingBottom: 20 }}>
      <Text style={{ marginTop: 20, marginBottom: 20, textAlign: 'center', fontSize: 20, color: 'green', fontWeight: 'bold' }}>
        농장별 요약
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={openDatePicker} style={styles.datePickerButton}>
          <Text style={styles.buttonText}>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>
      </View>
      {renderDatePicker()}
      <FlatList
        data={farmData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: farm }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.farmHeader}>{farm.name}</Text>
            <View style={styles.header}>
              <Text style={styles.heading}>기기</Text>
              <Text style={styles.heading}>탐지횟수</Text>
              <Text style={styles.heading}>최다탐지개체</Text>
              <Text style={styles.heading}>재탐지 시간</Text>
              <Text style={styles.heading}>퇴치소리</Text>
            </View>
            <FlatList
              data={mergedData.filter(data => data.farmName === farm.name)}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={getColorBasedOnIsWorking(item.isWorking)}>{item.deviceName}</Text>
                  <Text style={styles.cell}>{item.totalDetections}</Text>
                  <Text style={styles.cell}>{item.mostDetected}</Text>
                  <Text style={styles.cell}>{item.avgReDetectionTime}</Text>
                  <Text style={styles.cell}>{item.mostCommonSound}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={() => navigation.navigate('AddDevicePage')}>
              <Text style={{ marginTop: 10, borderWidth: 1, borderColor: 'green', color: 'green', textAlign: 'center', borderRadius: 10 }}>
                +기기추가
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  farmHeader: {
    fontSize: 15,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
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
    height: 50,
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
    color: 'green',
  },
  cellGreen: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#90EE90',
    color: 'green',
  },
  cellRed: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#FF6347',
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  datePickerButton: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SummaryByFarm;
