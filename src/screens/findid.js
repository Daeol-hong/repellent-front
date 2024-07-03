import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Margin from '../Margin';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function FindId() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [foundId, setFoundId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleFindID = async () => {
    try {
      // 서버에 아이디 찾기 요청 보내기
      const response = await axios({
        method: 'get',
        url: `http://192.168.1.4:8080/api/v1/find/id?name=${name}&email=${email}`,
      });

      if (response.data.loginId) {
        // 아이디를 찾았을 경우
        const foundUserId = response.data.loginId;
        Alert.alert(
          '아이디 찾기 성공',
          `회원님의 아이디는 "${foundUserId}" 입니다`,
        );
      } else {
        // 아이디를 찾지 못했을 경우
        Alert.alert(
          '아이디 찾기 실패',
          '해당 이름으로 등록된 사용자가 없습니다.',
        );
      }
    } catch (error) {
      console.error('아이디 찾기 요청 중 오류 발생: ', error);
      Alert.alert('오류', '아이디 찾기에 실패했습니다');
    }
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Async Storage의 모든 데이터가 삭제되었습니다.');
    } catch (error) {
      console.error('Async Storage 데이터 삭제 중 오류 발생: ', error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Margin height={20} />

          <View style={styles.logoContainer}>
            <Text style={styles.logoFont}>LOGO</Text>
          </View>

          <Margin height={90} />

          <Text style={styles.title}>아이디 찾기</Text>

          <Margin height={20} />

          <View style={styles.inputContainer}>
            <Margin height={10} />

            <TextInput
              style={styles.loginInput}
              placeholder="이름"
              value={name}
              onChangeText={text => setName(text)}
              autoCapitalize="none"
            />

            <Margin height={10} />

            <TextInput
              style={styles.loginInput}
              placeholder="이메일"
              value={email}
              onChangeText={text => setEmail(text)}
              autoCapitalize="none"
            />

            <Margin height={10} />

            {/* <TextInput style={styles.loginInput} placeholder="인증번호" /> */}
          </View>

          <Margin height={30} />

          <View>
            <TouchableOpacity
              style={styles.loginBtnContainer}
              onPress={handleFindID}>
              <Text style={styles.loginBtnContent}>아이디 찾기</Text>
            </TouchableOpacity>
          </View>

          {/* <Modal isVisible={isModalVisible}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                회원님의 아이디는 "{foundId}" 입니다.
              </Text>
              <View style={styles.modalBtnContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>닫기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, {marginRight: 10}]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>로그인하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    fontWeight: '100',
  },
  logoContainer: {
    // flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'tomato',
  },
  logoFont: {
    fontSize: 40,
    fontWeight: '100',
    color: 'black',
  },
  inputContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'tomato',
  },
  loginInput: {
    width: 270,
    height: 40,
    fontSize: 16,

    borderRadius: 5,
    backgroundColor: '#E1EFD8',
    paddingLeft: 10,
  },
  loginBtnContainer: {
    // flex: 1,
    backgroundColor: 'green',
    width: 270,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  loginBtnContent: {
    fontSize: 15,
    fontWeight: 'normal',
    color: 'black',
  },
  authButton: {
    backgroundColor: 'green',
    width: 60,
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  authButtonText: {
    fontSize: 15,
    fontWeight: 'normal',
    color: 'black',
  },
  emailInput: {
    height: 40,
    width: 200,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#E1EFD8',
    paddingLeft: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
  },
  modalBtnContainer: {
    flexDirection: 'row-reverse',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
  },
});
