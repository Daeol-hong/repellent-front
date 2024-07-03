import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Margin from '../Margin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({navigation}) {
  const [Id, setId] = useState('');
  const [password, setPassword] = useState('');

  const logAllDataInAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);

      data.forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
    } catch (error) {
      console.error('Async Storage 데이터를 읽어오는 중 오류 발생: ', error);
    }
  };

  const handleLogin = async () => {
    console.log(Id);
    console.log(password);
    axios({
      method: 'post',
      //url: 'http://222.116.135.206:8080/api/v1/login',
      url: 'http://192.168.1.4:8080/api/v1/login',
      data: {
        loginId: Id,
        password: password,
      },
    })
      .then(response => {
        console.log(response);

        if (response.status === 200) {
          console.log(response.headers.authorization);

          AsyncStorage.setItem('userId', Id);
          AsyncStorage.setItem('userPassword', password);
          AsyncStorage.setItem('accessToken', response.headers.authorization);
          navigation.navigate('Repelling');
        } else {
          Alert.alert('오류', '아이디 또는 비밀번호가 일치하지 않습니다');
        }
      })
      .catch(error => {
        console.log(error.response);
        Alert.alert('오류', '아이디 또는 비밀번호가 일치하지 않습니다');
      });

    const savedUserId = await AsyncStorage.getItem('userId');
    const savedPassword = await AsyncStorage.getItem('userPassword');
    // if (Id === savedUserId && password === savedPassword) {
    //   try {
    //     navigation.navigate('Situation');
    //   } catch (e) {
    //     console.error('로그인 정보를 저장하는 중 오류 발생: ', e);
    //   }
    // } else {
    //   Alert.alert('오류', '아이디 또는 비밀번호가 일치하지 않습니다');
    // }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Margin height={100} />

        <View style={styles.logoContainer}>
          <Text style={styles.logoFont}>LOGO</Text>
        </View>

        <Margin height={90} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.loginInput}
            placeholder="아이디"
            autoCapitalize="none"
            value={Id}
            onChangeText={text => setId(text)}
          />

          <Margin height={10} />

          <TextInput
            style={styles.loginInput}
            placeholder="비밀번호"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <Margin height={30} />

        <View>
          <TouchableOpacity style={styles.btnContainer} onPress={handleLogin}>
            <Text style={{color: 'black'}}>로그인</Text>
          </TouchableOpacity>
        </View>

        <Margin height={10} />

        <View style={styles.findLinkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('FindId')}>
            <Text style={{color: 'black'}}>아이디 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: 'black'}}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFont: {
    fontSize: 60,
    fontWeight: '100',
    color: 'black',
  },
  inputContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginInput: {
    width: 270,
    height: 40,
    fontSize: 16,

    borderRadius: 5,
    backgroundColor: '#E1EFD8',
  },
  btnContainer: {
    // flex: 1,
    backgroundColor: 'green',
    width: 270,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  findLinkContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginHorizontal: 3,
  },
});
