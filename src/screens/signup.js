import React, {useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function SignUp({navigation}) {
  const [Id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [certificationNumber, setCertificationNumber] = useState('');
  const [checkingHandleEmailCheckingCode, setCheckingHandleEMailCheckingCode] = useState(false);
  const handleSignUp = async () => {
    
    if (checkingHandleEmailCheckingCode === false) {
      Alert.alert('오류', '이메일 인증을 진행해주세요');
      return;
    }

    if (!Id || !password || !confirmPassword || !name || !email) {
      Alert.alert('오류', '모든 필드를 작성해야 합니다');
      return;
    }
    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 다릅니다');
      return;
    }
    

    try {
      // 서버에 아이디 중복 확인 요청 보내기
      const signUpResponse = await axios.post(
        'http://192.168.1.4:8080/api/v1/register',
        {
          loginId: Id,
          password: password,
          name: name,
          email: email,
        }
      );

      if (signUpResponse.status === 200) {
        Alert.alert('회원가입 성공', '회원가입이 완료되었습니다', [
          {
            text: '로그인하기',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
      } else {
        Alert.alert('오류', '회원가입에 실패했습니다');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '서버 오류가 발생했습니다');
    }
  };

  const handleEmailVerification = async () => {
    if (!email) {
      Alert.alert('오류', '이메일을 입력해주세요');
      return;
    }

    try {
      // 서버에 이메일 전송 요청 보내기
      const verificationResponse = await axios({
        method: 'get',
        url: `http://192.168.1.4:8080/api/v1/certification?email=${email}`,
      });

      setCertificationNumber(verificationResponse.data.certificationNumber);

      if (verificationResponse.status === 200) {
        Alert.alert('이메일 전송 성공', '이메일을 확인해주세요');
      } else {
        Alert.alert('오류', '이메일 전송에 실패했습니다');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '서버 오류가 발생했습니다');
    }
  };
  
  const handleEmailCheckingCode = async () => {
    if(!verificationCode){
      Alert.alert('오류', '인증번호를 입력해주세요');
    }
    try{
      if(certificationNumber === verificationCode){
        Alert.alert('인증에 성공하셨습니다.');
        setCheckingHandleEMailCheckingCode(true);
      } else{
        Alert.alert('인증에 실패하셨습니다', '인증번호를 다시 확인해 주세요');
      }
    }
    catch(error){
      console.error(error);
      Alert.alert('오류', '서버 오류가 발생했습니다');
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Margin height={20} />

          <View style={styles.logoContainer}>
            <Text style={styles.logoFont}>LOGO</Text>
          </View>

          <Margin height={90} />

          <Text style={styles.title}>회원가입</Text>

          <Margin height={20} />

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

            <Margin height={10} />

            <TextInput
              style={styles.loginInput}
              placeholder="비밀번호 확인"
              secureTextEntry
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />

            <Margin height={10} />

            <TextInput
              style={styles.loginInput}
              placeholder="이름"
              autoCapitalize="none"
              onChangeText={text => setName(text)}
            />

            <Margin height={10} />

            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.emailInput}
                placeholder="이메일"
                value={email}
                onChangeText={text => setEmail(text)}
              />

              <Margin width={10} />

              <TouchableOpacity style={styles.authButton} onPress={handleEmailVerification}>
                <Text style={styles.authButtonText}>인증하기</Text>
              </TouchableOpacity>
            </View>

            <Margin height={10} />
            
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.emailInput}
                placeholder="인증번호"
                value={verificationCode}
                onChangeText={text => setVerificationCode(text)}
              />

              <Margin width={10} />

              <TouchableOpacity style={styles.authButton} onPress={handleEmailCheckingCode}>
                <Text style={styles.authButtonText}>인증확인</Text>
              </TouchableOpacity>
            </View>

          </View>

          <Margin height={30} />

          <View>
            <TouchableOpacity style={styles.loginBtnContainer} onPress={handleSignUp}>
              <Text style={styles.loginBtnContent}>회원가입</Text>
            </TouchableOpacity>
          </View>

          <Margin height={10} />
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
    justifyContent: 'center',
  },
  logoFont: {
    fontSize: 40,
    fontWeight: '100',
    color: 'black',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
});
