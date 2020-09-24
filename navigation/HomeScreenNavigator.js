import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import GroomerCard from '../Components/GroomerCard';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import ServicesScreen from '../screens/ServicesScreen';


export default function HomeScreenNavigator() {
    
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator initialRouteName='HomeScreen'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#396bb5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title: 'Fresh Paws 🐾 ' }}
 />
        <Stack.Screen name='ServicesScreen' component={ServicesScreen} options={{ title: 'Grooming Services🐾' }}/>
        <Stack.Screen name='GroomerCard' component={GroomerCard} options={{ title: 'Schedule Your Pets Grooming!' }}/>
        <Stack.Screen name='ConfirmationScreen' component={ConfirmationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }
