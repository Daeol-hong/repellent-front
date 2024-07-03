import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddFarmPage = ({ navigation }) => {
  const [farmNumber, setFarmNumber] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmAddress, setFarmAddress] = useState('');
  const [farmType, setFarmType] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleComplete = () => {
    // 농장 추가 로직을 여기서 처리합니다.
    console.log({
      farmNumber,
      farmName,
      farmAddress,
      farmType,
    });
    // 완료 후 이전 페이지로 돌아가기
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>농장 추가</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="단말기 번호"
            value={farmNumber}
            onChangeText={setFarmNumber}
          />

          <View style={styles.margin} />

          <TextInput
            style={styles.input}
            placeholder="농장 이름"
            value={farmName}
            onChangeText={setFarmName}
          />

          <View style={styles.margin} />

          <TextInput
            style={styles.input}
            placeholder="농장 주소"
            value={farmAddress}
            onChangeText={setFarmAddress}
          />

          <View style={styles.margin} />

          <TouchableOpacity style={styles.pickerContainer} onPress={() => setShowPicker(true)}>
            <Text style={styles.pickerLabel}>
              {farmType ? farmType : '농장 종류를 선택하세요'}
            </Text>
          </TouchableOpacity>

          <Modal visible={showPicker} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Picker
                  selectedValue={farmType}
                  onValueChange={(itemValue) => {
                    setFarmType(itemValue);
                    setShowPicker(false);
                  }}
                >
                  <Picker.Item label="농장 종류를 선택하세요" value="" />
                  <Picker.Item label="과수원" value="과수원" />
                  <Picker.Item label="인삼 밭" value="인삼 밭" />
                  <Picker.Item label="벼 농장" value="벼 농장" />
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

export default AddFarmPage;
