import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppointmentScreen from '../screens/AppointmentScreen';
import AppointmentInfo from '../Components/AppointmentInfo';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import Edit from "../Components/Edit"


export default function AppointmentScreenNavigator() {
    
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator initialRouteName='HomeScreen'
      screenOptions={{
        headerStyle: {
          backgroundColor: "#396bb5",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
        <Stack.Screen name='AppointmentScreen' component={AppointmentScreen} options={{ title: ' Current Appointments' }} />
        <Stack.Screen name='AppointmentInfo' component={AppointmentInfo} options={{ title: 'Appointment Summary' }}/>
        <Stack.Screen name='Edit' component={Edit} options={{ title: 'Edit ' }}/>
        <Stack.Screen name='ConfirmationScreen' component={ConfirmationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }