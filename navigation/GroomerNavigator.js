import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GroomerScreen from '../screens/GroomerScreen';
import GroomerCard from '../Components/GroomerCard';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ReviewScreen from '../screens/ReviewScreen';


export default function HomeScreenNavigator() {
    
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator initialRouteName='GroomerScreen'
      screenOptions={{
        headerStyle: {
          backgroundColor: "#396bb5",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
        <Stack.Screen name='GroomerScreen' options={{ headerShown: false }} component={GroomerScreen} />
        <Stack.Screen name='ServicesScreen' component={ServicesScreen} options={{ title: ' Grooming Services' }}/>
        <Stack.Screen name='GroomerCard' component={GroomerCard} options={{ title: 'Schedule Your Pets Grooming!' }}/>
        <Stack.Screen name='ReviewScreen' component={ReviewScreen} options={{ title: 'Reviews' }}/>
        <Stack.Screen name='ConfirmationScreen' component={ConfirmationScreen} options={{ headerShown: false }} />
       

      </Stack.Navigator>
    )
  }