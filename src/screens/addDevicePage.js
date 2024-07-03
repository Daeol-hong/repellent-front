import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddDevicePage = ({ navigation }) => {
  const [deviceNumber, setDeviceNumber] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [deviceLocation, setDeviceLocation] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleComplete = () => {
    // 기기 추가 로직을 여기서 처리합니다.
    console.log({
      deviceNumber,
      deviceName,
      deviceLocation,
      deviceType,
    });
    // 완료 후 이전 페이지로 돌아가기
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>기기 추가</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="기기 번호"
            value={deviceNumber}
            onChangeText={setDeviceNumber}
          />

          <View style={styles.margin} />

          <TextInput
            style={styles.input}
            placeholder="기기 이름"
            value={deviceName}
            onChangeText={setDeviceName}
          />

          <View style={styles.margin} />

          <TextInput
            style={styles.input}
            placeholder="기기 위치"
            value={deviceLocation}
            onChangeText={setDeviceLocation}
          />

          <View style={styles.margin} />

          <TouchableOpacity style={styles.pickerContainer} onPress={() => setShowPicker(true)}>
            <Text style={styles.pickerLabel}>
              {deviceType ? deviceType : '기기 종류를 선택하세요'}
            </Text>
          </TouchableOpacity>

          <Modal visible={showPicker} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Picker
                  selectedValue={deviceType}
                  onValueChange={(itemValue) => {
                    setDeviceType(itemValue);
                    setShowPicker(false);
                  }}
                >
                  <Picker.Item label="기기 종류를 선택하세요" value="" />
                  <Picker.Item label="센서" value="센서" />
                  <Picker.Item label="카메라" value="카메라" />
                  <Picker.Item label="기타" value="기타" />
                </Picker>
                <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.modalButton}>
                  <Text style={styles.buttonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.margin} />

          <TouchableOpacity onPress={handleComplete} style={styles.button}>
            <Text style={styles.buttonText}>완료</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 270,
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#E1EFD8',
    padding: 8,
    marginBottom: 12,
  },
  pickerContainer: {
    width: 270,
    height: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#E1EFD8',
    padding: 8,
    marginBottom: 12,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#333',
  },
  margin: {
    height: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'green',
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    width: 270,
  },
});

export default AddDevicePage;
