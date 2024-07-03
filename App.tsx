import React from 'react';
//import Situation from './src/screens/situation';
import Login from './src/screens/login';
import SignUp from './src/screens/signup';
import FindId from './src/screens/findid';
import Repelling from './src/screens/repelling';
import AddDevicePage from './src/screens/addDevicePage';
import AddFarmPage from './src/screens/addFarmPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FindId"
          component={FindId}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Repelling" 
          component={Repelling} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AddFarmPage" 
          component={AddFarmPage} 
          />
        <Stack.Screen 
          name="AddDevicePage" 
          component={AddDevicePage} 
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

